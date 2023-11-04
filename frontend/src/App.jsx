import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import AssetDashboard from "./components/Project1/AssetDashboard/AssetDashboard";
import EconomicDashboard from "./components/Project2/EconomicDashboard/EconomicDashboard";
import GetEconomicData from "./components/Project3/SendFormFetchOutput/SendFormFetchOutput";
import DataContainer from "./pages/dataContainer/DataContainer";
import Model from "./pages/model/Model";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/project1" element={<AssetDashboard />}></Route>
        <Route path="/project2" element={<EconomicDashboard />}></Route>
        <Route path="/project3" element={<GetEconomicData />}></Route>
        <Route path="/data" element={<DataContainer />}></Route>
        <Route path="/model" element={<Model />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
