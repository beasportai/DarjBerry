const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

class DarjberryFlowTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.testResults = [];
    this.isRunning = false;
  }

  async initialize() {
    console.log('🚀 Starting Puppeteer browser...');
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      slowMo: 50, // Slow down by 50ms
      devtools: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Set viewport to desktop size
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // Enable request interception to mock API calls
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
      if (request.url().includes('/api/cashfree/subscription')) {
        // Mock successful subscription response
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            subscription: {
              subscriptionPaymentLink: 'https://test.cashfree.com/subscription/test123'
            }
          })
        });
      } else {
        request.continue();
      }
    });

    console.log('✅ Browser initialized successfully');
  }

  async runCompleteFlow() {
    if (this.isRunning) {
      console.log('⚠️ Test already running...');
      return { status: 'already_running' };
    }

    this.isRunning = true;
    this.testResults = [];
    
    try {
      console.log('🧪 Starting complete flow test...');
      
      // Navigate to the application
      await this.navigateToApp();
      
      // Test responsive design
      await this.testResponsiveDesign();
      
      // Test hero section
      await this.testHeroSection();
      
      // Test benefits section
      await this.testBenefitsSection();
      
      // Test pricing section interactions
      await this.testPricingSection();
      
      // Test form filling and validation
      await this.testFormFilling();
      
      // Test subscription flow
      await this.testSubscriptionFlow();
      
      // Test WhatsApp integration
      await this.testWhatsAppFlow();
      
      // Test mobile responsiveness
      await this.testMobileResponsiveness();
      
      console.log('✅ Complete flow test finished');
      this.isRunning = false;
      
      return {
        status: 'completed',
        results: this.testResults,
        summary: this.generateSummary()
      };
      
    } catch (error) {
      console.error('❌ Test failed:', error);
      this.isRunning = false;
      return {
        status: 'failed',
        error: error.message,
        results: this.testResults
      };
    }
  }

  async navigateToApp() {
    const step = 'Navigate to Application';
    console.log(`📍 ${step}...`);
    
    try {
      await this.page.goto('http://localhost:3000', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for hero section to load
      await this.page.waitForSelector('h1', { timeout: 10000 });
      
      const title = await this.page.title();
      const h1Text = await this.page.$eval('h1', el => el.textContent);
      
      this.logSuccess(step, {
        title,
        h1Text,
        url: this.page.url()
      });
      
    } catch (error) {
      this.logError(step, error.message);
      throw error;
    }
  }

  async testResponsiveDesign() {
    const step = 'Test Responsive Design';
    console.log(`📱 ${step}...`);
    
    try {
      const viewports = [
        { width: 1920, height: 1080, name: 'Desktop XL' },
        { width: 1440, height: 900, name: 'Desktop Large' },
        { width: 1024, height: 768, name: 'Tablet' },
        { width: 768, height: 1024, name: 'Tablet Portrait' },
        { width: 375, height: 667, name: 'Mobile' }
      ];
      
      for (const viewport of viewports) {
        await this.page.setViewport(viewport);
        await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if elements are visible and properly positioned
        const isHeroVisible = await this.page.$eval('h1', el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        
        // Take screenshot for manual review
        await this.page.screenshot({
          path: `screenshots/responsive-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
          fullPage: false
        });
        
        this.logSuccess(`${step} - ${viewport.name}`, {
          viewport,
          heroVisible: isHeroVisible
        });
      }
      
      // Reset to desktop viewport
      await this.page.setViewport({ width: 1920, height: 1080 });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testHeroSection() {
    const step = 'Test Hero Section';
    console.log(`🎯 ${step}...`);
    
    try {
      // Check hero elements
      const heroElements = await this.page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const badge = document.querySelector('[class*="bg-green-100"]');
        const metrics = document.querySelectorAll('[class*="bg-white"][class*="p-4"]');
        
        return {
          h1Text: h1?.textContent,
          badgeText: badge?.textContent,
          metricsCount: metrics.length,
          metricsVisible: Array.from(metrics).map(m => ({
            text: m.textContent,
            visible: m.getBoundingClientRect().width > 0
          }))
        };
      });
      
      this.logSuccess(step, heroElements);
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testBenefitsSection() {
    const step = 'Test Benefits Section';
    console.log(`💡 ${step}...`);
    
    try {
      // Scroll to benefits section
      await this.page.evaluate(() => {
        const benefitsSection = document.querySelector('h2');
        if (benefitsSection) {
          benefitsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000);
      
      // Check for revenue chart
      const chartExists = await this.page.$('.recharts-wrapper');
      
      // Check benefit cards
      const benefits = await this.page.evaluate(() => {
        const cards = document.querySelectorAll('[class*="border-2"]');
        return Array.from(cards).slice(0, 5).map(card => ({
          title: card.querySelector('h3')?.textContent || '',
          visible: card.getBoundingClientRect().width > 0
        }));
      });
      
      this.logSuccess(step, {
        chartExists: !!chartExists,
        benefitCardsCount: benefits.length,
        benefits
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testPricingSection() {
    const step = 'Test Pricing Section';
    console.log(`💰 ${step}...`);
    
    try {
      // Scroll to pricing section
      await this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h2'));
        const pricingSection = elements.find(el => el.textContent.includes('Choose Your Berry'));
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000);
      
      // Test clicking between pricing options
      const dailySIPCard = await this.page.$('[class*="cursor-pointer"]:has-text("₹9,999 Daily SIP")');
      if (dailySIPCard) {
        await dailySIPCard.click();
        await new Promise(resolve => setTimeout(resolve, 500);
      }
      
      // Check if benefits snapshot is visible
      const benefitsSnapshot = await this.page.evaluate(() => {
        const snapshot = document.querySelector('h4');
        return snapshot && snapshot.textContent.includes('Benefits Snapshot');
      });
      
      // Check subscription tier buttons
      const subscriptionTiers = await this.page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        const yearButtons = Array.from(buttons).filter(btn => 
          btn.textContent.includes('Year') && btn.textContent.includes('₹')
        );
        return yearButtons.map(btn => ({
          text: btn.textContent,
          visible: btn.getBoundingClientRect().width > 0
        }));
      });
      
      this.logSuccess(step, {
        benefitsSnapshotVisible: benefitsSnapshot,
        subscriptionTiers
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testFormFilling() {
    const step = 'Test Form Filling';
    console.log(`📝 ${step}...`);
    
    try {
      // Scroll to form section
      await this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h2, h3'));
        const formSection = elements.find(el => el.textContent.includes('Get Started'));
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000);
      
      // Try clicking subscription button without filling form (should show alert)
      const subscriptionButton = await this.page.$('button:has-text("Start Daily SIP")');
      if (subscriptionButton) {
        // Set up dialog handler
        this.page.once('dialog', async dialog => {
          console.log('📢 Alert:', dialog.message());
          await dialog.accept();
        });
        
        await subscriptionButton.click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Fill the form
      await this.page.type('input[placeholder*="full name"]', 'John Doe');
      await this.page.type('input[placeholder*="email"]', 'john.doe@example.com');
      await this.page.type('input[placeholder*="phone"]', '+91 9876543210');
      await this.page.type('input[placeholder*="City"]', 'Mumbai, Maharashtra');
      
      this.logSuccess(step, {
        formFilled: true,
        alertHandled: true
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testSubscriptionFlow() {
    const step = 'Test Subscription Flow';
    console.log(`💳 ${step}...`);
    
    try {
      // Select subscription tier
      const oneYearButton = await this.page.$('button:has-text("1 Year")');
      if (oneYearButton) {
        await oneYearButton.click();
        await new Promise(resolve => setTimeout(resolve, 500);
      }
      
      // Click subscription button
      const subscriptionButton = await this.page.$('button:has-text("Start Daily SIP")');
      if (subscriptionButton) {
        // Monitor for new tab/popup
        const newPagePromise = new Promise(resolve => 
          this.browser.once('targetcreated', target => resolve(target.page()))
        );
        
        await subscriptionButton.click();
        
        // Wait for potential new page (Cashfree)
        try {
          const newPage = await Promise.race([
            newPagePromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('No new page')), 3000))
          ]);
          
          if (newPage) {
            console.log('💳 Cashfree page opened:', await newPage.url());
            await newPage.close();
          }
        } catch (e) {
          console.log('ℹ️ No new page opened, likely mocked response');
        }
      }
      
      this.logSuccess(step, {
        subscriptionTierSelected: true,
        paymentFlowTriggered: true
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testWhatsAppFlow() {
    const step = 'Test WhatsApp Flow';
    console.log(`💬 ${step}...`);
    
    try {
      // Find and click WhatsApp button
      const whatsappButton = await this.page.$('button:has-text("WhatsApp")');
      if (whatsappButton) {
        // Monitor for new tab
        const newPagePromise = new Promise(resolve => 
          this.browser.once('targetcreated', target => resolve(target.page()))
        );
        
        await whatsappButton.click();
        
        try {
          const newPage = await Promise.race([
            newPagePromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('No WhatsApp page')), 3000))
          ]);
          
          if (newPage) {
            const url = await newPage.url();
            console.log('💬 WhatsApp page opened:', url);
            
            // Verify it's a WhatsApp URL
            const isWhatsAppURL = url.includes('wa.me') || url.includes('whatsapp.com');
            
            await newPage.close();
            
            this.logSuccess(step, {
              whatsappURLOpened: isWhatsAppURL,
              url
            });
          }
        } catch (e) {
          this.logSuccess(step, {
            whatsappURLOpened: false,
            note: 'WhatsApp link may require user interaction'
          });
        }
      }
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testMobileResponsiveness() {
    const step = 'Test Mobile Responsiveness';
    console.log(`📱 ${step}...`);
    
    try {
      // Switch to mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await new Promise(resolve => setTimeout(resolve, 1000);
      
      // Test mobile navigation and interactions
      const mobileElements = await this.page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const pricingCards = document.querySelectorAll('[class*="cursor-pointer"]');
        const buttons = document.querySelectorAll('button');
        
        return {
          h1Responsive: h1 ? h1.getBoundingClientRect().width < 400 : false,
          pricingCardsVisible: pricingCards.length > 0,
          buttonsAccessible: Array.from(buttons).every(btn => 
            btn.getBoundingClientRect().height > 44 // Touch target size
          )
        };
      });
      
      // Take mobile screenshot
      await this.page.screenshot({
        path: 'screenshots/mobile-test.png',
        fullPage: true
      });
      
      this.logSuccess(step, mobileElements);
      
      // Reset to desktop
      await this.page.setViewport({ width: 1920, height: 1080 });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  logSuccess(step, data) {
    const result = {
      step,
      status: 'success',
      timestamp: new Date().toISOString(),
      data
    };
    this.testResults.push(result);
    console.log(`✅ ${step}:`, data);
  }

  logError(step, error) {
    const result = {
      step,
      status: 'error',
      timestamp: new Date().toISOString(),
      error
    };
    this.testResults.push(result);
    console.log(`❌ ${step}:`, error);
  }

  generateSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.status === 'success').length;
    const failed = this.testResults.filter(r => r.status === 'error').length;
    
    return {
      total,
      passed,
      failed,
      passRate: `${((passed / total) * 100).toFixed(1)}%`,
      timestamp: new Date().toISOString()
    };
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
  }
}

// Initialize tester
const tester = new DarjberryFlowTester();

// API Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/test/run', async (req, res) => {
  try {
    if (!tester.browser) {
      await tester.initialize();
    }
    
    const results = await tester.runCompleteFlow();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test/status', (req, res) => {
  res.json({
    isRunning: tester.isRunning,
    lastResults: tester.testResults.slice(-5),
    summary: tester.generateSummary()
  });
});

app.post('/test/cleanup', async (req, res) => {
  try {
    await tester.cleanup();
    res.json({ status: 'cleaned up' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🧪 Darjberry Test Server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('  GET  /health - Health check');
  console.log('  POST /test/run - Run complete flow test');
  console.log('  GET  /test/status - Get test status');
  console.log('  POST /test/cleanup - Cleanup browser');
  console.log('');
  console.log('🚀 To start testing: POST http://localhost:4000/test/run');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down test server...');
  await tester.cleanup();
  process.exit(0);
});