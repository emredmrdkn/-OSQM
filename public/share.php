<?php
header('Content-Type: text/html; charset=utf-8');

$type = isset($_GET['type']) ? trim(strip_tags($_GET['type'])) : 'savings';

if ($type === 'listing') {
  $suburb = isset($_GET['suburb']) ? trim(strip_tags($_GET['suburb'])) : 'Sydney';
  $rent = isset($_GET['rent']) ? trim(strip_tags($_GET['rent'])) : '750';
  $score = isset($_GET['score']) ? trim(strip_tags($_GET['score'])) : '42';
  $label = isset($_GET['label']) ? trim(strip_tags($_GET['label'])) : 'Market Reality';
  $prem = isset($_GET['prem']) ? trim(strip_tags($_GET['prem'])) : '';
  $beds = isset($_GET['beds']) ? trim(strip_tags($_GET['beds'])) : '1';
  $upfront = (int)$rent * 6;

  $title = "{$suburb} Reality Check: \${$rent}/wk · Score {$score}/100 ({$label}) — \$0SQM";
  $desc = "Sydney Rental Reality Check: \${$rent}/wk in {$suburb} ({$beds}-bed) is {$prem} vs local median. Upfront cash: \${$upfront}. Wen reasonable rent?";
  $targetRedirect = "/listing-reality?suburb=" . urlencode($suburb) . "&rent=" . urlencode($rent) . "&beds=" . urlencode($beds);
  $shareUrl = "https://www.0sqm.com/share?" . http_build_query($_GET);
} else {
  $city = isset($_GET['city']) ? trim(strip_tags($_GET['city'])) : 'Sydney';
  $sqm = isset($_GET['sqm']) ? trim(strip_tags($_GET['sqm'])) : '0.00';
  $savings = isset($_GET['savings']) ? trim(strip_tags($_GET['savings'])) : '25,000';
  $state = isset($_GET['state']) ? trim(strip_tags($_GET['state'])) : 'NSW';

  $title = "$city Reality Score: {$sqm} m² in theory. 0 m² in reality. — $0SQM";
  $desc = "I saved \${$savings} and officially own 0 SQM in {$city}. Different city. Same portfolio. The viral housing reality check.";
  $targetRedirect = "/#reality";
  $shareUrl = "https://www.0sqm.com/share?city=" . urlencode($city) . "&sqm=" . urlencode($sqm);
}

$cardImage = "https://www.0sqm.com/images/og-card.jpg";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($title); ?></title>
  <meta name="description" content="<?php echo htmlspecialchars($desc); ?>">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="<?php echo htmlspecialchars($shareUrl); ?>">
  <meta property="og:title" content="<?php echo htmlspecialchars($title); ?>">
  <meta property="og:description" content="<?php echo htmlspecialchars($desc); ?>">
  <meta property="og:image" content="<?php echo $cardImage; ?>">
  <meta property="og:image:secure_url" content="<?php echo $cardImage; ?>">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="$0SQM">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@Own0SQM">
  <meta name="twitter:creator" content="@Own0SQM">
  <meta name="twitter:title" content="<?php echo htmlspecialchars($title); ?>">
  <meta name="twitter:description" content="<?php echo htmlspecialchars($desc); ?>">
  <meta name="twitter:image" content="<?php echo $cardImage; ?>">

  <!-- Human Visitors Redirect to Real App -->
  <script>
    if (!/bot|crawl|slurp|spider|mediapartners|twitterbot|facebookexternalhit/i.test(navigator.userAgent)) {
      window.location.replace('<?php echo $targetRedirect; ?>');
    }
  </script>
</head>
<body style="background:#F8F6F0; color:#141414; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; padding:20px; box-sizing:border-box;">
  <div style="max-width:500px; width:100%; background:#fff; border:2px solid #141414; border-radius:12px; padding:32px; text-align:center; box-shadow:6px 6px 0 #141414;">
    <h1 style="margin:0 0 12px; font-size:26px; font-weight:900;">$0SQM Reality Score</h1>
    <?php if ($type === 'listing'): ?>
      <p style="margin:0 0 8px; font-size:18px; font-weight:800;">
        <?php echo htmlspecialchars($suburb); ?>: $<?php echo htmlspecialchars($rent); ?> / week
      </p>
      <p style="margin:0 0 20px; font-size:14px; color:#555;">
        Reality Score: <strong><?php echo htmlspecialchars($score); ?>/100</strong> (<?php echo htmlspecialchars($label); ?>)
      </p>
      <a href="<?php echo htmlspecialchars($targetRedirect); ?>" style="display:inline-block; background:#FFE600; color:#141414; font-weight:800; text-decoration:none; padding:12px 24px; border:2px solid #141414; border-radius:6px; box-shadow:2px 2px 0 #141414;">
        Check Your Own Listing →
      </a>
    <?php else: ?>
      <p style="margin:0 0 20px; font-size:16px; color:#555;">
        <strong><?php echo htmlspecialchars($city); ?></strong>: <?php echo htmlspecialchars($sqm); ?> m² in theory · 0 m² in reality.
      </p>
      <a href="/#reality" style="display:inline-block; background:#FFE600; color:#141414; font-weight:800; text-decoration:none; padding:12px 24px; border:2px solid #141414; border-radius:6px; box-shadow:2px 2px 0 #141414;">
        Check Your Reality →
      </a>
    <?php endif; ?>
  </div>
</body>
</html>
