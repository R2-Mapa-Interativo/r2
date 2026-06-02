import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./presentation/components/pages/Index.tsx";
import Cardapio from "./presentation/components/pages/Cardapio.tsx";
import Lanchonete from "./presentation/components/pages/Lanchonete.tsx";
import MapaInterativo from "./presentation/components/pages/MapaInterativo.tsx";
import NaPraia from "./presentation/components/pages/NaPraia.tsx";
import NotFound from "./presentation/components/pages/NotFound.tsx";
import Checkout from "./presentation/components/pages/Checkout.tsx";
import HistoricoPedidos from "./presentation/components/pages/HistoricoPedidos.tsx";

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
          <Route path="/na-praia/checkout" element={<Checkout />} />
          <Route path="/na-praia/historico" element={<HistoricoPedidos />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;