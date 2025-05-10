
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Layouts
import MainLayout from "./components/MainLayout";

// Public Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// Institution Pages
import InstitutionDashboard from "./pages/institution/InstitutionDashboard";
import IssueCertificate from "./pages/institution/IssueCertificate";
import VerifyCertificate from "./pages/institution/VerifyCertificate";
import IssuedCredentials from "./pages/institution/IssuedCredentials";
import StudentRequests from "./pages/institution/StudentRequests";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import RequestCertificate from "./pages/student/RequestCertificate";
import MyCredentials from "./pages/student/MyCredentials";

// Employer Pages
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerVerify from "./pages/employer/EmployerVerify";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              {/* Institution Routes */}
              <Route path="institution" element={<InstitutionDashboard />} />
              <Route path="institution/issue" element={<IssueCertificate />} />
              <Route path="institution/verify" element={<VerifyCertificate />} />
              <Route path="institution/issued" element={<IssuedCredentials />} />
              <Route path="institution/requests" element={<StudentRequests />} />
              
              {/* Student Routes */}
              <Route path="student" element={<StudentDashboard />} />
              <Route path="student/request" element={<RequestCertificate />} />
              <Route path="student/credentials" element={<MyCredentials />} />
              
              {/* Employer Routes */}
              <Route path="employer" element={<EmployerDashboard />} />
              <Route path="employer/verify" element={<EmployerVerify />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
