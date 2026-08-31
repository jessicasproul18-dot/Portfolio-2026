<?php
/**
 * Contact form email template.
 * Expects variables: $name, $email, $phone (optional), $subject, $message
 * Outputs HTML email with inline styles for email client compatibility.
 */

// Escape HTML for security (XSS-safe)
$nameEsc = htmlspecialchars($name ?? '', ENT_QUOTES, 'UTF-8');
$emailEsc = htmlspecialchars($email ?? '', ENT_QUOTES, 'UTF-8');
$phoneEsc = htmlspecialchars($phone ?? '', ENT_QUOTES, 'UTF-8');
// Escape message and convert newlines to <br>
$messageEsc = nl2br(htmlspecialchars($message ?? '', ENT_QUOTES, 'UTF-8'));
$siteLabel = defined('SITE_NAME') ? SITE_NAME : 'Website';
$siteEsc = htmlspecialchars($siteLabel, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6; color: #18181b;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 32px 40px; text-align: center;">
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.02em;">New Contact Form Submission</h1>
        <p style="color: #a1a1aa; font-size: 14px; margin: 0; font-weight: 400;">Website Contact Form</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px;">
        <!-- From Field -->
        <div style="margin-bottom: 32px;">
          <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; margin: 0 0 8px 0; display: block;">From</span>
          <p style="font-size: 16px; color: #18181b; margin: 0; line-height: 1.6; font-weight: 400;">
            <strong><?php echo $nameEsc; ?></strong><br>
            <?php echo $emailEsc; ?>
          </p>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 32px 0;" />
        
        <!-- Phone -->
        <div style="margin-bottom: 32px;">
          <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; margin: 0 0 8px 0; display: block;">Phone</span>
          <p style="font-size: 16px; color: #18181b; margin: 0; line-height: 1.6; font-weight: 400;"><?php echo $phoneEsc !== '' ? $phoneEsc : 'Not provided'; ?></p>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 32px 0;" />
        
        <!-- Message Field -->
        <div style="margin-bottom: 32px;">
          <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #71717a; margin: 0 0 8px 0; display: block;">Message</span>
          <div style="margin-top: 12px;">
            <p style="font-size: 16px; color: #18181b; margin: 0; line-height: 1.7; white-space: pre-wrap;"><?php echo $messageEsc; ?></p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #fafafa; padding: 24px 40px; text-align: center; border-top: 1px solid #e4e4e7;">
        <p style="font-size: 12px; color: #71717a; margin: 0; line-height: 1.5;">
          This email was sent from the <?php echo $siteEsc; ?> website contact form.<br>
          Please reply directly to <?php echo $emailEsc; ?> to respond.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
