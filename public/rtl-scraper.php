<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Enable error logging
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'scraper-debug.log');

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
curl_setopt($ch, CURLOPT_ENCODING, ''); // Handle gzip/deflate/br encoding

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
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

// LOG: Basic request info
error_log("=== SCRAPER DEBUG LOG ===");
error_log("HTTP Status Code: " . $httpCode);
error_log("Content Type: " . $contentType);
error_log("cURL Error: " . ($error ?: 'None'));

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
    error_log("ERROR: Response is empty");
    echo json_encode([
        'error' => 'Empty response',
        'products_count' => 0,
        'sales_count' => 0
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// LOG: Response size
error_log("Response size: " . strlen($response) . " bytes");

// Check if the response contains the expected content
if (strpos($response, 'product-information__items') === false) {
    error_log("WARNING: 'product-information__items' not found in response");
} else {
    error_log("SUCCESS: 'product-information__items' found in response");
}

$productsCount = 0;
$salesCount = 0;

// METHOD 1: Extract the product-information__items div
error_log("=== METHOD 1: Extracting product-information__items div ===");
if (preg_match('/<div[^>]*class="[^"]*product-information__items[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>\s*<\/div>/isu', $response, $sectionMatch)) {
    $section = $sectionMatch[1];
    error_log("Found product-information__items section, length: " . strlen($section) . " bytes");
    error_log("Section content: " . substr($section, 0, 500) . "...");
    
    // Extract products count
    if (preg_match('/تعداد\s*محصولات\s*:\s*<span[^>]*>\s*(\d+)\s*<\/span>/iu', $section, $matches)) {
        $productsCount = (int) $matches[1];
        error_log("PRODUCTS COUNT found via METHOD 1: " . $productsCount);
    } else {
        error_log("METHOD 1: Products count pattern not found in section");
    }
    
    // Extract sales count
    if (preg_match('/تعداد\s*فروش\s*:\s*<span[^>]*>\s*(\d+)\s*<\/span>/iu', $section, $matches)) {
        $salesCount = (int) $matches[1];
        error_log("SALES COUNT found via METHOD 1: " . $salesCount);
    } else {
        error_log("METHOD 1: Sales count pattern not found in section");
    }
} else {
    error_log("METHOD 1: product-information__items div not found");
}

// METHOD 2: Look for product-information__items-item divs
error_log("=== METHOD 2: Looking for product-information__items-item divs ===");
if (preg_match_all('/<div[^>]*class="[^"]*product-information__items-item[^"]*"[^>]*>(.*?)<\/div>/isu', $response, $items)) {
    error_log("Found " . count($items[1]) . " product-information__items-item divs");
    
    foreach ($items[1] as $index => $item) {
        error_log("Item " . ($index + 1) . ": " . substr($item, 0, 200) . "...");
        
        // Check for products count
        if (preg_match('/تعداد\s*محصولات\s*:\s*<span[^>]*>\s*(\d+)\s*<\/span>/iu', $item, $matches)) {
            $productsCount = (int) $matches[1];
            error_log("PRODUCTS COUNT found via METHOD 2 (item " . ($index + 1) . "): " . $productsCount);
        }
        
        // Check for sales count
        if (preg_match('/تعداد\s*فروش\s*:\s*<span[^>]*>\s*(\d+)\s*<\/span>/iu', $item, $matches)) {
            $salesCount = (int) $matches[1];
            error_log("SALES COUNT found via METHOD 2 (item " . ($index + 1) . "): " . $salesCount);
        }
    }
} else {
    error_log("METHOD 2: No product-information__items-item divs found");
}

// METHOD 3: Simpler regex on the entire HTML
error_log("=== METHOD 3: Simple regex on entire HTML ===");

// Try a simpler pattern for products count
if ($productsCount === 0) {
    if (preg_match('/تعداد\s*محصولات\s*:\s*<span[^>]*>\s*(\d+)\s*<\/span>/iu', $response, $matches)) {
        $productsCount = (int) $matches[1];
        error_log("PRODUCTS COUNT found via METHOD 3 (simple): " . $productsCount);
    } else {
        error_log("METHOD 3: Products count not found with simple pattern");
        
        // Try without the span
        if (preg_match('/تعداد\s*محصولات\s*:\s*(\d+)/iu', $response, $matches)) {
            $productsCount = (int) $matches[1];
            error_log("PRODUCTS COUNT found via METHOD 3 (no span): " . $productsCount);
        }
    }
}

// Try a simpler pattern for sales count
if ($salesCount === 0) {
    if (preg_match('/تعداد\s*فروش\s*:\s*<span[^>]*>\s*(\d+)\s*<\/span>/iu', $response, $matches)) {
        $salesCount = (int) $matches[1];
        error_log("SALES COUNT found via METHOD 3 (simple): " . $salesCount);
    } else {
        error_log("METHOD 3: Sales count not found with simple pattern");
        
        // Try without the span
        if (preg_match('/تعداد\s*فروش\s*:\s*(\d+)/iu', $response, $matches)) {
            $salesCount = (int) $matches[1];
            error_log("SALES COUNT found via METHOD 3 (no span): " . $salesCount);
        }
    }
}

// METHOD 4: Check for the specific HTML structure from your source
error_log("=== METHOD 4: Looking for exact HTML structure ===");
if (preg_match('/<div[^>]*class="product-information__items"[^>]*>\s*<div[^>]*class="product-information__items-item"[^>]*>\s*تعداد\s*محصولات:\s*<span[^>]*>(\d+)<\/span>\s*<\/div>\s*<div[^>]*class="product-information__items-item"[^>]*>\s*تعداد\s*فروش:\s*<span[^>]*>(\d+)<\/span>\s*<\/div>\s*<\/div>/isu', $response, $matches)) {
    $productsCount = (int) $matches[1];
    $salesCount = (int) $matches[2];
    error_log("PRODUCTS COUNT found via METHOD 4 (exact structure): " . $productsCount);
    error_log("SALES COUNT found via METHOD 4 (exact structure): " . $salesCount);
} else {
    error_log("METHOD 4: Exact HTML structure not found");
}

// Final fallback values
if ($productsCount === 0) {
    error_log("WARNING: Products count is 0, using fallback");
}
if ($salesCount === 0) {
    error_log("WARNING: Sales count is 0, using fallback");
}

// Save the response to a file for debugging (optional)
// file_put_contents('/home/bwwsexql/domains/api.farhamaghdasi.ir/last-response.html', $response);

error_log("=== FINAL RESULTS ===");
error_log("Products Count: " . $productsCount);
error_log("Sales Count: " . $salesCount);
error_log("=== END DEBUG LOG ===");

// Return only the requested data
echo json_encode([
    'products_count' => $productsCount,
    'sales_count' => $salesCount
], JSON_UNESCAPED_UNICODE);
?>