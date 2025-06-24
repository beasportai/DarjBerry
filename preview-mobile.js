const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

let browser;
let page;

async function startPreview() {
  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 375,
      height: 667,
      isMobile: true,
      hasTouch: true
    },
    args: ['--window-size=375,667']
  });
  
  page = await browser.newPage();
  await page.emulate(puppeteer.devices['iPhone 8']);
  
  // Navigate to the local development server
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  console.log('Puppeteer preview started on iPhone 8 viewport (375x667)');
  console.log('Browser window will stay open for live preview');
  console.log('Press Ctrl+C to close');
}

// Keep the process running
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit();
});

startPreview().catch(console.error);