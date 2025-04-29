import AllSchemesPage from "./components/AllSchemesPage";
import HomePage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import FinancialAdivce from "./FinancialAdvicePage/FinancialAdvice";
import SchemesPage from "./SchemesPage/SchemePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-schemes" element={<AllSchemesPage />} />
        <Route path="/financial-advice" element={<FinancialAdivce />} />
        <Route path="/schemes" element={<SchemesPage />} />
      </Routes>
    </>
  );
}

export default App;
