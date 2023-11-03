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
  const textAssetsReturns = "Assets Returns";
  const text2 = " Yearly Returns Across 1970-2022";
  const textMacroCharts = "Macro Chart";
  const text3 = " U.S. Economic Indicators ";
  const textRecessionModel = "Model";
  const text4 = " Predicts future FED's Policy";
  const textData = "Data";
  const textPart5 = " Sources and transformations used in all projects";
  const textModel = "Model";
  const textPart6 = " Additional information";

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
        5
      );
    } else if (part2.length < text2.length) {
      timer = setTimeout(
        () => setPart2((prev) => prev + text2[part2.length]),
        5
      );
    } else if (macroCharts.length < textMacroCharts.length) {
      timer = setTimeout(
        () =>
          setMacroCharts((prev) => prev + textMacroCharts[macroCharts.length]),
        5
      );
    } else if (part3.length < text3.length) {
      timer = setTimeout(
        () => setPart3((prev) => prev + text3[part3.length]),
        5
      );
    } else if (recessionModel.length < textRecessionModel.length) {
      timer = setTimeout(
        () =>
          setRecessionModel(
            (prev) => prev + textRecessionModel[recessionModel.length]
          ),
        5
      );
    } else if (part4.length < text4.length) {
      timer = setTimeout(
        () => setPart4((prev) => prev + text4[part4.length]),
        5
      );
    } else if (data.length < textData.length) {
      timer = setTimeout(
        () => setData((prev) => prev + textData[data.length]),
        5
      );
    } else if (part5.length < textPart5.length) {
      timer = setTimeout(
        () => setPart5((prev) => prev + textPart5[part5.length]),
        5
      );
    } else if (model.length < textModel.length) {
      timer = setTimeout(
        () => setModel((prev) => prev + textModel[model.length]),
        5
      );
    } else if (part6.length < textPart6.length) {
      timer = setTimeout(
        () => setPart6((prev) => prev + textPart6[part6.length]),
        5
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
    // Calculate the max length of text content
    const texts = [
      textAssetsReturns,
      text2,
      textMacroCharts,
      text3,
      textRecessionModel,
      text4,
      textData,
      textPart5,
      textModel,
      textPart6,
    ];
    const maxLength = Math.max(...texts.map((t) => t.length));
    setMaxTextLength(maxLength);
  }, []);

  return (
    <div className="flex items-center justify-center my-24 mx-auto text-lg">
      <div className={`items-center ${darkMode ? "" : ""}`}>
        <div className="w-full max-w-2xl mx-4">
          <div className="text-left">
            <p>{part1}</p> <br />
            <div className="flex flex-col">
              <div className="flex items-center my-2">
                <Link to="/project1" className="project-button">
                  {assetsReturns}
                </Link>
                <span
                  className="ml-7 description"
                  style={{ minWidth: `${maxTextLength}ch` }}
                >
                  {part2}
                </span>
              </div>
              <div className="flex items-center my-2">
                <Link to="/project2" className="project-button">
                  {macroCharts}
                </Link>
                <span
                  className="ml-7 description"
                  style={{ minWidth: `${maxTextLength}ch` }}
                >
                  {part3}
                </span>
              </div>
              <div className="flex items-center my-2">
                <Link to="/project3" className="project-button">
                  {recessionModel}
                </Link>
                <span
                  className="ml-7 description"
                  style={{ minWidth: `${maxTextLength}ch` }}
                >
                  {part4}
                </span>
              </div>{" "}
              <br />
              <div className="flex items-center my-2">
                <Link to="/data" className="project-button">
                  {data}
                </Link>
                <span className="ml-7 description">{part5}</span>
              </div>
              <div className="flex items-center my-2">
                <Link to="/model" className="project-button">
                  {model}
                </Link>
                <span className="ml-7 description">{part6}</span>
                {allTextPrinted && <span className="cursor">_</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
