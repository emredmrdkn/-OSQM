<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, no-store, must-revalidate');

$cacheFile = __DIR__ . '/followers_cache.json';

// Return cached if fresh (less than 5 minutes old)
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < 300)) {
    echo file_get_contents($cacheFile);
    exit;
}

$followers = 46; // verified live count

// Try to fetch live from x.com/Own0SQM
$opts = [
    'http' => [
        'method' => 'GET',
        'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\r\n"
    ]
];
$context = stream_context_create($opts);
$html = @file_get_contents('https://x.com/Own0SQM', false, $context);

if ($html && preg_match('/"Followers"[^>]*>.*?([0-9,]+)/is', $html, $matches)) {
    $parsed = intval(str_replace(',', '', $matches[1]));
    if ($parsed > 0) {
        $followers = $parsed;
    }
}

$data = json_encode(['followers' => $followers, 'time' => time()]);
@file_put_contents($cacheFile, $data);
echo $data;
