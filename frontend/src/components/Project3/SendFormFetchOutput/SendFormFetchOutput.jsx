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
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const runModel = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/run-model",
        data
      );
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
              <strong>Quarterly CPI Projected Change:</strong>{" "}
              {data.cpi_data.cpi.toFixed(2)}{" "}
            </div>
            <div>
              <strong>Last Monthly Unemployment Rate:</strong> {data.last_unemp}{" "}
            </div>

            <div>
              <strong>Press Release Content:</strong>{" "}
              {data.press_release_content && data.press_release_content}
            </div>
            <div>
              <strong>Text model interpretation:</strong> {data.interpretation}
            </div>
            {/* <div>
              <strong>Fed expected policy:</strong>{" "}
              {data.interpretation === -1
                ? "Based on the press release, Fed is expected to decrease its rates."
                : data.interpretation === 0
                ? "Based on the press release, Fed is expected to maintain its rates."
                : data.interpretation === 1
                ? "Based on the press release, Fed is expected to increase its rates."
                : "Unknown"}
            </div> */}
          </div>
        )}
      </div>
      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          onClick={runModel}
          label="Run Model"
        ></SharedButton>
        {modelResult && (
          <div>
            <div>
              Output from the model: {""}
              <strong>
                Probability that the FED will lower or maintain the rates:
              </strong>
              {modelResult.maintain_or_lower}%
            </div>
            <div>
              <strong>Probability that the FED will raise the rates: </strong>
              {modelResult.raise}
            </div>
            <div>Model Output plus GPT interpretation:</div>
          </div>
        )}
      </div>
    </div>
  );
}
