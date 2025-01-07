import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import SocialMediaDashboard from "./components/social-media-dashboard";
import Header from "./components/Header";

function App() {
  return (
    <div className="w-screen overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Dashboard" element={<SocialMediaDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
