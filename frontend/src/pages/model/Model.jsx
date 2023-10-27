import useDarkMode from "../../contexts/DarkMode/useDarkMode";

export default function ModelDescription() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`p-8 rounded-lg shadow-md ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">
        Model Creation and Validation for S&P 500 Returns based on CPI and FED
        Sentiment
      </h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Data Transformation:</h2>
      <ol className="list-decimal list-inside pl-4 mb-4">
        <li className="mb-2">
          <strong>Data Transformation</strong>:
          <ul className="list-disc list-inside pl-4">
            <li>
              S&P 500 data is resampled quarterly with percentage change in
              price computed.
            </li>
            <li>
              CPI data is also resampled quarterly with percentage change
              calculated.
            </li>
            <li>
              Federal Effective Rate is resampled and averaged. Fed sentiment is
              derived based on rate change.
            </li>
          </ul>
        </li>
        <li>
          Final Dataset: Combined all datasets into one DataFrame containing
          quarterly changes and Federal Effective Rate sentiment.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mt-4 mb-2">Model Construction:</h2>
      <ol className="list-decimal list-inside pl-4 mb-4">
        <li className="mb-2">
          Linear Regression Model: Used to predict quarterly returns of S&P 500
          based on CPI change and Federal Effective Rate sentiment.
        </li>
        <li className="mb-2">
          Time Series Cross-Validation: Ensures no data leakage between train
          and test datasets.
        </li>
        <li className="mb-2">
          <strong>Model Training and Validation</strong>:
          <ul className="list-disc list-inside pl-4">
            <li>Data split into train and test sets.</li>
            <li>Linear regression model trained on training set.</li>
            <li>
              Model performance evaluated using Mean Squared Error (MSE) on test
              set.
            </li>
            <li>R-squared values computed for both datasets.</li>
            <li>
              Detailed model statistics obtained using the statsmodels library.
            </li>
          </ul>
        </li>
        <li>
          Model Serialization: Trained model saved to .pkl file for future use.
        </li>
      </ol>
      <h2 className="text-xl font-semibold mt-4 mb-2">
        Model Evaluation and Results:
      </h2>
      <p className="mb-4">
        After training and validating the model, the following results were
        obtained:
      </p>
      <ul className="list-disc list-inside pl-4 mb-4">
        <li>Test Mean Squared Error (MSE): 60.235 (S&P 500)</li>
        <li>Model Coefficients: [-2.1084, -1.0620]</li>
        <li>Model Intercept: 4.6312</li>
        <li>Training R^2: 0.0728</li>
        <li>Test R^2: -0.1517</li>
      </ul>
      <p className="mb-4">
        The statistical summary from the OLS regression is as follows:
      </p>
      <pre className="whitespace-pre-wrap mb-4">
        {`
sp500 Test MSE: 65.49505801265217
sp500 Test MSE: 82.41482712877064
sp500 Model Coefficients: [-2.17141496 -1.43532648]
sp500 Model Intercept: 4.807484486328864
sp500 Training R^2: 0.09517663201680049
sp500 Test R^2: -0.15963313685264957
                            OLS Regression Results                            
==============================================================================
Dep. Variable:                      y   R-squared:                       0.095
Model:                            OLS   Adj. R-squared:                  0.085
Method:                 Least Squares   F-statistic:                     9.414
Date:                Fri, 27 Oct 2023   Prob (F-statistic):           0.000130
Time:                        18:13:08   Log-Likelihood:                -618.46
No. Observations:                 182   AIC:                             1243.
Df Residuals:                     179   BIC:                             1253.
Df Model:                           2                                         
Covariance Type:            nonrobust                                         
==============================================================================
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
const          4.8075      0.881      5.456      0.000       3.069       6.546
x1            -2.1714      0.677     -3.206      0.002      -3.508      -0.835
x2            -1.4353      0.550     -2.610      0.010      -2.520      -0.350
==============================================================================
Omnibus:                       15.504   Durbin-Watson:                   1.972
...
==============================================================================
        `}
      </pre>
      <p className="italic mb-4">
        These results provide a comprehensive overview of the model’s
        performance and the statistical significance of its coefficients.
        Further analysis and validation might be necessary to improve the model
        and better understand the relationships between the variables.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Key Observations:</h2>
      <p className="mb-4">
        The code aims to understand the influence of macroeconomic factors, like
        inflation (CPI) and the Federal Reserve&apos;s sentiment, on returns of
        the S&P 500. It uses linear regression to quantify these relationships
        and validates the model using time series cross-validation. This ensures
        a proper temporal evaluation of the model.
      </p>

      <p className="italic mb-4">
        Note: This model is based on historical data. Financial markets are
        influenced by numerous factors. Past performance isn&apos;t indicative
        of future results. Always consult financial experts before making
        investment decisions.
      </p>
    </div>
  );
}
