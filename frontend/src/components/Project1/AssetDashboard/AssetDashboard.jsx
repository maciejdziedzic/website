import { useState, useEffect } from "react";
import Button from "../../Button/Button";
import AssetChart from "../AssetChart/AssetChart";
import fetchData from "../../../utils/fetchData";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import useDarkMode from "../../../contexts/DarkMode/useDarkMode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./AssetDashboard.css";

const AssetDashboard = () => {
  const getCSSVariable = (variable) =>
    getComputedStyle(document.documentElement).getPropertyValue(variable);
  const [data, setData] = useState([]);
  const [enabledMetrics, setEnabledMetrics] = useState({
    gold_pct: true,
    house_pct: false,
    sp500_pct: false,
    bond10tr_pct: false,
  });
  const [dividends, setDividends] = useState({ enabled: false, value: 2.8 });
  const [rent, setRent] = useState({ enabled: false, value: 4 });
  const [isInflationAdjusted, setIsInflationAdjusted] = useState(false);
  const [yearRange, setYearRange] = useState([1927, 2023]);
  const [displayedData, setDisplayedData] = useState([]);
  const startYear = 1927;
  const endYear = 2023;
  const [cummulativePercentages, setCummulativePercentages] = useState({});
  const { darkMode } = useDarkMode();

  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          thumb: {
            height: 22,
            width: 22,
            backgroundColor: darkMode
              ? getCSSVariable("--text-color-dark")
              : getCSSVariable("--text-color-dark"),
            border: "1.4px solid #000",
            "&:hover": {
              boxShadow: "0 0 0 0px rgba(58, 133, 137, 0.8)",
            },
          },
          track: {
            height: 1.2,
            backgroundColor: darkMode
              ? getCSSVariable("--text-color-dark")
              : getCSSVariable("--text-color-light"),
          },
          rail: {
            backgroundColor: darkMode
              ? getCSSVariable("--text-color-dark")
              : getCSSVariable("--text-color-light"),
          },
          markLabel: {
            color: darkMode
              ? getCSSVariable("--text-color-dark")
              : getCSSVariable("--text-color-light"),
          },
          valueLabel: {
            background: `${darkMode ? "#737373" : "#fff"}`,
            top: -6,
            "& *": {
              background: `${darkMode ? "#737373" : "#fff"}`,
              color: darkMode
                ? getCSSVariable("--text-color-dark")
                : getCSSVariable("--text-color-light"),
            },
            "&:before": {
              display: "none",
            },
          },
        },
      },
    },
  });

  const renderCummulativePercentage = (label, metric) => {
    return (
      <div>
        {enabledMetrics[metric] ? (
          cummulativePercentages[metric] !== undefined &&
          cummulativePercentages[metric]?.toFixed(2) + "%"
        ) : (
          <span style={{ fontWeight: "700" }}>-</span>
        )}
      </div>
    );
  };

  const renderAverageAnnualPercentage = (metric) => {
    const numberOfYears = yearRange[1] - yearRange[0];
    if (numberOfYears <= 0 || !cummulativePercentages[metric]) {
      return "-";
    }
    const averageAnnualPercentage =
      cummulativePercentages[metric] / numberOfYears;
    return averageAnnualPercentage.toFixed(2) + "%";
  };

  const handleSliderChange = (event, newValue) => {
    setYearRange(newValue);
  };

  useEffect(() => {
    async function loadAndSetData() {
      const fileName = "dataproject1.csv";
      const rows = await fetchData(fileName);
      setData(rows);
    }
    loadAndSetData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const startIndex = data.length - (endYear - yearRange[0] + 1);
      const endIndex = data.length - (endYear - yearRange[1]);
      setDisplayedData(data.slice(startIndex, endIndex));
    }
  }, [data, yearRange]);

  const toggleMetric = (metric) => {
    setEnabledMetrics((prevMetrics) => {
      const currentlyEnabledMetrics =
        Object.values(prevMetrics).filter(Boolean);
      if (
        currentlyEnabledMetrics.length === 1 &&
        currentlyEnabledMetrics[0] === prevMetrics[metric]
      ) {
        return prevMetrics;
      }
      return {
        ...prevMetrics,
        [metric]: !prevMetrics[metric],
      };
    });
  };

  const toggleDividends = () =>
    setDividends((prev) => ({ ...prev, enabled: !prev.enabled }));
  // const handleDividendsChange = (e) => {
  //   let value = parseFloat(e.target.value);
  //   if (isNaN(value)) {
  //     value = 0;
  //   } else {
  //     value = Math.min(Math.max(value, 0), 10);
  //   }
  //   setDividends({ enabled: true, value: value });
  // };

  const toggleRent = () =>
    setRent((prev) => ({ ...prev, enabled: !prev.enabled }));
  const handleRentChange = (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) {
      value = 0;
    } else {
      value = Math.min(Math.max(value, 0), 10);
    }
    setRent({ enabled: true, value: value });
  };

  const toggleInflationAdjustment = () => {
    setIsInflationAdjusted((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <div className="asset-dashboard lg:flex lg:justify-center lg:space-x-8 mb-5">
        <div
          className={`left-section rounded shadow-md   ${
            darkMode ? "dark bg-neutral-700 " : "bg-stone-100  "
          }`}
        >
          <div className="left-section-items lg:scale-100">
            <div className="assets-returns">
              <div className="assets mb-8 md:-space-x-12 lg:space-x-0">
                <h1 className="h1-title ml-0.5 md:-ml-12 lg:ml-0 space-x-2">
                  Assets:
                </h1>
                <div className="-ml-0.5 md:ml-0">
                  <Button
                    variant="button1"
                    className=""
                    onClick={() => toggleMetric("gold_pct")}
                    label="GOLD"
                    active={enabledMetrics.gold_pct}
                  />
                  <div className="button-checkbox flex items-center lg:space-x-4">
                    <Button
                      variant="button1"
                      onClick={() => toggleMetric("house_pct")}
                      label="HOUSE"
                      active={enabledMetrics.house_pct}
                    />
                    <div className="rent-div space-x-2">
                      <label>
                        <input
                          type="checkbox"
                          checked={rent.enabled}
                          onChange={toggleRent}
                          disabled={!enabledMetrics.house_pct}
                          className="ml-2 lg:ml-0"
                        />
                        <span className="ml-0.5 text-sm">Rent (%)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={rent.value}
                        onChange={handleRentChange}
                        disabled={!rent.enabled || !enabledMetrics.house_pct}
                        className={`${
                          rent.enabled
                            ? darkMode
                              ? "bg-white text-black"
                              : "bg-white text-black"
                            : darkMode
                            ? "bg-gray-300 text-black"
                            : "bg-gray-200 text-black"
                        } `}
                      />
                    </div>
                  </div>
                  <div className="button-checkbox flex items-center lg:space-x-4">
                    <Button
                      variant="button1"
                      onClick={() => toggleMetric("sp500_pct")}
                      label="SP500"
                      active={enabledMetrics.sp500_pct}
                    />
                    <div className="rent-div space-x-2">
                      <label className="lg:ml-0 ml-2">
                        <input
                          type="checkbox"
                          checked={dividends.enabled}
                          onChange={toggleDividends}
                          disabled={!enabledMetrics.sp500_pct}
                          className=""
                        />
                        <span className="ml-0.5 text-sm ">
                          Dividend Yield Reinvs.
                        </span>
                      </label>
                      {/* <input
                        type="number"
                        min="0"
                        max="10"
                        value={dividends.value}
                        onChange={handleDividendsChange}
                        disabled={
                          !dividends.enabled || !enabledMetrics.sp500_pct
                        }
                        className={`${
                          dividends.enabled
                            ? darkMode
                              ? "bg-white text-black"
                              : "bg-white text-black"
                            : darkMode
                            ? "bg-gray-300 text-black"
                            : "bg-gray-200 text-black"
                        } `}
                      /> */}
                    </div>
                  </div>
                  <Button
                    variant="button1"
                    onClick={() => toggleMetric("bond10tr_pct")}
                    label="BONDS10Y"
                    active={enabledMetrics.bond10tr_pct}
                  />
                </div>
              </div>

              {/* Return Section */}
              <div className="returns-settings mb-8 flex justify-between space-x-6 lg:space-x-0 mr-2 ml-0.5 md:ml-0 md:mr-0">
                <div className="cumulative">
                  <h1 className="h1-title h1-return">Cumulative Returns:</h1>
                  <div className="space-y-2.5 button-txt ml-0.5 ">
                    <div className="flex space-x-3">
                      <div className="l-gold h-8 w-1"></div>
                      <span className="text-lg">
                        {renderCummulativePercentage("Gold", "gold_pct")}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="l-house h-8 w-1 "></div>
                      <span className="text-lg">
                        {renderCummulativePercentage("House", "house_pct")}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="l-sp500 h-8 w-1 "></div>
                      <span className="text-lg">
                        {renderCummulativePercentage("SP500", "sp500_pct")}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="l-bonds h-8 w-1"></div>
                      <span className="text-lg">
                        {renderCummulativePercentage("BONDS", "bond10tr_pct")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="average flex-col">
                  <h1 className="h1-title h1-return">Average:</h1>
                  <div className="space-y-2.5 button-txt ml-0.5">
                    <div className="flex space-x-3">
                      <div className="l-gold h-8 w-1 "></div>
                      <span className="text-lg">
                        {renderAverageAnnualPercentage("gold_pct")}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="l-house h-8 w-1 "></div>
                      <span className="text-lg">
                        {renderAverageAnnualPercentage("house_pct")}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="l-sp500 h-8 w-1 "></div>
                      <span className="text-lg">
                        {renderAverageAnnualPercentage("sp500_pct")}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="l-bonds h-8 w-1 	"></div>
                      <span className="text-lg">
                        {renderAverageAnnualPercentage("bond10tr_pct")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Section */}
              <div className="returns-settings ml-0.5">
                <h2 className="h1-title">Settings:</h2>
                <div className="">
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={isInflationAdjusted}
                        onChange={toggleInflationAdjustment}
                      />
                      <span className="ml-0.5">Inflation Adjusted</span>
                    </label>
                  </div>

                  {/* Slider */}
                  <div className="slider-chart ">
                    <Box sx={{ width: 240, margin: "0.6rem" }}>
                      <ThemeProvider theme={theme}>
                        <Slider
                          size="small"
                          value={yearRange}
                          onChange={handleSliderChange}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"
                          getAriaValueText={(value) => `${value}`}
                          min={startYear}
                          max={2023}
                          marks={[
                            { value: startYear, label: "1927" },
                            { value: endYear, label: "2023" },
                          ]}
                        />
                      </ThemeProvider>
                    </Box>
                  </div>
                </div>
                {/* Returns-Settings div */}
              </div>
            </div>
          </div>
        </div>

        <div className="right-section flex lg:w-[72.5%] 2xl:w-[80%] m-5 lg:m-0 ">
          <div className="chart-container">
            <AssetChart
              data={displayedData}
              enabledMetrics={enabledMetrics}
              dividends={dividends}
              rent={rent}
              inflationAdjusted={isInflationAdjusted}
              options={{ maintainAspectRatio: false }}
              setCummulativePercentages={setCummulativePercentages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDashboard;
