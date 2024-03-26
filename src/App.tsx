import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import SidesPage from "./pages/SidesPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} /> 
        <Route path="/sides" element={<SidesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
