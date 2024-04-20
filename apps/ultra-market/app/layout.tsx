//import '@ultra-market/ui-utils/global.scss';
import './global.scss';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';
import {ClerkProvider} from '@clerk/nextjs';
import Logo from '../public/logo.png';
import {dark} from "@clerk/themes";
import {huHU} from "@clerk/localizations";

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const navItems = [
    {children: 'About', href: '/about'},
    {children: 'Contact', href: '/contact'},
  ];

  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}
                   localization={huHU}>
      <html lang="hu">
      <body className='dark'>
      <div className="grid grid-rows-[auto,1fr,auto] min-h-screen w-full">
        <Navbar items={navItems} logo={Logo}/>
        <main className="grid">{children}</main>
        <Footer companyName={'Ultra-Market'}/>
      </div>
      </body>
      </html>
    </ClerkProvider>
  );
}
