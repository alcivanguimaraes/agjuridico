import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Scheduling from "./pages/Scheduling";
import CaseStudies from "./pages/CaseStudies";


function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/contato"} component={Contact} />
        <Route path={"/agendamento"} component={Scheduling} />
        <Route path={"/estudos-de-caso"} component={CaseStudies} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
