import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Clients from "./pages/Clients";
import Rentals from "./pages/Rentals";
import Footer from "./components/Footer/Footer";
import NavbarMobile from "./components/Navbar/NavbarMobile";
import NavbarDesktop from "./components/Navbar/NavbarDesktop";
import TopBanner from "./components/ui/TopBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <NavbarDesktop />
        </div>

        <main className="font-sans w-full bg-sidebar-accent">
          <TopBanner />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/rentals" element={<Rentals />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <div className="md:hidden">
        <NavbarMobile />
      </div>
    </QueryClientProvider>
  );
}

export default App;
