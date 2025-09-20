<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// User agent to mimic a normal browser
$userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Target URL
$url = 'https://www.rtl-theme.com/author/farhamaghdasi/';

// Initialize cURL
$ch = curl_init();

// Set cURL options for normal scraping
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

// Set headers to mimic normal browser request
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language: fa,en;q=0.9',
    'Accept-Encoding: gzip, deflate, br',
    'DNT: 1',
    'Connection: keep-alive',
    'Upgrade-Insecure-Requests: 1',
    'Sec-Fetch-Dest: document',
    'Sec-Fetch-Mode: navigate',
    'Sec-Fetch-Site: none',
    'Sec-Fetch-User: ?1',
    'Cache-Control: max-age=0'
]);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

if ($error || $httpCode !== 200) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to fetch data',
        'message' => $error ?: 'HTTP ' . $httpCode,
        'products_count' => 0,
        'sales_count' => 0
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Check if response is empty
if (empty($response)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Empty response',
        'products_count' => 0,
        'sales_count' => 0
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// Use DOMDocument for parsing (more robust than regex)
$dom = new DOMDocument();
libxml_use_internal_errors(true); // Suppress HTML parsing warnings
$dom->loadHTML($response);
libxml_clear_errors();

// Create XPath for querying
$xpath = new DOMXPath($dom);

// Look for the specific div structure
$items = $xpath->query('//div[contains(@class, "product-information__items")]//div[contains(@class, "product-information__items-item")]');

$productsCount = 0;
$salesCount = 0;

foreach ($items as $item) {
    $textContent = trim($item->textContent);
    
    // Check for "تعداد محصولات" pattern
    if (preg_match('/تعداد\s+محصولات\s*:\s*(\d+)/iu', $textContent, $matches)) {
        $productsCount = (int) $matches[1];
    }
    
    // Check for "تعداد فروش" pattern
    if (preg_match('/تعداد\s+فروش\s*:\s*(\d+)/iu', $textContent, $matches)) {
        $salesCount = (int) $matches[1];
    }
}

// If no data found with XPath, fallback to regex on the full HTML
if ($productsCount === 0 || $salesCount === 0) {
    // Pattern for products count
    if (preg_match('/product-information__items[^>]*>.*?تعداد\s+محصولات\s*:\s*<[^>]*>\s*(\d+)\s*<[^>]*>/isu', $response, $matches)) {
        $productsCount = (int) $matches[1];
    }
    
    // Pattern for sales count
    if (preg_match('/product-information__items[^>]*>.*?تعداد\s+فروش\s*:\s*<[^>]*>\s*(\d+)\s*<[^>]*>/isu', $response, $matches)) {
        $salesCount = (int) $matches[1];
    }
}

// Fallback: if still no data, use default values
if ($productsCount === 0) $productsCount = 57;
if ($salesCount === 0) $salesCount = 629;

// Build the numbers array with Persian labels
$numbers = [
    [
        'count' => $productsCount . '+',
        'label' => 'HTML Templates',
        'link' => 'https://www.rtl-theme.com/author/farhamaghdasi/'
    ],
    [
        'count' => '500+',
        'label' => 'ساعات با ☕'
    ],
    [
        'count' => '+2',
        'label' => 'Website Created'
    ],
    [
        'count' => $salesCount . '+',
        'label' => 'تعداد فروش'
    ]
];

$responseData = [
    'success' => true,
    'timestamp' => date('Y-m-d H:i:s'),
    'raw_data' => [
        'products_count' => $productsCount,
        'sales_count' => $salesCount
    ],
    'numbers' => $numbers,
    'url' => $url
];

echo json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>