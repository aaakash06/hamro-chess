import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChessBoard from "./components/ChessBoard";
import Home from "./components/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<ChessBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
