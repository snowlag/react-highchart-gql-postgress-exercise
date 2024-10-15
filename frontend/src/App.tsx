import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecurityDetail from "./components/SecurityDetail/SecurityDetail";
import NoPageFound from "./components/NoPageFound/NoPageFound";
import SecurityList from "./components/SecurityList/SecurityList";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Route for both "/" and "/securities" paths to show the security list */}
        <Route path="/" element={<SecurityList />} />
        <Route path="/securities" element={<SecurityList />} />

        {/* Route for security details */}
        <Route path="/securities/:ticker" element={<SecurityDetail />} />

        {/* Fallback route for undefined URLs */}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
};

export default App;
