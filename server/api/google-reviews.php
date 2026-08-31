<?php
/**
 * Google reviews proxy endpoint.
 *
 * Proxies using `api_endpoint` from `public/config.json` when present, else
 * `public_html/out/config.json` (static export copies the same file there).
 *
 * It attaches the `AMP-API-KEY` header using `AMP_API_KEY` defined in `public_html/config.php`.
 */

header("Content-Type: application/json; charset=utf-8");

if (($_SERVER["REQUEST_METHOD"] ?? "GET") !== "GET") {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

require_once dirname(__DIR__) . "/config.php";

$publicConfigPath = dirname(__DIR__) . "/config.json";

if (!is_file($publicConfigPath)) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Server configuration error"]);
    exit;
}

$rawConfig = file_get_contents($publicConfigPath);
$publicConfig = $rawConfig !== false ? json_decode($rawConfig, true) : null;

$apiEndpoint = $publicConfig["api_endpoint"] ?? "";
if (!is_string($apiEndpoint) || trim($apiEndpoint) === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Missing api_endpoint in public/config.json"]);
    exit;
}

$upstreamUrl = trim($apiEndpoint);
if (filter_var($upstreamUrl, FILTER_VALIDATE_URL) === false) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Invalid api_endpoint in public/config.json"]);
    exit;
}

$ampApiKey = defined("AMP_API_KEY") ? AMP_API_KEY : "";
if (!is_string($ampApiKey) || trim($ampApiKey) === "") {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Server configuration error"]);
    exit;
}

$ch = curl_init($upstreamUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_HTTPHEADER => [
        "AMP-API-KEY: " . $ampApiKey,
        "Accept: application/json",
    ],
]);

$responseBody = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($responseBody === false || $curlErr !== "") {
    http_response_code(502);
    echo json_encode(["success" => false, "error" => "Network error"]);
    exit;
}

$decoded = json_decode($responseBody, true);
if (!is_array($decoded)) {
    http_response_code(502);
    echo json_encode(["success" => false, "error" => "Invalid JSON from upstream"]);
    exit;
}

if ($httpCode >= 200 && $httpCode < 300) {
    // Upstream already includes the shape we want (reviews[], rating, etc).
    echo json_encode($decoded);
    exit;
}

http_response_code($httpCode >= 400 && $httpCode < 600 ? $httpCode : 502);
echo json_encode(["success" => false, "error" => "Upstream error", "upstream" => $decoded]);
exit;

