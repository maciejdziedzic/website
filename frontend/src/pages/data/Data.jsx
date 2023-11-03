import { useState } from "react";
import PropTypes from "prop-types";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";
import { assetsReturnData } from "./Text";
import { macroChartData } from "./Text";
import { fedPolicyModelData } from "./Text";

function Data() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`space-y-5 p-5 ${darkMode ? "" : " "}`}>
      <CollapsibleProjectSection
        title={assetsReturnData.title}
        headers={assetsReturnData.headers}
        rows={assetsReturnData.rows}
      />

      <CollapsibleProjectSection
        title={macroChartData.title}
        headers={macroChartData.headers}
        rows={macroChartData.rows}
      />

      <CollapsibleProjectSection
        title={fedPolicyModelData.title}
        firstSectionTitle="Logistic Regression Model"
        firstHeaders={fedPolicyModelData.firstHeaders}
        firstRows={fedPolicyModelData.firstRows}
        secondSectionTitle="LLM Text Interpretation"
        secondHeaders={fedPolicyModelData.secondHeaders}
        secondRows={fedPolicyModelData.secondRows}
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
  const { darkMode } = useDarkMode();

  return (
    <section className=" rounded-sm overflow-hidden shadow-sm">
      <div
        className={`flex justify-between items-center p- ${
          darkMode ? "bg-zinc-700" : ""
        }`}
      >
        <h1 className="flex justify-center itemst-center font-extralight ml-24 ">
          {title}
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-24 px-8 h-5 text-xs items-center flex bg-zinc-500  rounded hover:bg-zinc-600 transition duration-300"
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
  const { darkMode } = useDarkMode();
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={`py-3 px-4 border-b ${
                darkMode ? "bg-neutral-500" : " bg-gray-200"
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-neutral-500">
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
