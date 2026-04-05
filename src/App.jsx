import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/animations.css";

import { ThemeProvider } from "./context/ThemeContext";
import { RoleProvider } from "./context/RoleContext";
import { TransactionProvider } from "./context/TransactionContext";

import Sidebar from "./components/common/Sidebar";
import Topbar from "./components/common/Topbar";
import LoadingSpinner from "./components/common/LoadingSpinner";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Insights = lazy(() => import("./pages/Insights"));

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-layout">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuClick={() => setSidebarOpen(true)} />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <RoleProvider>
          <TransactionProvider>
            <AppLayout />
          </TransactionProvider>
        </RoleProvider>
      </ThemeProvider>
    </Router>
  );
}
