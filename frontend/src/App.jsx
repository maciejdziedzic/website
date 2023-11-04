import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import AssetDashboard from "./components/Project1/AssetDashboard/AssetDashboard";
import EconomicDashboard from "./components/Project2/EconomicDashboard/EconomicDashboard";
import EconomicModel from "./components/Project3/EconomicModel/EconomicModel";
import Data from "./pages/data/Data";
import Model from "./pages/model/Model";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/project1" element={<AssetDashboard />}></Route>
            <Route path="/project2" element={<EconomicDashboard />}></Route>
            <Route path="/project3" element={<EconomicModel />}></Route>
            <Route path="/data" element={<Data />}></Route>
            <Route path="/model" element={<Model />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
