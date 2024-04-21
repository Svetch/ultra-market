import Navbar from "../../components/layout/navbar";
import Logo from "../../public/logo.png";
import Footer from "../../components/layout/footer";

export const runtime = "edge";

export default function Layout({children}: { children: React.ReactNode }) {
  const navItems = [
    {children: 'Áttekintés', href: '/business'},
    {children: 'Árucikkeim', href: '/business/all-items'},
    {children: 'Új árucikk hozzáadása', href: '/business/add-item'},
  ];
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen w-full">
      <Navbar items={navItems} logo={Logo}/>
      <main className="grid">{children}</main>
      <Footer companyName={'Ultra-Market'}/>
    </div>
  );
}
