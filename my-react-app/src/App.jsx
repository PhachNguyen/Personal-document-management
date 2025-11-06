
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Upload from "./pages/Upload";
import Features from "./pages/Features";
import Notifications from "./pages/Notifications";
import Guide from "./pages/Guide";
import Folders from "./pages/Folders";
import Contact from "./components/contact";
// import Login from "./pages/Login"; // nếu có trang đăng nhập thì bật lại

export default function App() {
  return (
    <Router>
      <Routes>
        {/* === Trang Public === */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/guide" element={<Guide />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        {/* === Trang Dashboard (nội bộ) === */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/documents" element={<Documents />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/folders" element={<Folders />} />
      </Routes>
    </Router>
  );
}
