import { HashRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Success from "./pages/Success";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
