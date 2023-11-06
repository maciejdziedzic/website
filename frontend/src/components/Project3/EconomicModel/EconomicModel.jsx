import { useState, useContext, Fragment } from "react";
import axios from "axios";
import Button from "../../Button/Button";
import { DarkModeContext } from "../../../contexts/DarkMode/DarkModeContext";
import "./EconomicModel.css";
import PropTypes from "prop-types";

function Section({ children, darkMode }) {
  return (
    <div
      className={`flex md:space-x-8 space-x-2 items-center md:p-3 p-1 rounded-md  ${
        darkMode ? "bg-neutral-700" : "bg-stone-300 bg-opacity-20"
      }`}
    >
      {children}
    </div>
  );
}

export default function EconomicModel() {
  const { darkMode } = useContext(DarkModeContext);
  const [logisticData, setLogisticData] = useState(null);
  const [logisticModelResult, setLogisticModelResult] = useState(null);
  const [fedData, setFedData] = useState(null);
  const [interpretation, setInterpretation] = useState(null);
  const [finalResult, setFinalResult] = useState(null);

  const [loadingLogisticData, setLoadingLogisticData] = useState(false);
  const [loadingLogisticModel, setLoadingLogisticModel] = useState(false);
  const [loadingFedData, setLoadingFedData] = useState(false);
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);
  const [loadingFinalResult, setLoadingFinalResult] = useState(false);
  const [buttonActiveState, setButtonActiveState] = useState({
    fetchData: false,
    runModel: false,
    fetchFed: false,
    fetchGPT: false,
    calculate: false,
  });
  const fetchLogisticData = async () => {
    setLoadingLogisticData(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/fetch-logistic-data"
      );
      setLogisticData(response.data);
    } catch (error) {
      console.error("Error fetching logistic data: ", error);
    }
    setLoadingLogisticData(false);
    setButtonActiveState((prev) => ({ ...prev, fetchData: true }));
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
    setButtonActiveState((prev) => ({ ...prev, runModel: true }));
  };

  const fetchFedArticle = async () => {
    setLoadingFedData(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fetch-fed-text"
      );
      setFedData(response.data);
    } catch (error) {
      console.error("Error fetching fed article: ", error);
    }
    setLoadingFedData(false);
    setButtonActiveState((prev) => ({ ...prev, fetchFed: true }));
  };

  const fetchInterpretation = async () => {
    setLoadingInterpretation(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/fetch-fed-interpretation",
        fedData
      );
      setInterpretation(response.data);
    } catch (error) {
      console.error("Error fetching fed interpretation: ", error);
    }
    setLoadingInterpretation(false);
    setButtonActiveState((prev) => ({ ...prev, fetchGPT: true }));
  };

  const calculateFinalResult = () => {
    setLoadingFinalResult(true);
    if (logisticModelResult && interpretation) {
      const logisticRaise = parseFloat(logisticModelResult.raise) / 100;
      const gptInterpretation = parseFloat(interpretation.interpretation);
      // Calculate the weighted average based on the provided logic
      const weightedRaise = 0.9 * logisticRaise + 0.1 * gptInterpretation;
      const weightedLowerOrMaintain = 1 - weightedRaise;

      // You can round these to two decimal places if needed for display
      const roundedRaise = (weightedRaise * 100).toFixed(2);
      const roundedLowerOrMaintain = (weightedLowerOrMaintain * 100).toFixed(2);

      setFinalResult({
        lower_or_maintain: roundedLowerOrMaintain,
        raise: roundedRaise,
      });
    } else {
      console.error("Logistic model result or interpretation is not available");
    }
    setLoadingFinalResult(false);
    setButtonActiveState((prev) => ({ ...prev, calculate: true }));
  };

  const LoadingDots = () => (
    <div className="loadingDots">
      Loading <span></span>
    </div>
  );

  const renderContentOrPlaceholder = (data, loading, contentRenderer) => {
    if (loading) return <LoadingDots />;
    return <div>{data ? contentRenderer(data) : "-"}</div>;
  };

  return (
    <div>
      <div
        className={`flex flex-col space-y-4 md:mr-10 md:ml-10 lg:ml-10 md:mb-4 ml-2 mr-2 mb-4 mt-6 md:mt-0 ${
          darkMode ? " " : ""
        }`}
      >
        <Section darkMode={darkMode} className="flex">
          <Button
            variant="button1"
            label="Fetch Data"
            onClick={fetchLogisticData}
            disabled={loadingLogisticData}
            active={buttonActiveState.fetchData}
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

        <Section darkMode={darkMode} className="flex">
          <Button
            variant="button1"
            label="Run Model"
            onClick={runLogisticModel}
            disabled={!buttonActiveState.fetchData || loadingLogisticModel}
            active={buttonActiveState.runModel}
          />
          {renderContentOrPlaceholder(
            logisticModelResult,
            loadingLogisticModel,
            () => (
              <Fragment>
                <p>
                  <strong>Result:</strong>
                </p>
                <p>Raise: {logisticModelResult.raise}%</p>
                <p>Lower/Maintain: {logisticModelResult.lower_or_maintain}%</p>
              </Fragment>
            )
          )}
        </Section>

        <Section darkMode={darkMode} className="flex space-x-4">
          <Button
            variant="button1"
            label="Fetch FED"
            onClick={fetchFedArticle}
            disabled={!buttonActiveState.runModel || loadingFedData}
            active={buttonActiveState.fetchFed}
          />

          {renderContentOrPlaceholder(fedData, loadingFedData, () => (
            <Fragment>
              <p>
                <strong>Press Release:</strong>
              </p>
              <p className="text-xs">{fedData.press_release_content}</p>
            </Fragment>
          ))}
        </Section>

        <Section darkMode={darkMode} className="flex ">
          <Button
            variant="button1"
            label="Fetch GPT"
            onClick={fetchInterpretation}
            disabled={!buttonActiveState.fetchFed || loadingInterpretation}
            active={buttonActiveState.fetchGPT}
          />
          {renderContentOrPlaceholder(
            interpretation,
            loadingInterpretation,
            () => (
              <Fragment>
                <p>
                  <strong>Interpretation:</strong>{" "}
                </p>
                <p>
                  Based on the text analysis, there is{" "}
                  {(interpretation.interpretation * 100).toFixed(0)}% chance
                  that the Federal Reserve will raise interest rates, and {""}
                  {((1 - interpretation.interpretation) * 100).toFixed(0)}%
                  chance that it will lower or maintain interest rates.
                </p>
              </Fragment>
            )
          )}
        </Section>

        <Section darkMode={darkMode} className="flex ">
          <Button
            variant="button1"
            label="Calculate"
            onClick={calculateFinalResult}
            disabled={!buttonActiveState.fetchGPT || loadingFinalResult}
            active={buttonActiveState.calculate}
          />
          {renderContentOrPlaceholder(finalResult, loadingFinalResult, () => (
            <Fragment>
              <div>
                <p>
                  <strong>Final Result:</strong>
                </p>
                <p>Raise: {finalResult.raise}%</p>
                <p>Lower/Maintain: {finalResult.lower_or_maintain}%</p>
              </div>
            </Fragment>
          ))}
        </Section>
      </div>
    </div>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool.isRequired,
};
