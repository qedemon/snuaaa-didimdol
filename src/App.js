import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";

import DashboardPage from "@pages/3_MainPages/DashboardPage";
import EnrollPage from "@pages/2_EnrollPages";
import LoginPage from "@pages/1_LoginPage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="enroll" element={<EnrollPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
