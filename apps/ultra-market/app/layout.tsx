//import '@ultra-market/ui-utils/global.scss';
import './global.scss';
import {ClerkProvider} from '@clerk/nextjs';
import {dark} from "@clerk/themes";
import {huHU} from "@clerk/localizations";

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }} localization={huHU}>
      <html lang="hu">
        <body className='dark'>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
