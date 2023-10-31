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

  return (
    <div
      className={`p-8 rounded-lg shadow-md ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">
        Logistic Regression Model Description
      </h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Model Overview:</h2>
      <p>
        This model is a Logistic Regression model trained to predict the Federal
        Reserve&apos;s policy based on economic indicators. The primary features
        used for prediction are the quarterly percentage change in the Consumer
        Price Index (CPI) and the quarterly average unemployment rate.
      </p>

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

      <h2 className="text-xl font-semibold mt-4 mb-2">Model Evaluation:</h2>
      <p>
        The model&apos;s performance was evaluated using various metrics,
        detailed below:
      </p>
      <div>
        <h3 className="text-lg font-semibold mt-2 mb-1">
          Classification Report:
        </h3>
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
            {Object.entries(classificationReport)
              .filter(([key]) => key !== "accuracy")
              .map(([key, values], index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{key}</td>
                  <td className="border px-2 py-1">
                    {values.precision || "N/A"}
                  </td>
                  <td className="border px-2 py-1">{values.recall || "N/A"}</td>
                  <td className="border px-2 py-1">
                    {values.f1Score || "N/A"}
                  </td>
                  <td className="border px-2 py-1">
                    {values.support || "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p>
          <strong>Overall Accuracy:</strong> {classificationReport.accuracy}
        </p>
      </div>
      <p>
        Additionally, the Receiver Operating Characteristic (ROC) curve and the
        Area Under the Curve (AUC) score were used to evaluate the model. These
        tools provide a visual and quantitative method to assess the
        model&apos;s performance, particularly its ability to distinguish
        between the two classes. It is recommended to include these in the
        model&apos;s evaluation for a more comprehensive understanding.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Model Interpretation:</h2>
      <p>
        SHAP values were calculated and plotted to interpret the model&apos;s
        predictions and understand the impact of each feature on the
        model&apos;s output.
      </p>
    </div>
  );
}
