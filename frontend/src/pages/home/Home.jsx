import { useState, useEffect, useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../contexts/DarkMode/DarkModeContext";

function Home() {
  const { darkMode } = useContext(DarkModeContext);
  const [part1, setPart1] = useState("");
  const [assetsReturns, setAssetsReturns] = useState("");
  const [part2, setPart2] = useState("");
  const [macroCharts, setMacroCharts] = useState("");
  const [part3, setPart3] = useState("");
  const [recessionModel, setRecessionModel] = useState("");
  const [part4, setPart4] = useState("");
  const [data, setData] = useState("");
  const [part5, setPart5] = useState("");
  const [model, setModel] = useState("");
  const [part6, setPart6] = useState("");

  const [allTextPrinted, setAllTextPrinted] = useState(false);

  const [maxTextLength, setMaxTextLength] = useState(0);

  const text1 =
    "Hello, welcome to my website. You can find here projects built on real data:";
  const textAssetsReturns = "Asset Returns";
  const text2 = " Annual returns over five decades";
  const textMacroCharts = "Macro Chart";
  const text3 = " Macroeconomic indicators for the U.S.";
  const textRecessionModel = "Model";
  const text4 = " Forecasts of the Federal Reserve's future policy";
  const textData = "Data";
  const text5 = " Sources used in all projects";
  const textModel = "Model Info";
  const text6 = " Methodology";

  useEffect(() => {
    let timer;
    if (part1.length < text1.length) {
      timer = setTimeout(
        () => setPart1((prev) => prev + text1[part1.length]),
        6
      );
    } else if (assetsReturns.length < textAssetsReturns.length) {
      timer = setTimeout(
        () =>
          setAssetsReturns(
            (prev) => prev + textAssetsReturns[assetsReturns.length]
          ),
        4
      );
    } else if (part2.length < text2.length) {
      timer = setTimeout(
        () => setPart2((prev) => prev + text2[part2.length]),
        4
      );
    } else if (macroCharts.length < textMacroCharts.length) {
      timer = setTimeout(
        () =>
          setMacroCharts((prev) => prev + textMacroCharts[macroCharts.length]),
        4
      );
    } else if (part3.length < text3.length) {
      timer = setTimeout(
        () => setPart3((prev) => prev + text3[part3.length]),
        4
      );
    } else if (recessionModel.length < textRecessionModel.length) {
      timer = setTimeout(
        () =>
          setRecessionModel(
            (prev) => prev + textRecessionModel[recessionModel.length]
          ),
        4
      );
    } else if (part4.length < text4.length) {
      timer = setTimeout(
        () => setPart4((prev) => prev + text4[part4.length]),
        4
      );
    } else if (data.length < textData.length) {
      timer = setTimeout(
        () => setData((prev) => prev + textData[data.length]),
        4
      );
    } else if (part5.length < text5.length) {
      timer = setTimeout(
        () => setPart5((prev) => prev + text5[part5.length]),
        4
      );
    } else if (model.length < textModel.length) {
      timer = setTimeout(
        () => setModel((prev) => prev + textModel[model.length]),
        4
      );
    } else if (part6.length < text6.length) {
      timer = setTimeout(
        () => setPart6((prev) => prev + text6[part6.length]),
        4
      );
    } else {
      setAllTextPrinted(true);
    }
    return () => clearTimeout(timer);
  }, [
    part1,
    assetsReturns,
    part2,
    macroCharts,
    part3,
    recessionModel,
    part4,
    data,
    part5,
    model,
    part6,
  ]);

  useEffect(() => {
    const texts = [
      textAssetsReturns,
      text2,
      textMacroCharts,
      text3,
      textRecessionModel,
      text4,
      textData,
      text5,
      textModel,
      text6,
    ];
    const maxLength = Math.max(...texts.map((t) => t.length));
    setMaxTextLength(maxLength);
  }, []);

  return (
    <div
      className={`main-container mt-12 md:flex md:items-center md:justify-center text-lg md:ml-28 md:flex-col md:mr-0 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="typing-effect-container">
        <p className="mr-8 ml-8 md:mr-0 md:ml-0 text-center md:flex hidden ">
          {part1}
        </p>
        <p className="mr-8 ml-8 md:hidden text-center">{text1}</p>

        <br />
        <div className="flex flex-col">
          <div className="md:flex md:items-center md:my-2">
            <Link
              to="/project1"
              className={`project-button hidden md:block  ${
                darkMode ? "project-button-dark" : ""
              }`}
            >
              {assetsReturns}
            </Link>
            <div className="flex justify-center items-center">
              <Link
                to="project1"
                className={`home-button-mobile flex justify-center items-center md:hidden ${
                  darkMode ? "dark" : ""
                }`}
              >
                Asset Returns
              </Link>
            </div>
            <span
              className="md:ml-7 description"
              style={{ minWidth: `${maxTextLength}ch` }}
            >
              <p className="hidden md:block">{part2}</p>
            </span>
          </div>
          <div className="flex items-center my-2 ">
            <Link
              to="/project2"
              className={`project-button hidden md:block  ${
                darkMode ? "project-button-dark" : ""
              }`}
            >
              {macroCharts}
            </Link>

            <span
              className="ml-7 description"
              style={{ minWidth: `${maxTextLength}ch` }}
            >
              <p className="hidden md:block">{part3}</p>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Link
              to="project2"
              className={`home-button-mobile flex justify-center items-center md:hidden ${
                darkMode ? "dark" : ""
              }`}
            >
              Macro Chart
            </Link>
          </div>
          <div className="flex items-center my-2">
            <Link
              to="/project3"
              className={`project-button md:block hidden ${
                darkMode ? "project-button-dark" : ""
              }`}
            >
              {recessionModel}
            </Link>
            <span
              className="ml-7 description"
              style={{ minWidth: `${maxTextLength}ch` }}
            >
              <p className="hidden md:block">{part4}</p>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Link
              to="project3"
              className={`home-button-mobile flex justify-center items-center md:hidden ${
                darkMode ? "dark" : ""
              }`}
            >
              Model
            </Link>
          </div>
          <br />
          <div className="flex items-center my-2">
            <Link
              to="/data"
              className={`project-button md:block hidden ${
                darkMode ? "project-button-dark" : ""
              }`}
            >
              {data}
            </Link>
            <span className="ml-7 description">
              <p className="hidden md:block">{part5}</p>
            </span>
          </div>
          <div className="flex justify-center items-center">
            <Link
              to="data"
              className={`home-button-mobile flex justify-center items-center md:hidden ${
                darkMode ? "dark" : ""
              }`}
            >
              Data
            </Link>
          </div>
          <div className="flex items-center my-2">
            <Link
              to="/model"
              className={`project-button md:block hidden ${
                darkMode ? "project-button-dark" : ""
              }`}
            >
              {model}
            </Link>
            <span className="ml-7 description">
              <p className="hidden md:block">{part6}</p>
            </span>
            {allTextPrinted && (
              <span className="cursor hidden md:block">_</span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Link
              to="/model"
              className={`home-button-mobile flex justify-center items-center md:hidden ${
                darkMode ? "dark" : ""
              }`}
            >
              Model Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
