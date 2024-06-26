import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChessBoard from "./components/ChessBoard";
import Home from "./components/Home";
import WebSocketConnect from "./components/WebSocketConnect";
function App() {
  return (
    <>
      <h1 className="absolute top-4 left-4 text-white text-4xl font-extrabold  max-md:text-xl">
        Hamro-Chess
      </h1>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<ChessBoard />} />
          <Route path="/ws" element={<WebSocketConnect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
