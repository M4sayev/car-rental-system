import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Clients from "./pages/Clients";
import Rentals from "./pages/Rentals";
import Footer from "./components/layout/Footer/Footer";
import NavbarMobile from "./components/layout/Navbar/NavbarMobile";
import NavbarDesktop from "./components/layout/Navbar/NavbarDesktop";
import TopBanner from "./components/ui/custom/TopBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateRental from "./pages/CreateRental";

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
            <Route path="/rentals/create-rental" element={<CreateRental />} />
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
