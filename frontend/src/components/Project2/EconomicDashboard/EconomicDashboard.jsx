import EconomicChart from "../EconomicChart/EconomicChart";
import Button from "../../Button/Button";
import { useState, useEffect } from "react";
import { Labels } from "../Labels/Labels";
import useDarkMode from "../../../contexts/DarkMode/useDarkMode";

const seriesLabels = Object.keys(Labels);
const EconomicDashboard = () => {
  const [data, setData] = useState([]);
  const [activeSeries, setActiveSeries] = useState(
    seriesLabels.reduce(
      (acc, label) => ({ ...acc, [label]: label === "house_wages" }),
      {}
    )
  );

  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchAndSetData = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        // Fetch data from your Flask API
        const response = await fetch(`${apiBaseUrl}/api/get_data`);
        const fetchedData = await response.json();

        setData(fetchedData);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      }
    };

    fetchAndSetData();
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
  const getFilteredData = () => {
    // Step 1: Filter the data based on the active series
    const filteredData = data.filter((row) =>
      seriesLabels.some((label) => activeSeries[label] && row[label] != null)
    );

    // Step 2: Calculate the minimum start date
    const startDate = filteredData.reduce((minDate, row) => {
      const rowDate = new Date(row.date);
      return rowDate < minDate ? rowDate : minDate;
    }, new Date(filteredData[0]?.date));

    // Step 3: Filter rows before the start date
    return filteredData.filter((row) => new Date(row.date) >= startDate);
  };

  const filteredData = getFilteredData();
  return (
    <div>
      <div className="lg:flex lg:ml-12 lg:space-x-6">
        <div className="left-section button-box lg:flex-col text-xs lg:w-[22.5%] lg:flex">
          <div
            className={`button-box scale-90 xl:scale-100  rounded shadow-xl  ${
              darkMode ? "dark " : " "
            } `}
          >
            {seriesLabels.map((label) => (
              <Button
                variant="button2"
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
        </div>

        <div
          className="right-section mr-2 ml-2 lg:w-[72.5%] 2xl:w-[250%]"
          style={{
            backgroundColor: darkMode
              ? "rgb(163 163 163 / var(--tw-bg-opacity))"
              : "white",
          }}
        >
          <EconomicChart data={filteredData} activeSeries={activeSeries} />
        </div>
      </div>
    </div>
  );
};

export default EconomicDashboard;
