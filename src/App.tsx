import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "./redux/store.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { TodoProvider } from "./context/TodoContext.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddMeal from "./pages/AddMeal.jsx";
import TodoApp from "./pages/TodoApp.jsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TodoProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddMeal />} />
            <Route path="/todos" element={<TodoApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </TodoProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
