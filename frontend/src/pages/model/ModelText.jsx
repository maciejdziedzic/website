export const classificationReport = {
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

export const logisticRegressionResults = `
Dep. Variable:                 target   No. Observations:                  217
Model:                          Logit   Df Residuals:                      214
Method:                           MLE   Df Model:                            2
Date:                Tue, 31 Oct 2023   Pseudo R-squ.:                 0.03610
Time:                        21:01:48   Log-Likelihood:                -144.61
converged:                       True   LL-Null:                       -150.02
Covariance Type:            nonrobust   LLR p-value:                  0.004447
                coef      std err       z        P>|z|      [0.025      0.975]
------------------------------------------------------------------------------
const          0.1216      0.139      0.872      0.383      -0.152       0.395
unemp         -0.4176      0.147     -2.836      0.005      -0.706      -0.129
cpi            0.2677      0.147      1.824      0.068      -0.020       0.555`;

export const prompt = `response = openai.ChatCompletion.create(
model="gpt-3.5-turbo",
temperature=0.5,
messages=[
{"role": "system",
"content": f"You will be given a text snippet. Your task is to determine its potential impact on interest rates in percentage terms. Return the likelihood that interest rates will rise based on the text. Please provide a response in the form of a percentage. A response of 50% means that the text gives no indication whether interest rates will rise or fall. A response above 50% means that the text suggests a higher likelihood of interest rates increasing, while a response below 50% suggests a higher likelihood of interest rates remaining the same or decreasing. Interpret the following text: {press_release_content}"}])`;

export const renderTable = (data) => (
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
