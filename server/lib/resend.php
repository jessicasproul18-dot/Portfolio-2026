<?php
/**
 * Resend API SDK and configuration.
 * This file contains sensitive API credentials and should not be directly accessible.
 * Provides sendResend() to send email via Resend API; no output or headers.
 *
 * Uses RESEND_API_KEY and RESEND_FROM from public_html/config.php (loaded once here).
 */

require_once dirname(__DIR__) . '/config.php';

function _resendGetFrom(): string
{
    if (defined('RESEND_FROM') && is_string(RESEND_FROM) && RESEND_FROM !== '') {
        return RESEND_FROM;
    }
    return '';
}

/**
 * Send an email via the Resend API.
 *
 * @param array $params Keys: to (string|string[]), subject (string), html (string),
 *                      from (string, optional), reply_to (string, optional).
 * @return array{success: bool, error: string|null, http_code: int} No output; caller handles HTTP and JSON.
 */
function sendResend(array $params): array
{
    $to = $params['to'] ?? null;
    $subject = isset($params['subject']) ? trim((string) $params['subject']) : '';
    $html = $params['html'] ?? '';
    $from = isset($params['from']) ? trim((string) $params['from']) : null;
    $replyTo = isset($params['reply_to']) ? trim((string) $params['reply_to']) : '';

    $toArray = is_array($to) ? $to : (is_string($to) && $to !== '' ? [$to] : []);
    if ($subject === '' || $html === '' || empty($toArray)) {
        return ['success' => false, 'error' => 'Missing or invalid parameters', 'http_code' => 0];
    }

    $apiKey = defined('RESEND_API_KEY') && is_string(RESEND_API_KEY) ? RESEND_API_KEY : '';
    if ($apiKey === '' || strpos($apiKey, 're_') !== 0) {
        return ['success' => false, 'error' => 'Server configuration error', 'http_code' => 0];
    }

    $fromValue = ($from !== null && $from !== '') ? $from : _resendGetFrom();
    if ($fromValue === '') {
        return ['success' => false, 'error' => 'Server configuration error', 'http_code' => 0];
    }

    $payload = [
        'from' => $fromValue,
        'to' => $toArray,
        'subject' => $subject,
        'html' => $html,
    ];
    if ($replyTo !== '') {
        $payload['reply_to'] = $replyTo;
    }

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_RETURNTRANSFER => true,
    ]);
    $response = curl_exec($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($response === false || $curlErr !== '') {
        return ['success' => false, 'error' => 'Network error. Please try again or email us directly.', 'http_code' => 502];
    }

    if ($httpCode >= 200 && $httpCode < 300) {
        return ['success' => true, 'error' => null, 'http_code' => $httpCode];
    }

    $errorMessage = 'Failed to send message. Please try again or email us directly.';
    $decoded = json_decode($response, true);
    if (is_array($decoded) && isset($decoded['message']) && is_string($decoded['message'])) {
        $errorMessage = $decoded['message'];
    }
    return ['success' => false, 'error' => $errorMessage, 'http_code' => $httpCode];
}
