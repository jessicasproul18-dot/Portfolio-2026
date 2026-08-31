<?php
/**
 * This file contains sensitive API credentials and should not be directly accessible.
 * Leave keys empty in git; set real values in the deployed environment only.
 */
define('AMP_API_KEY', '');
define('RESEND_API_KEY', '');

$configPath = __DIR__ . '/config.json';
$config = null;
if (file_exists($configPath)) {
    $raw = file_get_contents($configPath);
    if ($raw !== false) {
        $config = json_decode($raw, true);
    }
}

if ($config !== null && isset($config['site']) && is_string($config['site']) && trim($config['site']) !== '') {
    define('SITE_NAME', trim($config['site']));
} else {
    define('SITE_NAME', 'Website');
}

if ($config !== null && !empty($config['email_from'])) {
    define('RESEND_FROM', SITE_NAME . ' <' . $config['email_from'] . '>');
} else {
    define('RESEND_FROM', 'webteam@advantagemediapartners.com');
}

if ($config !== null && !empty($config['email_to']) && is_string($config['email_to'])) {
    define('RESEND_SEND_TO', trim($config['email_to']));
} else {
    define('RESEND_SEND_TO', 'webteam@advantagemediapartners.com');
}
