import Footer from "../../components/layout/footer";

export const runtime = "edge";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[1fr,auto] min-h-screen w-full">
      {children}
      <Footer companyName={'Ultra-Market'}/>
    </div>
  );
}
