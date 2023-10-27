import { useState } from "react";
import PropTypes from "prop-types";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";

function Data() {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`space-y-10 p-4 ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <CollapsibleProjectSection
        title="Assets Return"
        headers={["Asset", "Description", "Source"]}
        rows={[
          [
            "GOLD",
            "Year-over-year return based on the gold price.",
            "stooq.pl",
            "https://stooq.pl/q/d/?s=xauusd&c=0&d1=19691231&d2=20221230&i=y",
          ],
          [
            "HOUSE",
            "Year-over-year return from median sales price of houses in the U.S.",
            "fred",
            "https://fred.stlouisfed.org/series/MSPUS",
          ],
          [
            "SP500",
            "Year-over-year return based on the S&P500 index value.",
            "stooq.pl",
            "https://stooq.pl/q/d/?s=%5Espx&c=0&d1=19691230&d2=20221230&i=y",
          ],
          [
            "BONDS10Y",
            "End-of-year yield for 10-year U.S. Treasury bonds.",
            "fred",
            "https://fred.stlouisfed.org/series/DGS10",
          ],
          [
            "Inflation",
            "Annual growth rate in the Consumer Price Index.",
            "fred",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
        ]}
      />

      <CollapsibleProjectSection
        title="U.S. Macroeconomic Chart"
        headers={["Indicator", "Description", "Source"]}
        rows={[
          [
            "HOUSE/WAGES",
            "Quarterly ratio of median U.S. house prices to monthly wages (calculated as 168 times the hourly rate).",
            "fred",
            "https://fred.stlouisfed.org/series/AHETPI",
          ],

          [
            "FED RATE",
            "Federal Effective Funds Rate, updated monthly.",
            "fred",
            "https://fred.stlouisfed.org/series/FEDFUNDS",
          ],
          [
            "IYC",
            <>
              Monthly Inverted Yield Curve. The FED&apos;s{" "}
              <a
                href="https://www.federalreserve.gov/econres/feds/files/2018055pap.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                paper{" "}
              </a>
              suggests the Near Term Forward Yield Spread as a more accurate
              indicator.
            </>,
            "fred",
            "https://fred.stlouisfed.org/series/T10Y2Y",
          ],

          [
            "US GDP",
            "Four-month moving average of quarterly GDP growth rate, represented in monthly intervals.",
            "fred",
            "https://fred.stlouisfed.org/series/GDP",
          ],
          [
            "DEBT/GDP",
            "Quarterly ratio of federal debt to GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/GFDEGDQ188S",
          ],
          [
            "CB. ASST./GDP",
            "Annual ratio of Central Bank assets to quarterly GDP, adjusted to monthly intervals.",
            "fred",
            "https://fred.stlouisfed.org/series/DDDI06USA156NWDB",
          ],
          [
            "M3/GDP",
            "Monthly ratio of Broad Money M3 to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/MABMM301USM189S",
          ],
          [
            "UNEMPL",
            "U.S. unemployment rate, updated monthly.",
            "fred",
            "https://fred.stlouisfed.org/series/UNRATE",
          ],
          [
            "CPI",
            "Year-over-year change in the monthly Consumer Price Index, updated monthly.",
            "fred",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
          [
            "PPI",
            "Year-over-year change in the monthly Producer Price Index, updated monthly.",
            "fred",
            "https://fred.stlouisfed.org/series/PPIACO",
          ],
          [
            "RES. OF DEP.",
            "Monthly ratio of depository institutions' reserves to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/TOTRESNS",
          ],
          [
            "C.P./GDP",
            "Quarterly ratio of after-tax corporate profits to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/CP",
          ],
          [
            "INDUST. PROD.",
            "Industrial Production Index (base year: 2017), updated monthly.",
            "fred",
            "https://fred.stlouisfed.org/series/INDPRO",
          ],
          [
            "GDP WORLD",
            "Annual growth rate of worldwide GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/NYGDPMKTPCDWLD",
          ],
          [
            "OIL",
            "WTI crude oil price, updated monthly.",
            "fred",
            "https://fred.stlouisfed.org/series/WTISPLC",
          ],
        ]}
      />

      <CollapsibleProjectSection
        title="U.S. Recession Model"
        firstSectionTitle="Input Variables"
        firstHeaders={["Metric", "Description", "Source"]}
        firstRows={[
          [
            "FED RATE",
            "The FED Effective Rate's quarterly percentage change has been categorized into three distinct levels: -1 for a decrease, 0 for no change, and 1 for an increase.",
            "FRED",
            "https://fred.stlouisfed.org/series/FEDFUNDS",
          ],
          [
            "CPI",
            "Quarterly percentage change in the Consumer Price Index.",
            "FRED",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
          [
            "S&P 500",
            "Quarterly percentage change in S&P 500 index.",
            "Stooq",
            "https://stooq.pl/q/d/?s=%5Espx&c=0&d1=19691231&d2=20221230&i=y",
          ],
        ]}
        secondSectionTitle="Input Variables for Prediction"
        secondHeaders={["Metric", "Description", "Source"]}
        secondRows={[
          [
            "PROJECTED CPI",
            "Web-scraped quarterly Consumer Price Index projection from the Federal Reserve Bank of Cleveland's published data, transformed from quarterly annualized percentage change to quarterly percentage change.",
            "Federal Reserve - Cleveland",
            "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting",
          ],
          [
            "HYPOTETHICAL FED RATE",
            "A machine learning model analyzes the most recent Federal Reserve press release text to forecast possible rate changes. It assigns -1 when it predicts a rate decrease, 0 when it anticipates rate stability, and 1 when it expects rate increases.",
            "Federal Reserve",
            "https://www.federalreserve.gov/",
          ],
        ]}
      />
    </div>
  );
}

function CollapsibleProjectSection({
  title,
  firstSectionTitle,
  firstHeaders,
  firstRows,
  secondSectionTitle,
  secondHeaders,
  secondRows,
  headers,
  rows,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="rounded-lg overflow-hidden shadow-lg mb-6">
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          {isOpen ? "Collapse" : "Expand"}
        </button>
      </div>
      {isOpen && (
        <>
          {firstSectionTitle && firstHeaders && firstRows ? (
            <>
              <h2 className="text-xl font-bold my-4 px-4">
                {firstSectionTitle}
              </h2>
              <TableComponent headers={firstHeaders} rows={firstRows} />
            </>
          ) : headers && rows ? (
            <TableComponent headers={headers} rows={rows} />
          ) : null}
          {secondSectionTitle && secondHeaders && secondRows && (
            <>
              <h2 className="text-xl font-bold my-4 px-4">
                {secondSectionTitle}
              </h2>
              <TableComponent headers={secondHeaders} rows={secondRows} />
            </>
          )}
        </>
      )}
    </section>
  );
}

function TableComponent({ headers, rows }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="py-3 px-4 border-b bg-gray-400">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4 border-b">
                {cellIndex === 2 ? ( // If it's the source column
                  <a
                    href={row[cellIndex + 1]} // URL is in the next column
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {cell}
                  </a>
                ) : (
                  cellIndex !== 3 && cell // Skip displaying the URL as plain text
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Data;

TableComponent.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
};

CollapsibleProjectSection.propTypes = {
  title: PropTypes.string.isRequired,
  firstSectionTitle: PropTypes.string,
  firstHeaders: PropTypes.arrayOf(PropTypes.string),
  firstRows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  secondSectionTitle: PropTypes.string,
  secondHeaders: PropTypes.arrayOf(PropTypes.string),
  secondRows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  headers: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
