//import '@ultra-market/ui-utils/global.scss';
import './global.scss';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { huHU } from '@clerk/localizations';
import { Toaster } from '@ultra-market/ui/sonner';
export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      localization={huHU}
    >
      <html lang="hu">
        <body className="dark">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
