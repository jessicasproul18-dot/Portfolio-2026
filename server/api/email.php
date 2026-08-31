<?php
/**
 * Contact form email endpoint. Accepts POST with name, email, phone (optional), subject, message, replyTo (optional);
 * generates HTML email using template and sends via sendResend() from lib/resend.php.
 */

 require_once dirname(__DIR__) . "/config.php";
require_once dirname(__DIR__) . '/lib/resend.php';

if (!function_exists('sendResend')) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'error' => 'Server configuration error']);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}


$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Content-Type must be application/json']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true) ?? [];

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$phone = trim((string) ($input['phone'] ?? ''));
$subject = trim((string) ($input['subject'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));
$replyTo = trim((string) ($input['replyTo'] ?? ''));
$defaultSendTo = defined('RESEND_SEND_TO') ? RESEND_SEND_TO : '';
$sendToEmail = trim((string) ($input['sendToEmail'] ?? $defaultSendTo));
$errors = [];
if ($name === '') {
    $errors[] = 'Name is required';
}
if (strlen($name) > 200) {
    $errors[] = 'Name is too long';
}
if ($email === '') {
    $errors[] = 'Email is required';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}
if (strlen($email) > 254) {
    $errors[] = 'Email is too long';
}
if (strlen($phone) > 40) {
    $errors[] = 'Phone number is too long';
}
if ($subject === '') {
    $errors[] = 'Subject is required';
}
if (strlen($subject) > 500) {
    $errors[] = 'Subject is too long';
}
if ($message === '') {
    $errors[] = 'Message is required';
}
$maxMessageBytes = 50 * 1024; // 50KB
if (strlen($message) > $maxMessageBytes) {
    $errors[] = 'Message is too long';
}
if ($replyTo !== '' && !filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid reply-to email address';
}
if (strlen($replyTo) > 254) {
    $errors[] = 'Reply-to email is too long';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

$to = $sendToEmail !== '' ? $sendToEmail : (defined('RESEND_SEND_TO') ? RESEND_SEND_TO : '');

// Generate HTML email using template
$templatePath = dirname(__DIR__) . '/email/contact-template.php';
if (!is_file($templatePath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Email template not found']);
    exit;
}

// Capture template output
ob_start();
include $templatePath;
$html = ob_get_clean();

$result = sendResend([
    'to' => $to,
    'subject' => SITE_NAME . ' - ' . $subject,
    'html' => $html,
    'reply_to' => $replyTo !== '' ? $replyTo : null,
]);

if ($result['success']) {
    echo json_encode(['success' => true]);
    exit;
}

$code = (int) ($result['http_code'] ?? 500);
if ($code < 400 || $code > 599) {
    $code = ($code === 502 ? 502 : 500);
}
http_response_code($code);
echo json_encode(['success' => false, 'error' => $result['error'] ?? 'Failed to send message. Please try again or email us directly.']);
