import { HashRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./Pages/3_MainPages/DashboardPage";
import EnrollPage from "./Pages/2_EnrollPages";
import LoginPage from "./Pages/1_LoginPage";

import "./App.css";
import { AuthProvider } from "./Contexts/AuthContext";

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
