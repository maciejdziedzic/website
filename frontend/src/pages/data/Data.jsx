import { useState } from "react";
import PropTypes from "prop-types";
import "./Data.css";

// Your data import statements would go here
import { assetsReturnData, macroChartData, fedPolicyModelData } from "./Text";

function Data() {
  return (
    <div className="data-container mt-8">
      <h1 className="flex justify-center text-3xl font-semibold items-center mb-8">
        Data
      </h1>
      <CollapsibleProjectSection data={assetsReturnData} />
      <CollapsibleProjectSection data={macroChartData} />
      <CollapsibleProjectSection data={fedPolicyModelData} />
    </div>
  );
}

function CollapsibleProjectSection({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="collapsible-section mt-2">
      <header
        className="section-header ml-5 mr-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="section-title ml-5">{data.title}</h1>
        <span className="collapse-expand-icon mr-5">{isOpen ? "-" : "+"}</span>
      </header>
      {isOpen && <TableComponent headers={data.headers} rows={data.rows} />}
    </section>
  );
}

function TableComponent({ headers, rows }) {
  return (
    <div className="table mr-5">
      <div className="table-header">
        {headers.map((header, index) => (
          <div key={index} className="table-header-cell">
            {header}
          </div>
        ))}
      </div>
      <div className="table-body">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="table-row">
            {row.slice(0, -2).map((cell, cellIndex) => (
              <div key={cellIndex} className="table-cell">
                {cell}
              </div>
            ))}
            <div className="table-cell">
              <a
                href={row[row.length - 1]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row[row.length - 2]}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PropType validation
CollapsibleProjectSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(PropTypes.string.isRequired),
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)),
  }).isRequired,
};

TableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
};

export default Data;
