import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { WhatsAppService } from '@/lib/whatsapp';
// import { LocationService } from '@/lib/location-service';
import { DailySIPCalculator } from '@/lib/daily-sip-calculator';
import { CashfreeProvider } from '@/lib/cashfree-provider';
// import { InvestmentCalculator } from '@/lib/investment-calculator';
import { WhatsAppMessage } from '@/types/whatsapp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('WhatsApp webhook received:', body);

    // Handle WhatsApp webhook verification
    if (body.hub && body.hub.mode === 'subscribe') {
      const token = body.hub.verify_token;
      const challenge = body.hub.challenge;
      
      if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 });
      } else {
        return new NextResponse('Unauthorized', { status: 403 });
      }
    }

    // Process incoming WhatsApp messages
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
      const messages = body.entry[0].changes[0].value.messages;
      
      for (const message of messages) {
        await processWhatsAppMessage(message);
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function processWhatsAppMessage(message: WhatsAppMessage) {
  const phoneNumber = message.from;
  const messageText = message.text?.body || '';
  const location = message.location;

  // Log the message
  await prisma.whatsAppMessage.create({
    data: {
      phoneNumber,
      messageType: 'RECEIVED',
      content: messageText,
      metadata: JSON.stringify(message),
    },
  });

  // Get or create user
  let user = await prisma.whatsAppUser.findUnique({
    where: { phoneNumber },
  });

  if (!user) {
    user = await prisma.whatsAppUser.create({
      data: {
        phoneNumber,
        state: 'NEW',
      },
    });
  }

  // Process message based on user state
  const response = await generateResponse(user, messageText, location);
  
  // Send response
  if (response) {
    await WhatsAppService.sendMessage(phoneNumber, response);
    
    // Log sent message
    await prisma.whatsAppMessage.create({
      data: {
        phoneNumber,
        messageType: 'SENT',
        content: response,
      },
    });
  }

  // Update user interaction timestamp
  await prisma.whatsAppUser.update({
    where: { phoneNumber },
    data: { lastInteraction: new Date() },
  });
}

async function generateResponse(user: { phoneNumber: string; state: string; location?: string | null }, messageText: string, location?: { latitude: number; longitude: number }): Promise<string | null> {
  const lowerText = messageText.toLowerCase().trim();

  switch (user.state) {
    case 'NEW':
      return handleNewUser(user, lowerText);
    
    case 'SELECTING_SERVICE':
      return handleServiceSelection(user, lowerText);
    
    case 'SIP_EXPLANATION':
      return handleSIPExplanation(user, lowerText);
    
    case 'SIP_ONBOARDING':
      return handleSIPOnboarding(user, lowerText);
    
    case 'LOCATION_ANALYSIS':
      if (location) {
        return handleLocationAnalysis(user, location);
      }
      return handleLocationByName(user, lowerText);
    
    case 'SIP_PACKAGE_SELECTION':
      return handlePackageSelection(user, lowerText);
    
    case 'MEMBER_DASHBOARD':
      return handleMemberDashboard(user, lowerText);
    
    case 'DARJEELING_INTEREST':
      return handleDarjeelingInterest(user, lowerText);
    
    default:
      return handleDefaultResponse(user, messageText);
  }
}

async function handleNewUser(user: { phoneNumber: string }, _messageText: string): Promise<string> {
  await prisma.whatsAppUser.update({
    where: { phoneNumber: user.phoneNumber },
    data: { state: 'SELECTING_SERVICE' },
  });

  return `Hey hey! 👋  
Welcome to **Darjberry** — where we turn your ₹10k daily into sweet, tax-free blueberry farms 🌱

What can I help with today?

1. How does this berry SIP thing work?
2. I want in! Let's start investing
3. Show me my berry plots
4. Talk to a real person (preferably with opposable thumbs)

Reply with a number or just tell me what's on your mind 😄`;
}

async function handleServiceSelection(user: { phoneNumber: string }, messageText: string): Promise<string> {
  switch (messageText) {
    case '1':
      await prisma.whatsAppUser.update({
        where: { phoneNumber: user.phoneNumber },
        data: { state: 'SIP_EXPLANATION' },
      });
      
      return `Ah, curious about our berry magic? Let me break it down! 🫐

We're a co-op. A proper, legal, tax-free, multi-state _let's-grow-berries-together_ kind of gang.

Here's the deal:
💰 You invest ₹10,000/day (₹3 lakh/month)
🌱 We provide 100 plants/month including complete setup
💸 You get dividends from Year 3 (₹8k-25k per 100 plants annually)
🎉 Plus: Free farm stays, berry boxes & tea estate tours!

Best part? It's 100% tax-free agricultural income under Section 10(1)!

Want to know more?
A) Why blueberries? (Hint: Bryan Johnson eats them daily)
B) Show me the numbers 📊
C) I'm ready to join!

Reply A, B, or C`;

    case '2':
      await prisma.whatsAppUser.update({
        where: { phoneNumber: user.phoneNumber },
        data: { state: 'SIP_ONBOARDING' },
      });
      
      return `Berry nice! Let's get you started 🌱

This'll take 5 minutes. Less time than scrolling Instagram!

**Step 1**: What's your full name? 
(as per PAN/Aadhaar — no nicknames like "CryptoKing007", please)`;

    case '3':
      // Check if user has existing SIP
      const existingSIP = await prisma.sIPInvestment.findFirst({
        where: { phoneNumber: user.phoneNumber }
      });
      
      if (existingSIP) {
        await prisma.whatsAppUser.update({
          where: { phoneNumber: user.phoneNumber },
          data: { state: 'MEMBER_DASHBOARD' },
        });
        return handleMemberDashboard(user, 'STATS');
      } else {
        return `You don't have any berry plots yet! 🫐

Start your berry journey:
Reply 2 to begin investing

Or want to learn more first?
Reply 1 to understand how it works`;
      }

    case '4':
      return `Alright, I'm connecting you to a real human. They don't have my charm, but they have opposable thumbs 🫶

Our team will reach out to you shortly during business hours (9 AM - 6 PM).

Meanwhile, feel free to:
- Reply 1 to learn about our SIP
- Reply 2 to start investing
- Ask me any questions!`;

    default:
      return `Oops! I didn't quite get that. Maybe try a number (1-4) or say "help"? I've had too many berries today 😅`;
  }
}

/*
async function _handleLandDetails(user: { phoneNumber: string }, messageText: string, _location?: { latitude: number; longitude: number }): Promise<string> {
  if (messageText === 'yes') {
    await prisma.whatsAppUser.update({
      where: { phoneNumber: user.phoneNumber },
      data: { state: 'LOCATION_SHARED' },
    });

    return `Great! Let's analyze your land suitability.

Please share your location using the 📍 attachment button, or tell us your area name (e.g., "Darjeeling", "Kurseong", "Siliguri").`;
  }

  if (messageText === 'no') {
    return `No problem! We have options for you too.

🤝 Partnership Options:
1. Connect with landowners seeking investors
2. Lease land for farming (we can help arrange)
3. Start with smaller investment

Minimum investment: ₹10,000/day SIP

Interested in learning more?
Reply YES to continue`;
  }

  // Handle area information
  if (messageText.length > 2) {
    return await handleLocationByName(user, messageText);
  }

  return `Please reply with YES if you own land, or NO if you don't.`;
}
*/

// Removed duplicate handleLocationByName - using the better implementation below

// Removed duplicate handleLocationAnalysis - using the better implementation below

/*
async function _handleProposalGeneration(user: { phoneNumber: string }, messageText: string): Promise<string> {
  const acres = parseFloat(messageText);
  
  if (isNaN(acres) || acres <= 0) {
    return `Please enter a valid number of acres (e.g., "2" for 2 acres, "0.5" for half acre).`;
  }

  const calculation = InvestmentCalculator.calculate(acres);
  
  await prisma.investment.create({
    data: {
      phoneNumber: user.phoneNumber,
      plantsCount: calculation.plants,
      acres,
      totalCost: calculation.totalCost,
      expectedYield: calculation.expectedYield,
      expectedRevenue: calculation.expectedRevenue,
      roiYears: calculation.roiYears,
    },
  });

  await prisma.whatsAppUser.update({
    where: { phoneNumber: user.phoneNumber },
    data: { 
      landSize: acres,
      state: 'FOLLOW_UP',
    },
  });

  return `💰 Berry SIP Calculation for ${acres} acres:

🌱 Plants needed: ${calculation.plants}
💵 Daily SIP: ₹10,000 (₹${(calculation.totalCost / 100000 / 365).toFixed(0)}k for ${Math.ceil(calculation.totalCost / 3650000)} years)
📈 Expected yield: ${calculation.expectedYield} kg/year (from Year 2)
💰 Annual dividend: ₹${(calculation.expectedRevenue * 0.4 / 100000).toFixed(0)}k-₹${(calculation.expectedRevenue * 0.6 / 100000).toFixed(0)}k (Years 3-5)
⏰ Payouts start: Year 3

You own part of the farm! Come pick berries, do yoga, contemplate life choices 🧘‍♂️

Would you like:
A) Detailed PDF Proposal
B) Schedule Farm Visit  
C) Talk to Expert

Reply A, B, or C`;
}
*/

async function handleDefaultResponse(user: { phoneNumber: string }, messageText: string): Promise<string> {
  // AI fallback for conversational responses
  const contextualResponse = await generateAIFallback(user, messageText);
  
  return `${contextualResponse}

Need specific help?
1️⃣ Learn about berry SIP
2️⃣ Start investing
3️⃣ Show my plots
4️⃣ Talk to human

Reply 1, 2, 3, or 4`;
}

async function generateAIFallback(user: { phoneNumber: string }, messageText: string): Promise<string> {
  // Get user context for personalized response
  const userData = await prisma.whatsAppUser.findUnique({
    where: { phoneNumber: user.phoneNumber },
    include: {
      sipInvestments: true,
      berryPlots: true
    }
  });
  
  const hasActiveSIP = userData?.sipInvestments?.some(sip => sip.status === 'ACTIVE');
  const totalPlants = userData?.berryPlots?.reduce((sum, plot) => sum + plot.plantCount, 0) || 0;
  
  // Simple contextual responses based on message content
  const message = messageText.toLowerCase();
  
  if (message.includes('help') || message.includes('what') || message.includes('how')) {
    return hasActiveSIP 
      ? `You're already growing ${totalPlants} plants! I can help with your berry journey.`
      : `I'm here to help you start your berry farming adventure! ₹10k daily gets you 100 plants monthly.`;
  }
  
  if (message.includes('price') || message.includes('cost') || message.includes('money')) {
    return `Our daily SIP is ₹10,000 per day (₹3L monthly) for 100 blueberry plants including complete setup.`;
  }
  
  if (message.includes('darjeeling') || message.includes('tea') || message.includes('estate')) {
    return `Darjeeling tea estate partnerships launching Q2 2025! For now, we work on your own land.`;
  }
  
  if (message.includes('location') || message.includes('where') || message.includes('land')) {
    return `We work across India, but North Bengal (especially Darjeeling) is ideal for blueberry farming.`;
  }
  
  if (message.includes('return') || message.includes('profit') || message.includes('dividend')) {
    return `Dividends start Year 3: ₹8k-25k annually per 100 plants. Plus farm stays, berry boxes & tours!`;
  }
  
  if (message.includes('thanks') || message.includes('thank')) {
    return `You're berry welcome! 🫐`;
  }
  
  if (message.includes('bye') || message.includes('goodbye')) {
    return `Bye! Your berry empire awaits whenever you're ready! 👋`;
  }
  
  // Default conversational response
  return hasActiveSIP 
    ? `I didn't quite catch that, but I see you're already part of our berry family! 🫐`
    : `I didn't quite understand that, but I'd love to help you explore blueberry farming! 🌱`;
}

// New handler functions for Darjberry flow
async function handleSIPExplanation(user: { phoneNumber: string }, messageText: string): Promise<string> {
  switch (messageText.toUpperCase()) {
    case 'A':
      return `Ooh, you want the juicy health secrets! 🧬

Blueberries are basically time machines for your cells. Here's why:

🫐 **Anthocyanins**: Nature's anti-aging ninjas
⚡ **Pterostilbene**: Better than resveratrol (sorry, red wine)
🧠 **Brain boost**: Improves memory & cognition
💪 **Longevity**: Studies show 3.23 years biological age reduction!

Bryan Johnson (the "don't die" guy) eats 70g daily. His 800k+ followers are going berry crazy!

Fun fact: Our berries test 2x higher in antioxidants than imported ones. Because North Bengal soil is magical ✨

Ready to invest in your health AND wealth?
Reply YES to start!`;

    case 'B':
      const calculation = DailySIPCalculator.calculate(10000);
      return `Numbers! My favorite bedtime story 📈

**Your Daily Investment:**
• ₹10,000/day (₹3 lakh/month)
• 100 plants per month including setup

**What You Get:**
• Plants on your own land (we provide everything else)
• Annual dividends from Year 3:
  - Year 3: ₹${(calculation.expectedDividends.year3.min/1000).toFixed(0)}k-₹${(calculation.expectedDividends.year3.max/1000).toFixed(0)}k per 100 plants
  - Year 4: ₹${(calculation.expectedDividends.year4.min/1000).toFixed(0)}k-₹${(calculation.expectedDividends.year4.max/1000).toFixed(0)}k
  - Year 5: ₹${(calculation.expectedDividends.year5.min/1000).toFixed(0)}k-₹${(calculation.expectedDividends.year5.max/1000).toFixed(0)}k
• 100% tax-free returns!

**Bonus Perks:**
🏡 Annual farm stay worth ₹25,000
📦 Quarterly berry boxes worth ₹12,000
🍃 Tea estate tours worth ₹8,000

Ready to start?
Reply START`;

    case 'C':
      await prisma.whatsAppUser.update({
        where: { phoneNumber: user.phoneNumber },
        data: { state: 'SIP_ONBOARDING' },
      });
      return `Berry nice! Let's get you started 🌱

This'll take 5 minutes. Less time than scrolling Instagram!

**Step 1**: What's your full name? 
(as per PAN/Aadhaar — no nicknames like "CryptoKing007", please)`;

    default:
      return `Please choose A, B, or C. Or if you're ready to join, just reply "START"!`;
  }
}

async function handleSIPOnboarding(user: { phoneNumber: string }, messageText: string): Promise<string> {
  const userData = await prisma.whatsAppUser.findUnique({
    where: { phoneNumber: user.phoneNumber }
  });

  // Step 1: Collect name
  if (!userData?.name) {
    await prisma.whatsAppUser.update({
      where: { phoneNumber: user.phoneNumber },
      data: { name: messageText }
    });
    
    return `Perfect, ${messageText}! Welcome to the berry family 🫐

**Step 2**: Your email + phone number?
(We promise not to spam. Just berry important updates!)

Example: john@email.com, 9876543210`;
  }

  // Step 2: Collect email
  if (!userData?.email) {
    const parts = messageText.split(',');
    const email = parts[0]?.trim();
    
    await prisma.whatsAppUser.update({
      where: { phoneNumber: user.phoneNumber },
      data: { email }
    });
    
    return `**Step 3**: Share your location so we can analyze land suitability for blueberry farming!

🌍 Tap the 📍 attachment button to share your location

Or tell us your city/area: (e.g., "Mumbai", "Darjeeling", "Bangalore")`;
  }

  // Step 3: Location analysis
  await prisma.whatsAppUser.update({
    where: { phoneNumber: user.phoneNumber },
    data: { state: 'LOCATION_ANALYSIS' }
  });
  
  return handleLocationByName(user, messageText);
}

async function handleLocationAnalysis(user: { phoneNumber: string }, location: { latitude: number; longitude: number }): Promise<string> {
  try {
    // Call our new geospatial API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/location/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        source: 'whatsapp'
      })
    });

    if (!response.ok) {
      throw new Error('Location analysis failed');
    }

    const { analysis, whatsappMessage, recommendations } = await response.json();
    
    // Store in database
    await prisma.landAnalysis.create({
      data: {
        phoneNumber: user.phoneNumber,
        latitude: location.latitude,
        longitude: location.longitude,
        location: analysis.location.address || '',
        district: analysis.location.city || '',
        soilPh: analysis.soilAnalysis.pH,
        climateScore: analysis.overallSuitability === 'EXCELLENT' ? 95 :
                      analysis.overallSuitability === 'GOOD' ? 80 :
                      analysis.overallSuitability === 'MODERATE' ? 60 : 40,
        suitability: analysis.overallSuitability,
      },
    });

    await prisma.whatsAppUser.update({
      where: { phoneNumber: user.phoneNumber },
      data: { 
        state: 'SIP_PACKAGE_SELECTION',
        location: `${analysis.location.city}, ${analysis.location.state}`,
      },
    });

    return `${whatsappMessage}

What would you like to do next?
A) ${recommendations.primaryAction === 'START_INVESTMENT' ? 'Start investing now!' : 'Get expert consultation'}
B) Learn more about setup process
C) See tax benefit details

Reply A, B, or C`;
    
  } catch (error) {
    console.error('Location analysis error:', error);
    return `Sorry, I couldn't analyze that location right now. 

Could you tell me your city/area name instead? 
(e.g., "Mumbai", "Bangalore", "Kolkata")`;
  }
}

async function handleLocationByName(user: { phoneNumber: string }, areaName: string): Promise<string> {
  const isDarjeeling = areaName.toLowerCase().includes('darjeeling');
  const isNorthBengal = ['siliguri', 'jalpaiguri', 'cooch behar', 'kurseong'].some(area => 
    areaName.toLowerCase().includes(area)
  );

  await prisma.whatsAppUser.update({
    where: { phoneNumber: user.phoneNumber },
    data: { 
      state: 'SIP_PACKAGE_SELECTION',
      location: areaName,
    },
  });

  if (isDarjeeling) {
    return `🏔️ **DARJEELING DETECTED!** You're in our prime zone!

📍 **${areaName}**
⭐ Suitability Score: 95/100 (Premium location!)

🔔 **SPECIAL OPPORTUNITY:**
You're eligible for our exclusive **Darjeeling Tea Estate Partnership Program** (launching Q2 2025)

**Current Option:**
💰 ₹10k daily SIP on your own land
🌱 100 plants/month including complete setup

Want to be first in line?
A) Register for tea estate program
B) Start with own land now
C) Get detailed proposal

Reply A, B, or C

*Darjeeling residents get priority access! 🫐*`;
  }

  if (isNorthBengal) {
    return `🌱 Excellent! ${areaName} is perfect for our berry operations!

📍 Suitability Score: 85/100
✅ Great climate for blueberry cultivation
✅ Close to our North Bengal expertise hub

**Ready for your ₹10k daily SIP?**
💰 Investment: ₹10,000/day (₹3L/month)
🌱 Plants: 100 plants per month including setup
📈 Returns: Start Year 3

What's next?
A) Show investment calculation
B) I want to start now!
C) Learn about tax benefits

Reply A, B, or C`;
  }

  return `📍 Location: ${areaName}

Thanks for sharing! We can work with locations across India.

**Our Model:**
💰 ₹10k daily SIP (₹3L monthly)
🌱 100 plants/month on your own land
🏠 We provide complete setup & expertise

Ready to see the numbers?
A) Show calculation
B) Start now
C) More questions

Reply A, B, or C`;
}

async function handlePackageSelection(user: { phoneNumber: string }, messageText: string): Promise<string> {
  switch (messageText.toUpperCase()) {
    case 'A':
      // Register for Darjeeling tea estate interest
      await prisma.darjeelingInterest.upsert({
        where: { phoneNumber: user.phoneNumber },
        update: { registeredAt: new Date() },
        create: {
          phoneNumber: user.phoneNumber,
          name: (await prisma.whatsAppUser.findUnique({ where: { phoneNumber: user.phoneNumber } }))?.name || '',
          location: '',
        }
      });

      return `🔔 **Registered for Darjeeling Tea Estate Program!**

You're now on our priority list for premium tea estate partnerships.

**What happens next:**
📧 You'll get exclusive updates about the program
📅 Priority access when we launch (Q2 2025)
🏔️ First choice of premium high-altitude plots

**Meanwhile, want to start with your own land?**
B) Start ₹10k daily SIP now
C) Get detailed proposal

We'll keep you posted about Darjeeling! 🫐`;

    case 'B':
      // Start payment flow
      return await createPaymentLink(user);

    case 'C':
      const calculation = DailySIPCalculator.calculate(10000);
      return `📊 **Detailed Darjberry Proposal**

**Investment Structure:**
💰 Daily: ₹10,000
📅 Monthly: ₹3,00,000
📈 Annual: ₹36,50,000

**Plant Allocation:**
🌱 100 plants per month including:
- Premium Emerald/Jewel variety plants
- Complete polyhouse setup
- Soil preparation & pH adjustment
- Drip irrigation system
- Expert consultation

**Expected Returns (per 100 plants):**
Year 3: ₹${(calculation.expectedDividends.year3.min/1000).toFixed(0)}k - ₹${(calculation.expectedDividends.year3.max/1000).toFixed(0)}k
Year 4: ₹${(calculation.expectedDividends.year4.min/1000).toFixed(0)}k - ₹${(calculation.expectedDividends.year4.max/1000).toFixed(0)}k
Year 5: ₹${(calculation.expectedDividends.year5.min/1000).toFixed(0)}k - ₹${(calculation.expectedDividends.year5.max/1000).toFixed(0)}k

**Member Benefits:**
🏡 Annual farm stay (₹25,000 value)
📦 Quarterly berry boxes (₹12,000 value)
🍃 Tea estate tours (₹8,000 value)

Ready to start?
Reply START to begin payment setup!`;

    default:
      return `Please choose A, B, or C to continue your berry journey! 🫐`;
  }
}

async function createPaymentLink(user: { phoneNumber: string }): Promise<string> {
  try {
    const userData = await prisma.whatsAppUser.findUnique({
      where: { phoneNumber: user.phoneNumber }
    });

    if (!userData?.name || !userData?.email) {
      return `We need your details first! Please provide:
Name: [Your name]
Email: [Your email]`;
    }

    const cashfreeProvider = new CashfreeProvider();
    const paymentData = await cashfreeProvider.createDailySIPSubscription(
      user.phoneNumber,
      10000,
      {
        name: userData.name,
        email: userData.email
      }
    );

    // Create SIP investment record
    await prisma.sIPInvestment.create({
      data: {
        phoneNumber: user.phoneNumber,
        packageType: 'DAILY_STANDARD',
        dailyAmount: 10000,
        subscriptionId: 'temp_subscription_id',
        nextPaymentDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      }
    });

    return `🎉 **Almost there, ${userData.name}!**

I've created your daily SIP subscription. Complete your payment setup:

💳 **Payment Link:** https://darjberry.com/payment-setup

**What happens after payment:**
✅ Daily auto-debit of ₹10,000 starts
🌱 100 plants allocated every month
📊 Real-time tracking via WhatsApp
🎁 Welcome berry box ships within 7 days

Payment is secure via Cashfree. Your berry empire awaits! 🫐

Need help? Just reply "HELP"`;

  } catch (error) {
    console.error('Payment creation error:', error);
    return `Oops! Something went berry wrong with payment setup 😅

Our team will reach out to help you complete the process.

Meanwhile, reply "RETRY" to try again or "HELP" for assistance.`;
  }
}

async function handleMemberDashboard(user: { phoneNumber: string }, messageText: string): Promise<string> {
  const sipData = await prisma.sIPInvestment.findFirst({
    where: { phoneNumber: user.phoneNumber }
  });

  const berryPlots = await prisma.berryPlot.findMany({
    where: { phoneNumber: user.phoneNumber }
  });

  const totalPlants = berryPlots.reduce((sum, plot) => sum + plot.plantCount, 0);
  const monthsActive = sipData ? Math.floor((Date.now() - sipData.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;

  if (messageText.toUpperCase() === 'STATS' || messageText === '3') {
    return `🫐 **Your Berry Stats™**

📅 SIP Started: ${sipData?.startDate.toDateString() || 'Not started'}
💰 Daily: ₹${sipData?.dailyAmount.toLocaleString() || '0'}
💵 Total Invested: ₹${sipData?.totalInvested.toLocaleString() || '0'}
🌱 Total Plants: ${totalPlants}
📍 Locations: ${berryPlots.length} allocation${berryPlots.length !== 1 ? 's' : ''}

**Dividend Status:**
• Payouts start: Year 3 (${monthsActive < 36 ? `${36 - monthsActive} months to go` : 'Started!'})
• Expected yearly: ₹${(totalPlants * 120).toLocaleString()} - ₹${(totalPlants * 250).toLocaleString()}

**Your Perks:**
🏡 Farm stay credits: 2 nights available
📦 Next berry box: Ships 15th
🍃 Tea estate tour: Available

Need help with:
A) Add more plants
B) Book farm visit
C) Refer a friend (earn ₹1000!)
D) Update details

Reply A, B, C, or D`;
  }

  // Handle other dashboard options...
  return `Welcome back, berry boss! 👑

Your daily SIP is growing beautifully! 🌱

Reply STATS to see your full dashboard`;
}

async function handleDarjeelingInterest(_user: { phoneNumber: string }, _messageText: string): Promise<string> {
  // Handle Darjeeling tea estate interest registration
  return `🔔 Thanks for your interest in our Darjeeling Tea Estate Program!

You'll be notified as soon as we launch. Keep growing berries! 🫐`;
}

export async function GET() {
  return NextResponse.json({ message: 'WhatsApp webhook endpoint' });
}