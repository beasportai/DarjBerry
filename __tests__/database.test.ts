/**
 * TDD Test 3: Database connection establishes
 */

import { PrismaClient } from '@prisma/client'

describe('Database Connection', () => {
  let prisma: PrismaClient

  beforeAll(() => {
    // Initialize Prisma client for testing
    prisma = new PrismaClient()
  })

  afterAll(async () => {
    // Clean up database connection
    await prisma.$disconnect()
  })

  // Test basic database connection
  it('should establish connection to database', async () => {
    // This will throw if connection fails
    await expect(prisma.$connect()).resolves.not.toThrow()
  })

  // Test database query capability
  it('should be able to query the database', async () => {
    // Test a simple query that doesn't depend on data
    const result = await prisma.$queryRaw`SELECT 1 as test`
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  // Test that we can check database schema
  it('should have access to defined models', async () => {
    // Test that our models are accessible
    expect(prisma.whatsAppUser).toBeDefined()
    expect(prisma.whatsAppMessage).toBeDefined()
    expect(prisma.landAnalysis).toBeDefined()
    expect(prisma.investment).toBeDefined()
    expect(prisma.lead).toBeDefined()
    expect(prisma.analytics).toBeDefined()
  })

  // Test database health check
  it('should return database health status', async () => {
    // Test that we can check if database is healthy
    try {
      await prisma.$queryRaw`SELECT 1`
      // If we get here, database is healthy
      expect(true).toBe(true)
    } catch (error) {
      // Database connection failed
      fail('Database health check failed: ' + error)
    }
  })

  // Test transaction capability
  it('should support database transactions', async () => {
    // Test that we can use transactions
    const result = await prisma.$transaction(async (tx) => {
      // Simple transaction test
      return await tx.$queryRaw`SELECT 1 as transaction_test`
    })
    
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  // Test that database URL is correctly configured
  it('should use correct database configuration', () => {
    // Check that database URL is set
    const databaseUrl = process.env.DATABASE_URL
    expect(databaseUrl).toBeDefined()
    
    // For testing, it should be either SQLite or test database
    if (databaseUrl) {
      expect(databaseUrl).toMatch(/^(file:|postgresql:\/\/)/)
    }
  })

  // Test Prisma client configuration
  it('should have Prisma client properly configured', () => {
    expect(prisma).toBeDefined()
    expect(typeof prisma.$connect).toBe('function')
    expect(typeof prisma.$disconnect).toBe('function')
    expect(typeof prisma.$transaction).toBe('function')
    expect(typeof prisma.$queryRaw).toBe('function')
  })
})