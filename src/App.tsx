import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import Dashboard from "@/pages/Dashboard";
import DeckDetails from "@/pages/DeckDetails";
import Review from "@/pages/Review";
import ProgressPage from "@/pages/Progress";
import NotFound from "@/pages/NotFound";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { getToken } from "@/lib/token";

const queryClient = new QueryClient();

// const ProtectedRoute = ({ children }: any) => {
//   const token = localStorage.getItem("token");
//
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//
//   return children;
// };
//
// const PublicRoute = ({ children }: any) => {
//   const token = localStorage.getItem("token");
//
//   if (token) {
//     return <Navigate to="/" replace />;
//   }
//
//   return children;
// };

//OPTIONAL: HIDE NAVBAR ON LOGIN/SIGNUP
const Layout = ({ children }: any) => {
  const token = getToken();
  return (
    <div className="min-h-screen bg-background">
      {token && <Navbar />}
      {children}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/deck/:id"
              element={
                <ProtectedRoute>
                  <DeckDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/review"
              element={
                <ProtectedRoute>
                  <Review />
                </ProtectedRoute>
              }
            />

            <Route
              path="/review/:deckId"
              element={
                <ProtectedRoute>
                  <Review />
                </ProtectedRoute>
              }
            />

            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/progress/:deckId"
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              }
            />

            <Routes>

              {/* PUBLIC */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />

              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />

              {/* PROTECTED */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

            </Routes>

            <Route path="*" element={<NotFound />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;