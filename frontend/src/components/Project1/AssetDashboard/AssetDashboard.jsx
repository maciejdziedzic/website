import { useState, useEffect } from "react";
import Button1 from "../AssetButton/AssetButton";
import AssetChart from "../AssetChart/AssetChart";
import fetchData from "../../../utils/fetchData";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import useDarkMode from "../../../contexts/DarkMode/useDarkMode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./AssetDashboard.css";

const AssetDashboard = () => {
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
  const [yearRange, setYearRange] = useState([1970, 2022]);
  const [displayedData, setDisplayedData] = useState([]);
  const startYear = 1970;
  const endYear = 2022;
  const [cummulativePercentages, setCummulativePercentages] = useState({});
  const { darkMode } = useDarkMode();

  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          thumb: {
            height: 22,
            width: 22,
            backgroundColor: "#fff",
            border: "1.4px solid #000",
            "&:hover": {
              boxShadow: "0 0 0 0px rgba(58, 133, 137, 0.8)",
            },
          },
          track: {
            height: 1.2,
            backgroundColor: `${darkMode ? "#e2e2e2" : "#000000"}`, // Your existing color for the track (axis)
          },
          rail: {
            backgroundColor: `${darkMode ? "#000000" : "#e5e7eb"}`,
          },
          markLabel: {
            color: `${darkMode ? "#fff" : "#000000"}`,
          },
          valueLabel: {
            background: `${darkMode ? "#737373" : "#fff"}`,
            top: -6,
            "& *": {
              background: `${darkMode ? "#737373" : "#fff"}`,
              color: `${darkMode ? "#fff" : "#000"}`,
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

  const handleSliderChange = (event, newValue) => {
    setYearRange(newValue);
  };

  useEffect(() => {
    async function loadAndSetData() {
      const rows = await fetchData();
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
  const handleDividendsChange = (e) =>
    setDividends({ enabled: true, value: parseFloat(e.target.value) });
  const toggleRent = () =>
    setRent((prev) => ({ ...prev, enabled: !prev.enabled }));
  const handleRentChange = (e) =>
    setRent({ enabled: true, value: parseFloat(e.target.value) });
  const toggleInflationAdjustment = () => {
    setIsInflationAdjusted((prev) => !prev);
  };

  return (
    <div className="asset-dashboard flex justify-center space-x-10">
      <div className="left-section bg-slate-600 bg-opacity-10 rounded flex justify-center items-center">
        <div className=" scale-90">
          {/* Assets Section */}
          <div className=" mb-8">
            <h1 className="h1-title">Assets:</h1>
            <div className="">
              <Button1
                className=""
                onClick={() => toggleMetric("gold_pct")}
                label="GOLD"
                active={enabledMetrics.gold_pct}
              />
              <div className="button-checkbox flex items-center lg:space-x-4">
                <Button1
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
                    <span className="ml-0.5">Rent (%)</span>
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
                        ? darkMode === "dark"
                          ? "bg-white text-black"
                          : "bg-white text-black"
                        : darkMode === "dark"
                        ? "bg-gray-300 text-black"
                        : "bg-gray-200 text-black"
                    } `}
                  />
                </div>
              </div>

              <div className="button-checkbox flex items-center lg:space-x-4">
                <Button1
                  onClick={() => toggleMetric("sp500_pct")}
                  label="SP500"
                  active={enabledMetrics.sp500_pct}
                />
                <div className="rent-div space-x-2">
                  <label>
                    <input
                      type="checkbox"
                      checked={dividends.enabled}
                      onChange={toggleDividends}
                      disabled={!enabledMetrics.sp500_pct}
                      className=""
                    />
                    <span className="ml-0.5">Dividends (%)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={dividends.value}
                    onChange={handleDividendsChange}
                    disabled={!dividends.enabled || !enabledMetrics.sp500_pct}
                    className={`${
                      dividends.enabled
                        ? darkMode === "dark"
                          ? "bg-white text-black"
                          : "bg-white text-black"
                        : darkMode === "dark"
                        ? "bg-gray-300 text-black"
                        : "bg-gray-200 text-black"
                    } `}
                  />
                </div>
              </div>
            </div>
            <Button1
              onClick={() => toggleMetric("bond10tr_pct")}
              label="BONDS10"
              active={enabledMetrics.bond10tr_pct}
            />
          </div>

          {/* Return Section */}
          <div className="stats mb-8">
            <h1 className="h1-title">Returns:</h1>
            <div className="space-y-2.5 button-txt">
              <div className="flex space-x-3">
                <div className="h-6 w-1 bg-yellow-500"></div>
                <span className="text-l">
                  {renderCummulativePercentage("Gold", "gold_pct")}
                </span>
              </div>
              <div className="flex space-x-3">
                <div className="h-6 w-1 bg-zinc-500"></div>
                <span className="text-l">
                  {renderCummulativePercentage("House", "house_pct")}
                </span>
              </div>
              <div className="flex space-x-3">
                <div className="h-6 w-1 bg-blue-500"></div>
                <span className="text-l">
                  {renderCummulativePercentage("SP500", "sp500_pct")}
                </span>
              </div>
              <div className="flex space-x-3">
                <div className="h-6 w-1 bg-yellow-900	"></div>
                <span className="text-l">
                  {renderCummulativePercentage("BONDS", "bond10tr_pct")}
                </span>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div>
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
                      max={2022}
                      marks={[
                        { value: startYear, label: "1970" },
                        { value: endYear, label: "2022" },
                      ]}
                    />
                  </ThemeProvider>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-section justify-center items-center flex bg-inherit">
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
  );
};

export default AssetDashboard;
