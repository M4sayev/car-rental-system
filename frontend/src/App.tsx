import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Clients from "./pages/Clients";
import Rentals from "./pages/Rentals";
import Footer from "./components/layout/Footer/Footer";
import NavbarMobile from "./components/layout/Navbar/NavbarMobile";
import NavbarDesktop from "./components/layout/Navbar/NavbarDesktop";
import TopBanner from "./components/ui/custom/TopBanner";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import CreateRental from "./pages/CreateRental";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import axios from "axios";
import { handleSessionExpired } from "./utils/utils";
import { useAuth } from "./context/AuthContext/useAuth";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401)
        handleSessionExpired();
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401)
        handleSessionExpired();
    },
  }),
});

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showAdminUI = isAuthenticated && location.pathname !== "/auth/login";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen">
        {showAdminUI && (
          <div className="hidden md:block">
            <NavbarDesktop />
          </div>
        )}

        <main className="font-sans w-full bg-sidebar-accent">
          {showAdminUI && <TopBanner />}
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/auth/login" element={<Auth />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/rentals/create-rental" element={<CreateRental />} />
          </Routes>
        </main>
      </div>
      {showAdminUI && (
        <>
          <Footer />
          <div className="md:hidden">
            <NavbarMobile />
          </div>
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
