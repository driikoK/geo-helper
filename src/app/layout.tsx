import type { Metadata } from 'next';
import Providers from './providers';
import './global.css';
import 'normalize.css';

export const metadata: Metadata = {
  title: 'Geo-Helper',
  description: 'Помічник з геодезії',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
