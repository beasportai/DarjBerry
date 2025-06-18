import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// System webhook for internal monitoring and health checks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, source } = body;

    console.log(`System webhook received: ${type} from ${source}`);

    switch (type) {
      case 'HEALTH_CHECK':
        return await handleHealthCheck(data);
      
      case 'DATABASE_BACKUP':
        return await handleDatabaseBackup(data);
      
      case 'ANALYTICS_REPORT':
        return await handleAnalyticsReport(data);
      
      case 'USER_MILESTONE':
        return await handleUserMilestone(data);
      
      case 'PAYMENT_SUMMARY':
        return await handlePaymentSummary(data);
      
      case 'ERROR_ALERT':
        return await handleErrorAlert(data);
      
      case 'SYSTEM_MAINTENANCE':
        return await handleSystemMaintenance(data);
      
      default:
        return NextResponse.json({ error: 'Unknown webhook type' }, { status: 400 });
    }

  } catch (error) {
    console.error('System webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleHealthCheck(data: any) {
  const { services, timestamp } = data;

  // Store health check results
  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: 'HEALTH_CHECK',
      funnelStage: 'SYSTEM',
      metadata: JSON.stringify({
        services,
        timestamp,
        status: 'completed'
      })
    }
  });

  // Check critical system metrics
  const metrics = await getSystemMetrics();
  
  return NextResponse.json({
    status: 'healthy',
    metrics,
    timestamp: new Date().toISOString()
  });
}

async function handleDatabaseBackup(data: any) {
  const { backupId, status, size, duration } = data;

  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: 'DATABASE_BACKUP',
      funnelStage: 'SYSTEM',
      metadata: JSON.stringify({
        backupId,
        status,
        size,
        duration,
        timestamp: new Date().toISOString()
      })
    }
  });

  return NextResponse.json({ status: 'logged' });
}

async function handleAnalyticsReport(data: any) {
  const { reportType, period, metrics } = data;

  // Store analytics report
  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: `ANALYTICS_REPORT_${reportType.toUpperCase()}`,
      funnelStage: 'ANALYTICS',
      metadata: JSON.stringify({
        reportType,
        period,
        metrics,
        generatedAt: new Date().toISOString()
      })
    }
  });

  return NextResponse.json({ status: 'report_logged' });
}

async function handleUserMilestone(data: any) {
  const { phoneNumber, milestone, value, achievement } = data;

  // Log user milestone
  await prisma.analytics.create({
    data: {
      phoneNumber: phoneNumber || 'UNKNOWN',
      event: `MILESTONE_${milestone.toUpperCase()}`,
      funnelStage: 'ACHIEVEMENT',
      metadata: JSON.stringify({
        milestone,
        value,
        achievement,
        achievedAt: new Date().toISOString()
      })
    }
  });

  // Send congratulatory WhatsApp message if applicable
  if (phoneNumber && milestone === 'FIRST_PAYMENT') {
    try {
      const { WhatsAppService } = await import('@/lib/whatsapp');
      await WhatsAppService.sendMessage(
        phoneNumber,
        `🎉 Congratulations! You've reached a berry milestone!

🌟 Achievement: ${achievement}
💫 Your journey to berry success continues!

Keep growing! 🫐`
      );
    } catch (error) {
      console.error('Milestone WhatsApp notification error:', error);
    }
  }

  return NextResponse.json({ status: 'milestone_logged' });
}

async function handlePaymentSummary(data: any) {
  const { period, totalAmount, transactionCount, successRate } = data;

  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: 'PAYMENT_SUMMARY',
      funnelStage: 'FINANCIAL',
      metadata: JSON.stringify({
        period,
        totalAmount,
        transactionCount,
        successRate,
        generatedAt: new Date().toISOString()
      })
    }
  });

  return NextResponse.json({ status: 'payment_summary_logged' });
}

async function handleErrorAlert(data: any) {
  const { errorType, severity, message, stackTrace, affectedUsers } = data;

  // Log error alert
  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: `ERROR_${severity.toUpperCase()}`,
      funnelStage: 'ERROR',
      metadata: JSON.stringify({
        errorType,
        severity,
        message,
        stackTrace: stackTrace?.substring(0, 1000), // Limit stack trace length
        affectedUsers,
        reportedAt: new Date().toISOString()
      })
    }
  });

  // If critical error, could trigger admin notifications here
  if (severity === 'CRITICAL') {
    console.error('CRITICAL ERROR ALERT:', { errorType, message, affectedUsers });
  }

  return NextResponse.json({ status: 'error_logged' });
}

async function handleSystemMaintenance(data: any) {
  const { maintenanceType, status, startTime, endTime, affectedServices } = data;

  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: `MAINTENANCE_${status.toUpperCase()}`,
      funnelStage: 'SYSTEM',
      metadata: JSON.stringify({
        maintenanceType,
        status,
        startTime,
        endTime,
        affectedServices,
        loggedAt: new Date().toISOString()
      })
    }
  });

  return NextResponse.json({ status: 'maintenance_logged' });
}

async function getSystemMetrics() {
  try {
    // Get basic system metrics from database
    const [
      totalUsers,
      activeSIPs,
      totalInvestment,
      totalPlants,
      recentMessages
    ] = await Promise.all([
      prisma.whatsAppUser.count(),
      prisma.sIPInvestment.count({ where: { status: 'ACTIVE' } }),
      prisma.sIPInvestment.aggregate({
        _sum: { totalInvested: true }
      }),
      prisma.berryPlot.aggregate({
        _sum: { plantCount: true }
      }),
      prisma.whatsAppMessage.count({
        where: {
          timestamp: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      })
    ]);

    return {
      users: {
        total: totalUsers,
        activeSIPs
      },
      investment: {
        totalAmount: totalInvestment._sum.totalInvested || 0,
        totalPlants: totalPlants._sum.plantCount || 0
      },
      activity: {
        messagesLast24h: recentMessages
      },
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Error getting system metrics:', error);
    return {
      error: 'Unable to fetch metrics',
      timestamp: new Date().toISOString()
    };
  }
}

// GET endpoint for webhook status
export async function GET() {
  const metrics = await getSystemMetrics();
  
  return NextResponse.json({
    status: 'active',
    service: 'Darjberry System Webhook',
    version: '1.0.0',
    metrics,
    timestamp: new Date().toISOString()
  });
}