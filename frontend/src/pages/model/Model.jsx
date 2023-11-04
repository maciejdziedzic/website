import { useState } from "react";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";
import {
  classificationReport,
  logisticRegressionResults,
  prompt,
  renderTable,
} from "./ModelText";

export default function Model() {
  const { darkMode } = useDarkMode();
  const [isModelEvalOpen, setModelEvalOpen] = useState(false);
  const [isLogisticRegResultsOpen, setLogisticRegResultsOpen] = useState(false);
  const [isGPTResultsOpen, setGPTResultsOpen] = useState(false);

  const toggleAccordion = (section) => {
    if (section === "modelEval") {
      setModelEvalOpen(!isModelEvalOpen);
    } else if (section === "logisticRegResults") {
      setLogisticRegResultsOpen(!isLogisticRegResultsOpen);
    } else if (section === "gptResults") {
      setGPTResultsOpen(!isGPTResultsOpen);
    }
  };

  return (
    <div className={`mr-16 ml-16  ${darkMode ? " " : " "}`}>
      <h1 className="text-3xl font-bold mb-4 justify-center flex mt-12 ">
        FED Policy Model
      </h1>

      <h1 className="text-2xl font-bold mb-4 mt-6">Final Results Algorithm</h1>
      <section>
        <p>
          The final prediction is a weighted average of the outputs from the
          logistic regression model and the GPT model.
        </p>
        <p>The final result is calculated using the following formula:</p>{" "}
        <br />
        <div className="font-bold text-center">
          <p className="">
            Final Score (Raise) = (0.9 * Logistic Regression Score) + (0.1 * GPT
            Model Score)
          </p>
          <p className="">
            Final Score (Lower/Maintain) = 1 - Final Score (Raise)
          </p>
        </div>
        <br />
        <p>
          Where:
          <ul>
            <li>
              Logistic Regression Score: The probability of raising rates as
              predicted by the logistic regression model.
            </li>
            <li>
              GPT Model Score: The probability of raising rates as interpreted
              by the GPT model from the Federal Reserve&apos;s press release.
            </li>
          </ul>
        </p>
      </section>

      <h1 className="text-2xl font-bold mb-4 mt-8">
        Logistic Regression Model Description
      </h1>
      <section>
        <h2 className="font-semibold mt-4 mb-2">Model Overview:</h2>
        <p>
          This model is a Logistic Regression model trained to predict the
          Federal Reserve&apos;s policy based on economic indicators. The
          primary features used for prediction are the quarterly percentage
          change in the Consumer Price Index (CPI) and the quarterly average
          unemployment rate.
        </p>
      </section>
      <section>
        <h2 className="font-semibold mt-4 mb-2">Data Preparation:</h2>
        <ol className="list-decimal list-inside pl-4 mb-4">
          <li className="mb-2">
            Selection of features: &apos;CPI&apos; and &apos;Unemployment
            Rate&apos;.
          </li>
          <li className="mb-2">
            Selection of target variable: &apos;Target&apos; indicating Federal
            Reserve&apos;s policy direction.
          </li>
        </ol>
      </section>
      <section>
        <h2 className="font-semibold mt-4 mb-2">Model Training:</h2>
        <ol className="list-decimal list-inside pl-4 mb-4">
          <li className="mb-2">
            The dataset was split into training (80%) and testing (20%) sets,
            preserving the chronological order.
          </li>
          <li className="mb-2">
            Feature Scaling: Standardized the features to have a mean of 0 and a
            standard deviation of 1.
          </li>
          <li className="mb-2">
            The Logistic Regression model was trained using the scaled training
            data.
          </li>
        </ol>
      </section>
      <section>
        <button
          className="font-semibold mt-4 mb-2 bg-red-200"
          onClick={() => toggleAccordion("modelEval")}
        >
          Model Evaluation:
        </button>
        {isModelEvalOpen && (
          <div>
            <section>
              <section>
                <h3 className="font-semibold mt-2 mb-3">
                  Classification Report:
                </h3>
                {renderTable(classificationReport)}
                <p>AUC: 0.64</p>
                <p>Overall Accuracy: {classificationReport.accuracy}</p>
              </section>
            </section>
          </div>
        )}
      </section>
      <section>
        <button
          className="font-semibold mt-4 mb-2 bg-red-200"
          onClick={() => toggleAccordion("logisticRegResults")}
        >
          Logistic Regression Results:
        </button>
        {isLogisticRegResultsOpen && (
          <div>
            <section>
              <pre className="whitespace-pre-wrap mb-4">
                {logisticRegressionResults}
              </pre>
              <p>
                Intercept: At zero unemployment and CPI change, the log odds of
                the target being 1 is 0.1216.
              </p>
              <p>
                Unemployment: A one-unit increase in unemployment increases the
                log odds of the target being 1 by 0.2677.
              </p>
              <p>
                CPI Change: A one-unit increase in CPI percentage change
                decreases the log odds of the target being 1 by 0.4176.
              </p>
            </section>
          </div>
        )}
      </section>

      <h1 className="text-2xl font-bold mb-4 mt-4">LLM Text Interpretation</h1>
      <p className="">
        Based on the latest press release from the Federal Reserve, model
        predicts chance that the Federal Reserve will increase the interest
        rates.
      </p>
      <section>
        <button
          className="font-semibold mt-4 mb-2 bg-red-200"
          onClick={() => toggleAccordion("gptResults")}
        >
          Chat GPT Prompt:
        </button>
        {isGPTResultsOpen && (
          <div>
            <section>
              <pre className="whitespace-pre-wrap mb-4">{prompt}</pre>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}
