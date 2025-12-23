import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResultPage from "./pages/ResultPage";
import RiskAssessment from "./pages/RiskAssessment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RiskAssessment />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
