import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Project1 from "./pages/projects/project1/Project1";
import Project2 from "./pages/projects/project2/Project2";
import Project3 from "./pages/projects/project3/Project3";
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
        <Route path="/project1" element={<Project1 />}></Route>
        <Route path="/project2" element={<Project2 />}></Route>
        <Route path="/project3" element={<Project3 />}></Route>
        <Route path="/data" element={<DataContainer />}></Route>
        <Route path="/model" element={<Model />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
