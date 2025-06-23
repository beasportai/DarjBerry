/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Test 1: Verify Next.js app boots successfully
describe('Next.js Application Boot', () => {
  it('should render the homepage without crashing', () => {
    // This test verifies that the Next.js app can boot and render
    expect(() => {
      render(<Home />)
    }).not.toThrow()
  })

  it('should render the homepage with expected content', () => {
    render(<Home />)
    
    // Check that the page renders with some content
    // This will help us verify the app actually boots
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('should have a valid document structure', () => {
    render(<Home />)
    
    // Verify basic HTML structure exists
    const body = document.body
    expect(body).toBeInTheDocument()
    expect(body.firstChild).not.toBeNull()
  })
})