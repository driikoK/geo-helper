import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Providers from '@/app/providers'
import DistancePage from '@/app/distance/page';

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
 
describe('Distance Page', () => {
  it('renders without crashing', async () => {
    render(<Providers><DistancePage /></Providers>)
    
    const pageElement = await waitFor(() => screen.getByTestId('distance-page'));
    
    expect(pageElement).toBeInTheDocument()
  })
})
