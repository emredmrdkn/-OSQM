<?php
header('Content-Type: text/html; charset=utf-8');

$city = isset($_GET['city']) ? trim(strip_tags($_GET['city'])) : 'Sydney';
$sqm = isset($_GET['sqm']) ? trim(strip_tags($_GET['sqm'])) : '0.00';
$savings = isset($_GET['savings']) ? trim(strip_tags($_GET['savings'])) : '25,000';
$state = isset($_GET['state']) ? trim(strip_tags($_GET['state'])) : 'NSW';

$title = "$city Reality Score: {$sqm} m² in theory. 0 m² in reality. — $0SQM";
$desc = "I saved \${$savings} and officially own 0 SQM in {$city}. Different city. Same portfolio. The viral housing reality check.";
$cardImage = "https://0sqm.com/images/reality-score-card.png";
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
  <meta property="og:url" content="https://0sqm.com/share?city=<?php echo urlencode($city); ?>&sqm=<?php echo urlencode($sqm); ?>">
  <meta property="og:title" content="<?php echo htmlspecialchars($title); ?>">
  <meta property="og:description" content="<?php echo htmlspecialchars($desc); ?>">
  <meta property="og:image" content="<?php echo $cardImage; ?>">
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
      window.location.replace('/#reality');
    }
  </script>
</head>
<body style="background:#F8F6F0; color:#141414; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; padding:20px; box-sizing:border-box;">
  <div style="max-width:500px; width:100%; background:#fff; border:1px solid #E5E0D4; border-radius:16px; padding:32px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.06);">
    <h1 style="margin:0 0 12px; font-size:24px; font-weight:900;">$0SQM Reality Score</h1>
    <p style="margin:0 0 20px; font-size:16px; color:#555;">
      <strong><?php echo htmlspecialchars($city); ?></strong>: <?php echo htmlspecialchars($sqm); ?> m² in theory · 0 m² in reality.
    </p>
    <a href="/#reality" style="display:inline-block; background:#FFD452; color:#141414; font-weight:800; text-decoration:none; padding:12px 24px; border-radius:999px; box-shadow:0 4px 0 rgba(20,20,20,0.15);">
      Check Your Reality →
    </a>
  </div>
</body>
</html>
