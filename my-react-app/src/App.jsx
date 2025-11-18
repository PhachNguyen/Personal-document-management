import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Upload from "./pages/Upload";
import Features from "./pages/Features";
import Notifications from "./pages/Notifications";
import Guide from "./pages/Guide";
import Folders from "./pages/Folders";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import DocumentDetail from "./pages/DocumentDetail";
import FolderDetail from "./pages/FolderDetail";

export default function App() {
  return (
    <Router>
      {/*  Toaster để ở đây (ngoài Routes) */}
      <Toaster position="bottom-right" richColors closeButton />

      <Routes>
        {/* === Trang Public === */}
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === Dashboard === */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/folders/:name" element={<FolderDetail />} />
        <Route path="/folders" element={<Folders />} />

        {/* === Admin === */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/documents" element={<AdminDocuments />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}
