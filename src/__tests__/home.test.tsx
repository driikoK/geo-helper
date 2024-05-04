import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Providers from '@/app/providers'
import Home from '@/app/page';

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
 
describe('Midpoint Page', () => {
  it('renders without crashing', async () => {
    render(<Providers><Home /></Providers>)
    
    const pageElement = await waitFor(() => screen.getByTestId('home-page'))
    
    expect(pageElement).toBeInTheDocument()
  })
})
