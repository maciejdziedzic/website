import PropTypes from "prop-types";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";

function Data() {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`m-10 space-y-10 ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <ProjectSection
        title="Assets Return"
        rows={[
          [
            "Gold",
            "Annual Return based on price change.",
            "stooq.pl",
            "https://stooq.pl/q/d/?s=%5Espx&c=0&d1=19691231&d2=20221230&i=y",
          ],
          [
            "House Prices",
            "Annual Return from Sales Price of Houses Sold in the U.S.",
            "fred",
            "https://fred.stlouisfed.org/series/MSPUS",
          ],
          [
            "S&P 500 Index",
            "Annual Return determined by closing price on the last days of consecutive years.",
            "stooq.pl",
            "https://stooq.pl/q/d/?s=^spx&i=y&d1=19691230&d2=20241231",
          ],
          [
            "10-Year U.S. Treasury Bonds",
            "Market Yield at 10-Year Constant Maturity (Annual data).",
            "fred",
            "https://fred.stlouisfed.org/series/DGS10",
          ],
          [
            "Inflation",
            "Consumer Price Index (CPI) growth annually.",
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
            "House median prices (Q) divided by wages (Q).",
            "fred",
            "https://fred.stlouisfed.org/series/LES1252881500Q",
          ],
          [
            "FED RATE",
            "Federal Effective Rate (M)",
            "fred",
            "https://fred.stlouisfed.org/series/FEDFUNDS",
          ],
          [
            "IYC",
            <>Inverted Yield Curve (M).</>,
            // <>
            //   Inverted Yield Curve (M). FED published a{" "}
            //   <a
            //     href="https://www.federalreserve.gov/econres/feds/files/2018055pap.pdf"
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="text-blue-500 hover:underline"
            //   >
            //     paper
            //   </a>{" "}
            //   in which considers the Near Term Forward Yield Spread as a better
            //   indicator.
            // </>,
            "fred",
            "https://fred.stlouisfed.org/series/T10Y2Y",
          ],

          [
            "US GDP",
            "4-month moving average of the GDP (Q) percentage change, that has been forward-filled into monthly intervals.",
            "fred",
            "https://fred.stlouisfed.org/series/GDP",
          ],
          [
            "DEBT/GDP",
            "Federal Debt (Q) to GDP (Q).",
            "fred",
            "https://fred.stlouisfed.org/series/GFDEGDQ188S",
          ],
          [
            "CB. ASST./GDP",
            "The ratio of Central Bank Assets (A) to GDP (Q).",
            "fred",
            "https://fred.stlouisfed.org/series/DDDI06USA156NWDB",
          ],
          [
            "M3/GDP",
            "Broad Money M3 (M) to GDP (Q).",
            "fred",
            "https://fred.stlouisfed.org/series/MABMM301USM189S",
          ],
          [
            "UNEMPL",
            "Unemployment Rate (M).",
            "fred",
            "https://fred.stlouisfed.org/series/UNRATE",
          ],
          [
            "CPI",
            "Year-over-year percentage change in the Consumer Price Index (M).",
            "fred",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
          [
            "PPI",
            "Year-over-year percentage change in the Producer Price Index (M).",
            "fred",
            "https://fred.stlouisfed.org/series/PPIACO",
          ],
          [
            "RES. OF DEP.",
            "Reserves of Depository Institutions (M) to GDP (Q).",
            "fred",
            "https://fred.stlouisfed.org/series/TOTRESNS",
          ],
          [
            "C.P./GDP",
            "Corporate Profits After Tax (Q) to GDP (Q).",
            "fred",
            "https://fred.stlouisfed.org/series/CP",
          ],
          [
            "INDUST. PROD.",
            "Industrial Production (M), index 2017=100.",
            "fred",
            "https://fred.stlouisfed.org/series/INDPRO",
          ],
          [
            "GDP WORLD",
            "(A) Growth rate of the global GDP year-over-year.",
            "fred",
            "https://fred.stlouisfed.org/series/NYGDPMKTPCDWLD",
          ],
          [
            "OIL",
            "WTI oil price (M).",
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
            "CPI (Q) year-over-year % change forecast.",
            "fed",
            "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting",
          ],
          [
            "Federal Effective Rate",
            "Chat GPT's text analysis of the latest article: Press Release (paragraphs 1-3) or Speech (paragraphs 3-5). -1 for a rate cut, 0 for no change, and 1 for a rate increase.",
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
