import PropTypes from "prop-types";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";

function Data() {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`space-y-10 ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <ProjectSection
        title="Assets Return"
        rows={[
          [
            "GOLD",
            "Year-over-year return based on gold price.",
            "stooq.pl",
            "https://stooq.pl/q/d/?s=%5Espx&c=0&d1=19691231&d2=20221230&i=y",
          ],
          [
            "HOUSE",
            "Year-over-year return from median sales price of houses sold in the U.S.",
            "fred",
            "https://fred.stlouisfed.org/series/MSPUS",
          ],
          [
            "SP500",
            "Year-over-year return based on the S&P500 index value.",
            "stooq.pl",
            "https://stooq.pl/q/d/?s=^spx&i=y&d1=19691230&d2=20241231",
          ],
          [
            "BONDS10Y",
            "End-of-year market yield for 10-year U.S. Treasury bonds.",
            "fred",
            "https://fred.stlouisfed.org/series/DGS10",
          ],
          [
            "Inflation",
            "Annual growth in the Consumer Price Index.",
            "fred",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
        ]}
      />

      <ProjectSection
        title="Macroeconomic Chart"
        rows={[
          [
            "HOUSE/WAGES",
            "Quarterly ratio of median house prices to wages.",
            "fred",
            "https://fred.stlouisfed.org/series/LES1252881500Q",
          ],
          [
            "FED RATE",
            "Monthly Federal Effective Funds Rate.",
            "fred",
            "https://fred.stlouisfed.org/series/FEDFUNDS",
          ],
          [
            "IYC",
            <>
              Monthly Inverted Yield Curve. The FED published a{" "}
              <a
                href="https://www.federalreserve.gov/econres/feds/files/2018055pap.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                paper
              </a>{" "}
              in which it considers the Near Term Forward Yield Spread as a
              better indicator.
            </>,
            "fred",
            "https://fred.stlouisfed.org/series/T10Y2Y",
          ],

          [
            "US GDP",
            "Four-month moving average of the quarterly GDP percentage change, forward-filled into monthly intervals.",
            "fred",
            "https://fred.stlouisfed.org/series/GDP",
          ],
          [
            "DEBT/GDP",
            "Quarterly federal debt ratio to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/GFDEGDQ188S",
          ],
          [
            "CB. ASST./GDP",
            "Annual Central Bank assets (forward-filled into monthly intervals) as a ratio to quarterly GDP (also forward-filled into monthly intervals).",
            "fred",
            "https://fred.stlouisfed.org/series/DDDI06USA156NWDB",
          ],
          [
            "M3/GDP",
            "Monthly Broad Money M3 ratio to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/MABMM301USM189S",
          ],
          [
            "UNEMPL",
            "Monthly Unemployment Rate.",
            "fred",
            "https://fred.stlouisfed.org/series/UNRATE",
          ],
          [
            "CPI",
            "Year-over-year percentage change in the monthly Consumer Price Index.",
            "fred",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
          [
            "PPI",
            "Year-over-year percentage change in the monthly Producer Price Index.",
            "fred",
            "https://fred.stlouisfed.org/series/PPIACO",
          ],
          [
            "RES. OF DEP.",
            "Monthly reserves of depository institutions ratio to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/TOTRESNS",
          ],
          [
            "C.P./GDP",
            "Quarterly corporate profits after tax ratio to quarterly GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/CP",
          ],
          [
            "INDUST. PROD.",
            "Monthly Industrial Production index (2017=100).",
            "fred",
            "https://fred.stlouisfed.org/series/INDPRO",
          ],
          [
            "GDP WORLD",
            "Annual growth rate of global GDP.",
            "fred",
            "https://fred.stlouisfed.org/series/NYGDPMKTPCDWLD",
          ],
          [
            "OIL",
            "Monthly WTI oil price.",
            "fred",
            "https://fred.stlouisfed.org/series/WTISPLC",
          ],
        ]}
      />

      <ProjectSection
        title="Recession Model"
        rows={[
          [
            "CPI Forecast",
            "Forecasted year-over-year % change in the quarterly Consumer Price Index.",
            "fed",
            "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting",
          ],
          [
            "Federal Effective Rate",
            "Derived from Chat GPT's text analysis of the latest Federal Reserve article. It assesses either a Press Release (paragraphs 1-3) or a Speech (paragraphs 3-5) to predict rate changes: -1 indicates a rate cut, 0 signifies no change, and 1 suggests a rate increase.",
            "fed",
            "https://www.federalreserve.gov/",
          ],
        ]}
      />
    </div>
  );
}

function ProjectSection({ title, rows }) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <TableComponent rows={rows} />
    </section>
  );
}

function TableComponent({ rows }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="py-3 px-4 border-b bg-gray-400">Asset</th>
          <th className="py-3 px-4 border-b bg-gray-400">Description</th>
          <th className="py-3 px-4 border-b bg-gray-400">Source</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{row[0]}</td>
            <td className="py-2 px-4 border-b">{row[1]}</td>
            <td className="py-2 px-4 border-b">
              <a
                href={row[3]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {row[2]}
              </a>
            </td>
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
};

ProjectSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
};
