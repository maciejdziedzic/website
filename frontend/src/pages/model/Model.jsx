import useDarkMode from "../../contexts/DarkMode/useDarkMode";

export default function ModelDescription() {
  const { darkMode } = useDarkMode();

  const classificationReport = {
    0: { precision: "0.66", recall: "0.73", f1Score: "0.69", support: "26" },
    1: { precision: "0.73", recall: "0.66", f1Score: "0.69", support: "29" },
    accuracy: "0.69",
    "macro avg": {
      precision: "0.69",
      recall: "0.69",
      f1Score: "0.69",
      support: "55",
    },
    "weighted avg": {
      precision: "0.70",
      recall: "0.69",
      f1Score: "0.69",
      support: "55",
    },
  };

  const logisticRegressionResults = `
Logit Regression Results                           
==============================================================================
Dep. Variable:                 target   No. Observations:                  217
Model:                          Logit   Df Residuals:                      214
Method:                           MLE   Df Model:                            2
Date:                Tue, 31 Oct 2023   Pseudo R-squ.:                 0.03610
Time:                        21:01:48   Log-Likelihood:                -144.61
converged:                       True   LL-Null:                       -150.02
Covariance Type:            nonrobust   LLR p-value:                  0.004447
==============================================================================
                 coef    std err          z      P&gt;|z|      [0.025      0.975]
------------------------------------------------------------------------------
const          0.1216      0.139      0.872      0.383      -0.152       0.395
x1            -0.4176      0.147     -2.836      0.005      -0.706      -0.129
x2             0.2677      0.147      1.824      0.068      -0.020       0.555
==============================================================================
`;

  const renderTable = (data) => (
    <table className="min-w-full mb-4">
      <thead>
        <tr>
          <th className="border px-2 py-1">Class</th>
          <th className="border px-2 py-1">Precision</th>
          <th className="border px-2 py-1">Recall</th>
          <th className="border px-2 py-1">F1-Score</th>
          <th className="border px-2 py-1">Support</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data)
          .filter(([key]) => key !== "accuracy")
          .map(([key, values], index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{key}</td>
              <td className="border px-2 py-1">{values.precision || "N/A"}</td>
              <td className="border px-2 py-1">{values.recall || "N/A"}</td>
              <td className="border px-2 py-1">{values.f1Score || "N/A"}</td>
              <td className="border px-2 py-1">{values.support || "N/A"}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <div className={`mr-16 ml-16 mt-8 ${darkMode ? " " : " "}`}>
      <h1 className="text-3xl font-bold mb-4 justify-center flex mt-12 ">
        FED Policy Model
      </h1>
      <h1 className="text-2xl font-bold mb-4">
        Logistic Regression Model Description
      </h1>

      <section>
        <h2 className="text-xl font-semibold mt-4 mb-2">Model Overview:</h2>
        <p>
          This model is a Logistic Regression model trained to predict the
          Federal Reserve&apos;s policy based on economic indicators. The
          primary features used for prediction are the quarterly percentage
          change in the Consumer Price Index (CPI) and the quarterly average
          unemployment rate.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-4 mb-2">Data Preparation:</h2>
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
        <h2 className="text-xl font-semibold mt-4 mb-2">Model Training:</h2>
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
        <h2 className="text-xl font-semibold mt-4 mb-2">Model Evaluation:</h2>
        <p>
          The model&apos;s performance was evaluated using various metrics,
          detailed below:
        </p>
        <section>
          <h3 className="text-lg font-semibold mt-2 mb-1">
            Classification Report:
          </h3>
          {renderTable(classificationReport)}
          <p>
            <strong>AUC: </strong>0.64
          </p>
          <p>
            <strong>Overall Accuracy:</strong> {classificationReport.accuracy}
          </p>
        </section>
      </section>

      <section>
        <h3 className="text-lg font-semibold mt-4 mb-2">
          Logistic Regression Results:
        </h3>
        <pre className="whitespace-pre-wrap mb-4">
          {logisticRegressionResults}
        </pre>
        <p>
          <strong>Intercept:</strong>At zero unemployment and CPI change, the
          log odds of the target being 1 is 0.1216.
        </p>
        <p>
          <strong>Unemployment:</strong>A one-unit increase in unemployment
          increases the log odds of the target being 1 by 0.2677.
        </p>
        <p>
          <strong>CPI Change:</strong>A one-unit increase in CPI percentage
          change decreases the log odds of the target being 1 by 0.4176.
        </p>
      </section>
      <h1 className="text-2xl font-bold mb-4 mt-4">LLM Text Interpretation</h1>
      <p>
        Based on the latest press release from the Federal Reserve, model
        predicts chance that the Federal Reserve will increase the interest
        rates.
      </p>
      <h1 className="text-2xl font-bold mb-4 mt-4">Final Results Algorithm</h1>

      <section>
        <p>
          The final prediction is a weighted average of the outputs from the
          logistic regression model and the GPT model. The logistic regression
          model is assigned a weight of 90%, reflecting its based on
          quantitative data and established statistical methods. The GPT model,
          providing a qualitative perspective based on text analysis, is
          assigned a weight of 10%. This distribution of weights underscores the
          primary reliance on the logistic regression model, while still
          considering the insights provided by the GPT model.
        </p>
        <p>The final result is calculated using the following formula:</p>{" "}
        <br />
        <pre>
          Final Score (Raise) = (0.9 * Logistic Regression Score) + (0.1 * GPT
          Model Score)
        </pre>
        <pre>Final Score (Lower/Maintain) = 1 - Final Score (Raise)</pre>
        <br />
        <p>
          Where:
          <ul>
            <li>
              <strong>Logistic Regression Score</strong>: The probability of
              raising rates as predicted by the logistic regression model.
            </li>
            <li>
              <strong>GPT Model Score</strong>: The probability of raising rates
              as interpreted by the GPT model from the Federal Reserve&apos;s
              press release.
            </li>
          </ul>
        </p>
      </section>
    </div>
  );
}
