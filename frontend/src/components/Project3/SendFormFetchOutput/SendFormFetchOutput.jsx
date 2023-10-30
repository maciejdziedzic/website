import { useState } from "react";
import axios from "axios";
import SharedButton from "../../Shared/Button/SharedButton";
import { DarkModeContext } from "../../../contexts/DarkMode/DarkModeContext";
import { useContext } from "react";

export default function GetEconomicData() {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [logisticData, setLogisticData] = useState(null);
  const [logisticModelResult, setLogisticModelResult] = useState(null);
  const [fedData, setfedData] = useState(null);
  const [interpretation, setInterpretation] = useState(null);

  const fetchLogisticData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/fetch-logistic-data"
      );
      setLogisticData(response.data);
    } catch (error) {
      console.error("Error fetching logistic data: ", error);
    }
  };

  const runLogisticModel = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/run-logistic-model",
        logisticData
      );
      setLogisticModelResult(response.data);
    } catch (error) {
      "Error running logistic model: ", error;
    }
  };

  const fetchFedArticle = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fetch-fed-text"
      );
      setfedData(response.data);
    } catch (error) {
      console.error("Error fetching fed article: ", error);
    }
  };

  const fetchInterpretation = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fetch-fed-interpretation",
        fedData
      );
      setInterpretation(response.data);
    } catch (error) {
      console.error("Error fetching fed article: ", error);
    }
  };

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
          label="Fetch DataL"
          onClick={fetchLogisticData}
        ></SharedButton>
        <div>
          {logisticData && (
            <div>
              <div>
                <strong>Last Unemployment Rate:</strong> {logisticData.unemp}
              </div>
              <div>
                <strong>CPI:</strong> {logisticData.cpi}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-5">
        <SharedButton
          variant="button1"
          label="Run Log"
          onClick={runLogisticModel}
        ></SharedButton>
        {logisticModelResult && (
          <div>
            <strong>Output from the Logistic Model:</strong>
            <div>
              Probability that the FED will lower or maintain the rates:
              {logisticModelResult.lower_or_maintain}
            </div>
            <div>
              Probability that the FED will raise the rates:
              {logisticModelResult.raise}
            </div>
          </div>
        )}
      </div>

      <div>
        <SharedButton
          variant="button1"
          onClick={fetchFedArticle}
          label="Fetch FED"
        />
        {fedData && (
          <div>
            <div>
              <strong>Press Release Content:</strong>{" "}
              {fedData.press_release_content}
            </div>
          </div>
        )}
      </div>

      <SharedButton
        variant="button1"
        label="Fetch GPT"
        onClick={fetchInterpretation}
      ></SharedButton>
      {interpretation && (
        <div>
          <strong>Model Interpretation:</strong> {interpretation.interpretation}
        </div>
      )}

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
              <strong>GPT-3 Interpretation of Fed&apos;s Press Release:</strong>
              <div>
                Probability that the FED will lower or maintain the rates:
                {data.interpretation * 100}%{" "}
              </div>
              <div></div> Probability that the FED will lower or maintain the
              rates::
              {(1 - data.interpretation) * 100}%
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
        {modelResult && (
          <div>
            <strong>Output from the model: {""}</strong>
            <div>
              Probability that the FED will lower or maintain the rates:
              {modelResult.maintain_or_lower}%
            </div>
            <div>
              Probability that the FED will raise the rates:
              {modelResult.raise}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
