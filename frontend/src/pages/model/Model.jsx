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

      <h2 className="text-xl font-semibold mt-4 mb-2">
        Data Acquisition and Preprocessing:
      </h2>
      <ol className="list-decimal list-inside pl-4 mb-4">
        <li className="mb-2">
          <strong>Data Sources</strong>:
          <ul className="list-disc list-inside pl-4">
            <li>
              S&P 500: Data loaded from local CSV file sourced from stooq.pl.
            </li>
            <li>
              Consumer Price Index (CPI): Fetched using the fredapi from the
              FRED database.
            </li>
            <li>
              Federal Effective Rate (FEDFUNDS): Also sourced from the FRED
              database.
            </li>
          </ul>
        </li>
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
Dep. Variable:                      y   R-squared:                       0.073
Model:                            OLS   Adj. R-squared:                  0.060
Method:                 Least Squares   F-statistic:                     5.461
Date:                Thu, 26 Oct 2023   Prob (F-statistic):            0.00521
Time:                        18:45:50   Log-Likelihood:                -497.10
No. Observations:                 142   AIC:                             1000.
Df Residuals:                     139   BIC:                             1009.
Df Model:                           2                                         
Covariance Type:            nonrobust                                         
==============================================================================
                coef        std err      t        P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
const           4.6312      1.199      3.862      0.000       2.260       7.002
cpi_pct        -2.1084      0.851     -2.479      0.014      -3.790      -0.427
fed_sentiment  -1.0620      0.704     -1.508      0.134      -2.454       0.330
==============================================================================
Omnibus:                       10.995   Durbin-Watson:                   1.940
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
