import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartupHub from "./pages/StartupHub";
import GMLogin from "./pages/GMLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartupHub />} />
        <Route path="/gm/login" element={<GMLogin />} />
        {/* Add more routes later */}
      </Routes>
    </Router>
  );
}

export default App;

