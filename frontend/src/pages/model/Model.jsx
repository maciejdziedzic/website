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
              S&P 500: Data loaded from local CSV files sourced from stooq.pl.
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
