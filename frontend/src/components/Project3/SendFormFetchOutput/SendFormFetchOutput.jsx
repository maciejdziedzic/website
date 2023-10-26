import { useState } from "react";
import axios from "axios";
import SharedButton from "../../Shared/Button/SharedButton";
import { DarkModeContext } from "../../../contexts/DarkMode/DarkModeContext";
import { useContext } from "react";

export default function GetEconomicData() {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState(null);
  const [modelResult, setModelResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/fetch-data");
      setData(response.data);
      console.log("Data from Backend:", response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const runModel = async () => {
    try {
      console.log("sending data: ", data);
      const response = await axios.post(
        "http://127.0.0.1:5000/api/run-model",
        data
      );
      console.log("Model Result from Backend:", response.data);

      setModelResult(response.data);
    } catch (error) {
      console.error("Error running model: ", error);
    }
  };

  return (
    <div
      className={`flex flex-col space-y-2 ml-5 ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={fetchData}
          label="Fetch Data"
        ></SharedButton>
        {data && (
          <div
            className={
              darkMode
                ? "text-dark-text flex flex-col space-y-2 ml-5t"
                : "flex flex-col space-y-2 ml-5"
            }
          >
            <div>
              <strong>Quarterly CPI:</strong> {data.cpi_data.cpi.toFixed(2)}{" "}
              {/* Round to two decimal places */}
            </div>
            <div>
              <strong>Press Release Content:</strong>{" "}
              {data.press_release_content && data.press_release_content}
            </div>
            <div>
              <strong>Fed expected policy:</strong>{" "}
              {data.interpretation === -1
                ? "Based on the press release, Fed is expected to decrease its rates."
                : data.interpretation === 0
                ? "Based on the press release, Fed is expected to maintain its rates."
                : data.interpretation === 1
                ? "Based on the press release, Fed is expected to increase its rates."
                : "Unknown"}
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={runModel}
          label="Run Model"
        ></SharedButton>
        {console.log(typeof modelResult)}
        {console.log("Model Result Value:", modelResult)}
        {modelResult && (
          <div>
            <strong>Model Result: </strong>
            {parseFloat(JSON.parse(modelResult)[0]) > 0
              ? `SP500 will increase by ${parseFloat(
                  JSON.parse(modelResult)[0]
                ).toFixed(2)}%`
              : parseFloat(JSON.parse(modelResult)[0]) < 0
              ? `SP500 will decrease by ${Math.abs(
                  parseFloat(JSON.parse(modelResult)[0])
                ).toFixed(2)}%`
              : `SP500 is expected to maintain the same level`}
          </div>
        )}
      </div>
    </div>
  );
}
