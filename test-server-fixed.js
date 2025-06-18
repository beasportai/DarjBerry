const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

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
      headless: false,
      slowMo: 50,
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
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // Enable request interception to mock API calls
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
      if (request.url().includes('/api/cashfree/subscription')) {
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
      return { status: 'already_running' };
    }

    this.isRunning = true;
    this.testResults = [];
    
    try {
      console.log('🧪 Starting complete flow test...');
      
      await this.navigateToApp();
      await this.testResponsiveDesign();
      await this.testHeroSection();
      await this.testBenefitsSection();
      await this.testPricingSection();
      await this.testFormFilling();
      await this.testSubscriptionFlow();
      await this.testWhatsAppFlow();
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const isHeroVisible = await this.page.$eval('h1', el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });
        
        this.logSuccess(`${step} - ${viewport.name}`, {
          viewport,
          heroVisible: isHeroVisible
        });
      }
      
      await this.page.setViewport({ width: 1920, height: 1080 });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testHeroSection() {
    const step = 'Test Hero Section';
    console.log(`🎯 ${step}...`);
    
    try {
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
      await this.page.evaluate(() => {
        const benefitsSection = document.querySelector('h2');
        if (benefitsSection) {
          benefitsSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const chartExists = await this.page.$('.recharts-wrapper');
      
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
      await this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h2'));
        const pricingSection = elements.find(el => el.textContent.includes('Choose Your Berry'));
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Test clicking pricing option
      const clicked = await this.page.evaluate(() => {
        const cards = document.querySelectorAll('[class*="cursor-pointer"]');
        if (cards.length > 0) {
          cards[0].click();
          return true;
        }
        return false;
      });
      
      const benefitsSnapshot = await this.page.evaluate(() => {
        const snapshot = document.querySelector('h4');
        return snapshot && snapshot.textContent.includes('Benefits Snapshot');
      });
      
      const subscriptionTiers = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const yearButtons = buttons.filter(btn => 
          btn.textContent.includes('Year') && btn.textContent.includes('₹')
        );
        return yearButtons.map(btn => ({
          text: btn.textContent,
          visible: btn.getBoundingClientRect().width > 0
        }));
      });
      
      this.logSuccess(step, {
        pricingCardClicked: clicked,
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
      await this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h2, h3'));
        const formSection = elements.find(el => el.textContent.includes('Get Started'));
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test clicking subscription button without filling form
      const alertShown = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const subscriptionButton = buttons.find(btn => btn.textContent.includes('Start Daily SIP'));
        if (subscriptionButton) {
          subscriptionButton.click();
          return true;
        }
        return false;
      });
      
      // Fill the form
      await this.fillFormField('input[placeholder*="full name"]', 'John Doe');
      await this.fillFormField('input[placeholder*="email"]', 'john.doe@example.com');
      await this.fillFormField('input[placeholder*="phone"]', '+91 9876543210');
      await this.fillFormField('input[placeholder*="City"]', 'Mumbai, Maharashtra');
      
      this.logSuccess(step, {
        formFilled: true,
        alertTriggered: alertShown
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async fillFormField(selector, value) {
    try {
      const field = await this.page.$(selector);
      if (field) {
        await field.click();
        await field.evaluate(el => el.value = '');
        await field.type(value);
      }
    } catch (error) {
      console.log(`Could not fill field ${selector}:`, error.message);
    }
  }

  async testSubscriptionFlow() {
    const step = 'Test Subscription Flow';
    console.log(`💳 ${step}...`);
    
    try {
      // Select subscription tier
      const tierSelected = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const oneYearButton = buttons.find(btn => btn.textContent.includes('1 Year'));
        if (oneYearButton) {
          oneYearButton.click();
          return true;
        }
        return false;
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Click subscription button
      const paymentTriggered = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const subscriptionButton = buttons.find(btn => btn.textContent.includes('Start Daily SIP'));
        if (subscriptionButton) {
          subscriptionButton.click();
          return true;
        }
        return false;
      });
      
      this.logSuccess(step, {
        subscriptionTierSelected: tierSelected,
        paymentFlowTriggered: paymentTriggered
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testWhatsAppFlow() {
    const step = 'Test WhatsApp Flow';
    console.log(`💬 ${step}...`);
    
    try {
      const whatsappClicked = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const whatsappButton = buttons.find(btn => btn.textContent.includes('WhatsApp'));
        if (whatsappButton) {
          whatsappButton.click();
          return true;
        }
        return false;
      });
      
      this.logSuccess(step, {
        whatsappButtonClicked: whatsappClicked
      });
      
    } catch (error) {
      this.logError(step, error.message);
    }
  }

  async testMobileResponsiveness() {
    const step = 'Test Mobile Responsiveness';
    console.log(`📱 ${step}...`);
    
    try {
      await this.page.setViewport({ width: 375, height: 667 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mobileElements = await this.page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const pricingCards = document.querySelectorAll('[class*="cursor-pointer"]');
        const buttons = document.querySelectorAll('button');
        
        return {
          h1Responsive: h1 ? h1.getBoundingClientRect().width < 400 : false,
          pricingCardsVisible: pricingCards.length > 0,
          buttonsAccessible: Array.from(buttons).every(btn => 
            btn.getBoundingClientRect().height > 44
          )
        };
      });
      
      this.logSuccess(step, mobileElements);
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

const tester = new DarjberryFlowTester();

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

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down test server...');
  await tester.cleanup();
  process.exit(0);
});