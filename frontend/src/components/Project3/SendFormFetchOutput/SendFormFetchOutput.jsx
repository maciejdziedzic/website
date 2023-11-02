import { useState, useContext } from "react";
import axios from "axios";
import SharedButton from "../../Shared/Button/SharedButton";
import { DarkModeContext } from "../../../contexts/DarkMode/DarkModeContext";

export default function GetEconomicData() {
  const { darkMode } = useContext(DarkModeContext);
  const [logisticData, setLogisticData] = useState(null);
  const [logisticModelResult, setLogisticModelResult] = useState(null);
  const [fedData, setFedData] = useState(null);
  const [interpretation, setInterpretation] = useState(null);
  const [finalResult, setFinalResult] = useState(null);

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
      console.log("Logistic model result: ", response.data);
      setLogisticModelResult({
        lower_or_maintain: (response.data.lower_or_maintain * 100).toFixed(2),
        raise: (response.data.raise * 100).toFixed(2),
      });
    } catch (error) {
      console.error("Error running logistic model: ", error);
    }
  };

  const fetchFedArticle = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fetch-fed-text"
      );
      setFedData(response.data);
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
      console.error("Error fetching fed interpretation: ", error);
    }
  };

  const calculateFinalResult = () => {
    if (logisticModelResult && interpretation) {
      const logisticLowerOrMaintain =
        parseFloat(logisticModelResult.lower_or_maintain) / 100;
      const logisticRaise = parseFloat(logisticModelResult.raise) / 100;
      const gptInterpretation = parseFloat(interpretation.interpretation);

      const transformedGptInterpretation = 2 * (gptInterpretation - 0.5);
      const adjustment = 0.1 * transformedGptInterpretation;
      let adjustedProbLower = logisticLowerOrMaintain - adjustment;
      let adjustedProbRaise = logisticRaise + adjustment;

      // Normalizing to ensure the probabilities sum to 1
      const probSum = adjustedProbLower + adjustedProbRaise;
      adjustedProbLower /= probSum;
      adjustedProbRaise /= probSum;

      // Rounding to two decimal places
      adjustedProbLower = (adjustedProbLower * 100).toFixed(2);
      adjustedProbRaise = (adjustedProbRaise * 100).toFixed(2);

      // Ensuring that rounded probabilities sum to 100%
      if (
        parseFloat(adjustedProbLower) + parseFloat(adjustedProbRaise) !==
        100.0
      ) {
        // Adjusting the probabilities by the smallest possible value (0.01%)
        if (parseFloat(adjustedProbLower) > parseFloat(adjustedProbRaise)) {
          adjustedProbLower = (parseFloat(adjustedProbLower) - 0.01).toFixed(2);
        } else {
          adjustedProbRaise = (parseFloat(adjustedProbRaise) - 0.01).toFixed(2);
        }
      }

      setFinalResult({
        lower_or_maintain: adjustedProbLower,
        raise: adjustedProbRaise,
      });
    } else {
      console.error("Logistic model result or interpretation is not available");
    }
  };

  return (
    <div
      className={`flex flex-col space-y-4 ml-5 p-4 ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white"
      }`}
    >
      <div className="flex space-x-4">
        <SharedButton
          variant="button1"
          label="Fetch Logistic"
          onClick={fetchLogisticData}
        />
        {logisticData && (
          <div>
            <p>
              <strong>Unemployment Rate:</strong> {logisticData.unemp}%
            </p>
            <p>
              <strong>CPI:</strong>{" "}
              {parseFloat(logisticData.cpi).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <SharedButton
          variant="button1"
          label="Run Model"
          onClick={runLogisticModel}
        />
        {logisticModelResult && (
          <div>
            <p>
              <strong>Model Output:</strong>
            </p>
            <p>Lower/Maintain: {logisticModelResult.lower_or_maintain}%</p>
            <p>Raise: {logisticModelResult.raise}%</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <SharedButton
          variant="button1"
          label="Fetch FED"
          onClick={fetchFedArticle}
        />
        {fedData && (
          <div>
            <p>
              <strong>Press Release:</strong>
            </p>
            <p>{fedData.press_release_content}</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <SharedButton
          variant="button1"
          label="Fetch GPT"
          onClick={fetchInterpretation}
        />
        {interpretation && (
          <div>
            <p>
              <strong>Interpretation:</strong> Based on the text analysis, there
              is {((1 - interpretation.interpretation) * 100).toFixed(0)}%
              chance that it will lower or maintain interest rates, and{" "}
              {(interpretation.interpretation * 100).toFixed(0)}% chance that
              the Federal Reserve will raise interest rates,
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <SharedButton
          variant="button1"
          label="Calculate"
          onClick={calculateFinalResult}
        />
        {finalResult && (
          <div>
            <p>
              <strong>Final Result:</strong>
            </p>
            <p>Lower/Maintain: {finalResult.lower_or_maintain}%</p>
            <p>Raise: {finalResult.raise}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
