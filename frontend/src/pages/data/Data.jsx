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
            "Gold (XAUUSD)",
            "Annual growth of gold prices.",
            "stooq.pl",
            "https://stooq.pl",
          ],
          [
            "House Prices (MSPUS)",
            "Median Sales Price of Houses Sold for the United States (Annual growth).",
            "FRED",
            "https://fred.stlouisfed.org/series/MSPUS",
          ],
          [
            "S&P 500 Index (SPX)",
            "Annual growth based on the closing price comparison between the last days of consecutive years.",
            "stooq.pl",
            "https://stooq.pl",
          ],
          [
            "10-Year U.S. Treasury Bonds (DGS10)",
            "Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (Annual data).",
            "FRED",
            "https://fred.stlouisfed.org/series/DGS10",
          ],
          [
            "Inflation (CPIAUCSL)",
            "Annual Consumer Price Index (CPI) growth.",
            "FRED",
            "https://fred.stlouisfed.org/series/CPIAUCSL",
          ],
        ]}
      />

      <ProjectSection
        title="Macroeconomic Chart"
        rows={[
          [
            "FED RATE (Federal Effective Rate)",
            "Federal Effective Rate used by the Federal Reserve to influence economic conditions.",
            "Placeholder Link",
          ],
          [
            "IYC (Inverted Yield Curve)",
            "Represents an Inverted Yield Curve, which can be an indicator of economic recessions. Bonds10TR - Bonds2TR",
            "Placeholder Link",
          ],
          [
            "DEBT/GDP (Debt to Gross Domestic Product Ratio)",
            "The ratio of a country's debt compared to its Gross Domestic Product.",
            "Placeholder Link",
          ],
          ["US GDP", "US Gross Domestic Product Growth.", "Placeholder Link"],
          [
            "GDP WORLD (Global Gross Domestic Product Growth)",
            "Growth rate of the global Gross Domestic Product.",
            "Placeholder Link",
          ],
          [
            "CB. ASST./GDP (Central Bank Assets to GDP Ratio)",
            "The ratio of Central Bank Assets compared to Gross Domestic Product.",
            "Placeholder Link",
          ],
          [
            "M3/GDP (Broad Money Supply (M3) to GDP Ratio)",
            "The ratio of Broad Money Supply (M3) compared to Gross Domestic Product.",
            "Placeholder Link",
          ],
          [
            "UNEMPL (Unemployment Rate)",
            "Represents the Unemployment Rate.",
            "Placeholder Link",
          ],
          [
            "CPI (Consumer Price Index Percentage)",
            "Measures the average change over time in the prices paid by consumers for a market basket of consumer goods and services.",
            "Placeholder Link",
          ],
          [
            "PPI (Producer Price Index Percentage)",
            "Measures the average change over time in the selling prices received by domestic producers for their output.",
            "Placeholder Link",
          ],
          [
            "RES. OF DEP. (Reserves of Depository Institutions)",
            "The amount of funds institutions have in reserve to manage day-to-day operations.",
            "Placeholder Link",
          ],
          [
            "OIL (Crude Oil Prices)",
            "Represents the prices of Crude Oil.",
            "Placeholder Link",
          ],
          [
            "INDUST. PROD. (Industrial Production Index)",
            "An index used to measure and view the overall value of production in an economy.",
            "Placeholder Link",
          ],
          [
            "CORP. PROF. (Corporate Profits)",
            "Refers to the profit that a company makes.",
            "Placeholder Link",
          ],
        ]}
      />

      <ProjectSection
        title="Recession Model"
        rows={[
          [
            "CPI (Consumer Price Index Percentage)",
            "Measures the average change over time in the prices paid by consumers for a market basket of consumer goods and services.",
            "Placeholder Link",
          ],
          [
            "PPI (Producer Price Index Percentage)",
            "Measures the average change over time in the selling prices received by domestic producers for their output.",
            "Placeholder Link",
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
