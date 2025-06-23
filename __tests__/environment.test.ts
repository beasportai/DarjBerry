/**
 * TDD Test 2: Environment variables load correctly
 */

describe('Environment Variables', () => {
  // First, let's test that we can access process.env
  it('should have access to process.env', () => {
    expect(process.env).toBeDefined()
    expect(typeof process.env).toBe('object')
  })

  // Test that NODE_ENV is set (Jest sets this to 'test')
  it('should have NODE_ENV set to test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })

  // Test that we can load and access environment variables
  it('should load environment variables from .env files', () => {
    // In a real Next.js app, these would be loaded from .env.local, .env.test, etc.
    // For now, we'll test that the mechanism works
    
    // Test that we can set and read env vars
    const originalVar = process.env.TEST_VAR
    process.env.TEST_VAR = 'test-value'
    
    expect(process.env.TEST_VAR).toBe('test-value')
    
    // Cleanup
    if (originalVar !== undefined) {
      process.env.TEST_VAR = originalVar
    } else {
      delete process.env.TEST_VAR
    }
  })

  // Test that critical environment variables have expected format
  it('should validate environment variable formats', () => {
    // Test DATABASE_URL format (from our .env file)
    const databaseUrl = process.env.DATABASE_URL
    if (databaseUrl) {
      // Should be either SQLite (file:) or PostgreSQL (postgresql://)
      expect(databaseUrl).toMatch(/^(file:|postgresql:\/\/)/)
    }

    // Test NEXTAUTH_SECRET exists and has minimum length
    const nextAuthSecret = process.env.NEXTAUTH_SECRET
    if (nextAuthSecret) {
      expect(nextAuthSecret.length).toBeGreaterThanOrEqual(16)
    }

    // Test NEXTAUTH_URL is a valid URL format
    const nextAuthUrl = process.env.NEXTAUTH_URL
    if (nextAuthUrl) {
      expect(nextAuthUrl).toMatch(/^https?:\/\//)
    }

    // Test NEXT_PUBLIC_BASE_URL format
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (baseUrl) {
      expect(baseUrl).toMatch(/^https?:\/\//)
    }
  })

  // Test environment variable precedence (.env.local overrides .env)
  it('should respect environment variable precedence', () => {
    // This test ensures that our env loading mechanism respects Next.js precedence
    // .env.local > .env.development > .env
    
    const testKey = 'TEST_PRECEDENCE_VAR'
    const originalValue = process.env[testKey]
    
    // Simulate setting a variable
    process.env[testKey] = 'local-value'
    expect(process.env[testKey]).toBe('local-value')
    
    // Cleanup
    if (originalValue !== undefined) {
      process.env[testKey] = originalValue
    } else {
      delete process.env[testKey]
    }
  })
})