import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Providers from '@/app/providers'
import AzimuthPage from '@/app/azimuth/page';

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
 
describe('Azimuth Page', () => {
  it('renders without crashing', async () => {
    render(<Providers><AzimuthPage /></Providers>)
    
    const pageElement = await waitFor(() => screen.getByTestId('azimuth-page'));
    
    expect(pageElement).toBeInTheDocument()
  })
})
