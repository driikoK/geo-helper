import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Providers from '@/app/providers'
import MidpointPage from '@/app/midpoint/page';

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
    render(<Providers><MidpointPage /></Providers>)
    
    const pageElement = await waitFor(() => screen.getByTestId('midpoint-page'))
    
    expect(pageElement).toBeInTheDocument()
  })
})
