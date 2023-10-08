import fetchData from "../../../utils/fetchData";
import EconomicChart from "../EconomicChart/EconomicChart";
import Button2 from "../Button2/Button2";
import { useState, useEffect } from "react";
import { Labels } from "../Labels/Labels";
import useDarkMode from "../../../contexts/DarkMode/useDarkMode";

const seriesLabels = Object.keys(Labels);
const EconomicDashboard = () => {
  const [data, setData] = useState([]);
  const [activeSeries, setActiveSeries] = useState(
    seriesLabels.reduce(
      (acc, label) => ({ ...acc, [label]: label === "house_per_wage" }),
      {}
    )
  );
  const { darkMode } = useDarkMode();
  useEffect(() => {
    const loadAndSetData = async () => {
      const fileName = "dataProject2.csv";
      const rows = await fetchData(fileName);
      const modifiedRows = rows.map((row) => ({
        ...row,
        house_per_wage: row.house_per_wage
          ? parseFloat(row.house_per_wage)
          : null,
      }));
      setData(modifiedRows);
    };

    loadAndSetData();
  }, []);

  const toggleSeries = (label) => {
    setActiveSeries((prev) => {
      const currentlyActiveCount = Object.values(prev).filter(Boolean).length;
      const targetState = !prev[label];

      if (targetState && currentlyActiveCount >= 4) {
        return prev;
      }

      if (!targetState && currentlyActiveCount <= 1) {
        return prev;
      }

      return { ...prev, [label]: targetState };
    });
  };

  return (
    <div className="box">
      <div className="button-box flex text-xs justify-center">
        {seriesLabels.map((label) => (
          <Button2
            key={label}
            label={Labels[label].label}
            onClick={() => toggleSeries(label)}
            active={activeSeries[label]}
            style={{ backgroundColor: Labels[label].color }}
            disabled={
              Object.values(activeSeries).filter(Boolean).length >= 4 &&
              !activeSeries[label]
            }
          />
        ))}
      </div>

      <div
        className="scale-95"
        style={{ backgroundColor: darkMode ? "#d1d5db" : "white" }}
      >
        <EconomicChart data={data} activeSeries={activeSeries} />
      </div>
    </div>
  );
};

export default EconomicDashboard;
