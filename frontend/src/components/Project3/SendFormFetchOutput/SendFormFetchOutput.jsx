import { useState, useContext, Fragment } from "react";
import axios from "axios";
import SharedButton from "../../Shared/Button/SharedButton";
import { DarkModeContext } from "../../../contexts/DarkMode/DarkModeContext";
import PropTypes from "prop-types";

function Section({ children, darkMode }) {
  return (
    <div
      className={`flex space-x-10 items-center p-3 rounded-md ${
        darkMode ? "bg-neutral-700" : "bg-neutral-300"
      }`}
    >
      {children}
    </div>
  );
}

export default function GetEconomicData() {
  const { darkMode } = useContext(DarkModeContext);
  const [logisticData, setLogisticData] = useState(null);
  const [logisticModelResult, setLogisticModelResult] = useState(null);
  const [fedData, setFedData] = useState(null);
  const [interpretation, setInterpretation] = useState(null);
  const [finalResult, setFinalResult] = useState(null);

  const [loadingLogisticData, setLoadingLogisticData] = useState(false);
  const [loadingLogisticModel, setLoadingLogisticModel] = useState(false);
  // const [loadingFedData, setLoadingFedData] = useState(false);
  // const [loadingInterpretation, setLoadingInterpretation] = useState(false);

  const fetchLogisticData = async () => {
    setLoadingLogisticData(true); // Set loading to true
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/fetch-logistic-data"
      );
      setLogisticData(response.data);
    } catch (error) {
      console.error("Error fetching logistic data: ", error);
    }
    setLoadingLogisticData(false); // Set loading to false once the fetch is complete
  };

  const runLogisticModel = async () => {
    setLoadingLogisticModel(true);
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
    setLoadingLogisticModel(false);
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

  const renderContentOrPlaceholder = (data, loading, contentRenderer) => {
    if (loading) return <div>Loading...</div>;
    return <div>{data ? contentRenderer(data) : "-"}</div>;
  };

  return (
    <div className={`flex flex-col space-y-4 ml-5 p-4  ${darkMode ? " " : ""}`}>
      <Section darkMode={darkMode} className="flex">
        <SharedButton
          variant="button1"
          label="Fetch Data"
          onClick={fetchLogisticData}
        />
        {renderContentOrPlaceholder(
          logisticData,
          loadingLogisticData,
          (data) => (
            <Fragment>
              <p>
                <strong>Unemployment Rate:</strong> {data.unemp}%
              </p>
              <p>
                <strong>CPI:</strong>{" "}
                {parseFloat(data.cpi).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </p>
            </Fragment>
          )
        )}
      </Section>

      <Section darkMode={darkMode} className="flex space-x-4">
        <SharedButton
          variant="button1"
          label="Run Model"
          onClick={runLogisticModel}
        />
        {renderContentOrPlaceholder(
          logisticModelResult,
          loadingLogisticModel,
          () => (
            <Fragment>
              <div className="">
                <p>
                  <strong>Model Output:</strong>
                </p>
                <p>Lower/Maintain: {logisticModelResult.lower_or_maintain}%</p>
                <p>Raise: {logisticModelResult.raise}%</p>
              </div>
            </Fragment>
          )
        )}
      </Section>

      <Section darkMode={darkMode} className="flex space-x-4">
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
      </Section>

      <Section darkMode={darkMode} className="flex space-x-4">
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
      </Section>

      <Section darkMode={darkMode} className="flex space-x-4">
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
      </Section>
    </div>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool.isRequired,
};
