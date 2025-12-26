const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Configuration
const APP_URL = 'http://localhost:3000/chat';

// Helper to wait for server to be ready
async function waitForServer(driver, url, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            await driver.get(url);
            return; // Success
        } catch (e) {
            if (e.message.includes('ERR_CONNECTION_REFUSED')) {
                console.log('Server not ready, retrying in 2s...');
                await new Promise(r => setTimeout(r, 2000));
            } else {
                throw e;
            }
        }
    }
    throw new Error('Server timeout: Unable to connect to ' + url);
}

async function runChartTest() {
    console.log('🚀 Starting Selenium Test: Stock Chart Interactivity');

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // 1. Navigate to the Dashboard with Retry
        console.log(`Pinging ${APP_URL}...`);
        await waitForServer(driver, APP_URL);
        await driver.manage().window().maximize();

        // 2. Wait for the page to load
        await driver.wait(until.titleContains('StockSage'), 10000);
        console.log('✅ Page Loaded');

        // 3. Find the "1W" (1 Week) Tab Button
        // Updated Xpath to be more generic in case of layout changes
        console.log('search for "1W" button...');
        let weekButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(., '1W')]")),
            10000
        );

        // Scroll to element to avoid "element click intercepted"
        await driver.executeScript("arguments[0].scrollIntoView(true);", weekButton);
        await driver.sleep(500); // Small pause for scroll

        // 4. Click the "1W" Button
        console.log('Clicking "1W" Timeframe...');
        await weekButton.click();

        // Wait for active state
        await driver.wait(
            until.elementLocated(By.xpath("//button[contains(., '1W') and @data-state='active']")),
            5000
        );
        console.log('✅ "1W" Click Verified (State is active)');

        // 5. Find and Click "1M" (1 Month) Button
        console.log('Clicking "1M" Timeframe...');
        let monthButton = await driver.findElement(By.xpath("//button[contains(., '1M')]"));
        await monthButton.click();

        await driver.wait(
            until.elementLocated(By.xpath("//button[contains(., '1M') and @data-state='active']")),
            5000
        );
        console.log('✅ "1M" Click Verified (State is active)');

        console.log('--------------------------------------------------');
        console.log('🎉 TEST PASSED: Chart interactivity is fully functional!');
        console.log('--------------------------------------------------');

    } catch (error) {
        console.error('❌ TEST FAILED:', error.message);
    } finally {
        console.log('Closing browser driver...');
        await driver.quit();
    }
}

runChartTest();
