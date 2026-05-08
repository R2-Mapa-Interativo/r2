import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Cardapio from "./pages/Cardapio.tsx";
import Lanchonete from "./pages/Lanchonete.tsx";
import MapaInterativo from "./pages/MapaInterativo.tsx";
import NaPraia from "./pages/NaPraia.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/na-praia" element={<NaPraia />} />
          <Route path="/na-praia/lanchonete" element={<Lanchonete />} />
          <Route path="/na-praia/lanchonete/:restaurantId" element={<Cardapio />} />
          <Route path="/na-praia/mapa" element={<MapaInterativo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
