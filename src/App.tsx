import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./presentation/pages/Index.tsx";
import Cardapio from "./presentation/pages/Menu.tsx";
import Lanchonete from "./presentation/pages/FoodCourt.tsx";
import MapaInterativo from "./presentation/pages/InteractiveMap.tsx";
import NaPraia from "./presentation/pages/NaPraia.tsx";
import NotFound from "./presentation/pages/NotFound.tsx";
import Checkout from "./presentation/pages/Checkout.tsx";
import HistoricoPedidos from "./presentation/pages/OrderHistory.tsx";

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
          {/* Rota corrigida para alinhar com os Links e o useParams do Menu.tsx */}
          <Route path="/na-praia/menu/:establishmentId" element={<Cardapio />} />
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