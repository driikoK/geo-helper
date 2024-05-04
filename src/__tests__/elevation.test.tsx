import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import ElevationPage from '@/app/elevation/page'
import Providers from '@/app/providers'

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

describe('Elevation Page', () => {
  it('renders without crashing', async () => {
    window.fetch = mockFetch({results:[{latitude:1.0,longitude:1.0,elevation:0.0}]});
    render(<Providers><ElevationPage /></Providers>)

    const pageElement = await waitFor(() => screen.getByTestId('elevation-page'));
    
    expect(pageElement).toBeInTheDocument()
  })
})
