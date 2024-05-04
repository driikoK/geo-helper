import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Providers from '@/app/providers'
import ConvertPage from '@/app/convert/page';

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
 
describe('Convert Page', () => {
  it('renders without crashing', async () => {
    render(<Providers><ConvertPage /></Providers>)
    
    const pageElement = await waitFor(() => screen.getByTestId('convert-page'))
    
    expect(pageElement).toBeInTheDocument()
  })
})
