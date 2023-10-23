import PropTypes from "prop-types";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";

function Data() {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`mt-10 space-y-10 ${
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
            "https://stooq.pl",
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
            "https://stooq.pl",
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
            "FED RATE",
            "Federal Effective Rate used by the Federal Reserve to influence economic conditions.",
            "fred",
            "https://fred.stlouisfed.org/series/FEDFUNDS",
          ],
          [
            "IYC",
            <>
              Inverted Yield Curve. Can be an indicator of economic recessions.
              Calculated as Bonds10TR - Bonds2TR. FED published a{" "}
              <a
                href="https://www.federalreserve.gov/econres/feds/files/2018055pap.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                paper
              </a>{" "}
              in which considers the Near Term Forward Yield Spread as a better
              indicator.
            </>,
            "fred",
            "https://fred.stlouisfed.org/series/T10Y2Y",
          ],
          [
            "GDP WORLD",
            "Growth rate of the global Gross Domestic Product.",
            "fred",
            "https://fred.stlouisfed.org/series/NYGDPMKTPCDWLD",
          ],
          [
            "US GDP",
            "US Gross Domestic Product Growth.",
            "fred",
            "https://fred.stlouisfed.org/series/GDP",
          ],
          [
            "DEBT/GDP",
            "The ratio of a country's debt compared to its Gross Domestic Product.",
            "fred",
            "https://fred.stlouisfed.org/series/GFDEBTN",
          ],
          [
            "CB. ASST./GDP",
            "The ratio of Central Bank Assets compared to Gross Domestic Product.",
            "fred",
            "https://fred.stlouisfed.org/series/DDDI06USA156NWDB",
          ],
          [
            "M3/GDP",
            "The ratio of Broad Money Supply (M3) compared to Gross Domestic Product.",
            "fred",
            "https://fred.stlouisfed.org/series/MABMM301USM189S",
          ],
          [
            "UNEMPL",
            "Represents the Unemployment Rate.",
            "fred",
            "https://fred.stlouisfed.org/series/UNRATE",
          ],
          [
            "CPI",
            "Consumer Price Index Percentage. Measures the average change over time in the prices paid by consumers for a market basket of consumer goods and services.",
            "fred",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
          [
            "PPI",
            "Producer Price Index. Measures the average change over time in the selling prices received by domestic producers for their output.",
            "fred",
            "https://fred.stlouisfed.org/series/PPIACO",
          ],
          [
            "RES. OF DEP.",
            "The amount of funds institutions have in reserve to manage day-to-day operations.",
            "fred",
            "https://fred.stlouisfed.org/series/TOTRESNS",
          ],
          [
            "OIL",
            "WTI oil price.",
            "fred",
            "https://fred.stlouisfed.org/series/WTISPLC",
          ],
          [
            "INDUST. PROD.",
            "An index used to measure and view the overall value of production in an economy.",
            "fred",
            "https://fred.stlouisfed.org/series/INDPRO",
          ],
          [
            "CORP. PROF.",
            "Corporate Profits After Tax",
            "fred",
            "https://fred.stlouisfed.org/series/CP",
          ],
        ]}
      />

      <ProjectSection
        title="Recession Model"
        rows={[
          [
            "CPI",
            "Measures the average change over time in the prices paid by consumers for a market basket of consumer goods and services.",
            "fred",
            "https://fred.stlouisfed.org/series/DGS10",
          ],
          [
            "PPI",
            "Measures the average change over time in the selling prices received by domestic producers for their output.",
            "fred",
            "https://fred.stlouisfed.org/series/DGS10",
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
