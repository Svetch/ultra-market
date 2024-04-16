import './global.css';
import Navbar from './../components/layout/navbar';
import Footer from './../components/layout/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const navItems = [
    { logo: '/../public/logo.png', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
    { title: 'Login', link: '/user/login', alignRight: true },
  ];

  return (
    <>
    <html lang="hu">
    <body>
      <Navbar items={navItems} />
        <main>{children}</main>
      <Footer companyName={"Ultra-Market"} />
    </body>
    </html>
      
    </>
  )
}
