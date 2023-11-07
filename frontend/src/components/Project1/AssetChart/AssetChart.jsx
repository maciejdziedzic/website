import PropTypes from "prop-types";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { useState, useEffect } from "react";
import * as dateFnsAdapter from "chartjs-adapter-date-fns";
import useDarkMode from "../../../contexts/DarkMode/useDarkMode";

ChartJS.register(...registerables, dateFnsAdapter);

const getCSSVariable = (variable) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable);

const COLORS = {
  gold_pct: "rgb(234 179 8)",
  house_pct: "rgb(190 18 60)",
  sp500_pct: "rgb(29 78 216)",
  bond10tr_pct: "rgb(21 128 61)",
};

const METRIC_LABELS = {
  gold_pct: "Gold",
  house_pct: "House",
  sp500_pct: "SP500",
  bond10tr_pct: "BONDS10Y",
};

const applyAdjustment = (originalValue, adjustment) =>
  originalValue + Number(adjustment);

const adjustForDividendsAndRent = (data, dividends, rent) => {
  let modifiedData = [...data];

  if (dividends.enabled) {
    modifiedData = modifiedData.map((item) => ({
      ...item,
      sp500_pct: applyAdjustment(Number(item.sp500_pct), dividends.value),
    }));
  }
  if (rent.enabled) {
    modifiedData = modifiedData.map((item) => ({
      ...item,
      house_pct: applyAdjustment(Number(item.house_pct), rent.value),
    }));
  }

  return modifiedData;
};

const adjustForInflation = (data, enabledMetrics, inflationAdjusted) => {
  if (!inflationAdjusted) return data;

  return data.map((item) => {
    let updatedItem = { ...item };
    Object.keys(enabledMetrics).forEach((metric) => {
      if (enabledMetrics[metric] && item[metric] && item.inflation_pct) {
        updatedItem[metric] =
          ((1 + Number(item[metric]) / 100) /
            (1 + Number(item.inflation_pct) / 100) -
            1) *
          100;
      }
    });
    return updatedItem;
  });
};

const AssetChart = ({
  data,
  enabledMetrics,
  dividends,
  rent,
  inflationAdjusted,
  setCummulativePercentages,
}) => {
  const [finalChartData, setFinalChartData] = useState({});
  const { darkMode } = useDarkMode();

  const chartOptions = () => ({
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
          displayFormats: {
            year: "yyyy",
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          color: darkMode
            ? getCSSVariable("--text-color-dark")
            : getCSSVariable("--text-color-light"),
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: darkMode
            ? getCSSVariable("--text-color-dark")
            : getCSSVariable("--text-color-light"),
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode
            ? getCSSVariable("--text-color-dark")
            : getCSSVariable("--text-color-light"),
        },
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (tooltipItem) => {
            const date = new Date(tooltipItem.parsed.x);
            let label = tooltipItem.dataset.label;
            label = label.replace(" (%)", "");
            const value = tooltipItem.parsed.y.toFixed(2);
            return `${label}: ${value}%, ${date.getFullYear()}`;
          },
        },
      },
    },
  });

  useEffect(() => {
    let modifiedData = adjustForDividendsAndRent(data, dividends, rent);
    modifiedData = adjustForInflation(
      modifiedData,
      enabledMetrics,
      inflationAdjusted
    );

    const calculateCummulativePercentage = (metricName) => {
      const growthFactors = modifiedData.map(
        (item) => 1 + Number(item[metricName]) / 100
      );
      const cumValue = growthFactors.reduce((acc, curr) => acc * curr, 1);
      return (cumValue - 1) * 100;
    };

    let newCummulativePercentages = {};

    if (enabledMetrics.gold_pct) {
      newCummulativePercentages.gold_pct =
        calculateCummulativePercentage("gold_pct");
    }

    if (enabledMetrics.sp500_pct) {
      newCummulativePercentages.sp500_pct =
        calculateCummulativePercentage("sp500_pct");
    }

    if (enabledMetrics.house_pct) {
      newCummulativePercentages.house_pct =
        calculateCummulativePercentage("house_pct");
    }

    if (enabledMetrics.bond10tr_pct) {
      newCummulativePercentages.bond10tr_pct =
        calculateCummulativePercentage("bond10tr_pct");
    }

    const chartData = {
      labels: modifiedData.map((item) => item.date),
      datasets: Object.keys(enabledMetrics)
        .filter((metric) => enabledMetrics[metric])
        .map((metric) => ({
          label: METRIC_LABELS[metric],
          data: modifiedData.map((item) => item[metric]),
          fill: false,
          backgroundColor: COLORS[metric],
        })),
    };

    setCummulativePercentages(newCummulativePercentages);
    setFinalChartData(chartData);
  }, [
    data,
    enabledMetrics,
    dividends,
    rent,
    inflationAdjusted,
    setCummulativePercentages,
  ]);

  return (
    <div className="chart">
      {finalChartData.labels && finalChartData.datasets && (
        <Chart type="bar" data={finalChartData} options={chartOptions()} />
      )}
    </div>
  );
};

AssetChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  enabledMetrics: PropTypes.objectOf(PropTypes.bool).isRequired,
  dividends: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  rent: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  inflationAdjusted: PropTypes.bool.isRequired,
  setCummulativePercentages: PropTypes.func.isRequired,
};

AssetChart.defaultProps = {
  dividends: {
    enabled: true,
    value: 2.8,
  },
  rent: {
    enabled: false,
    value: 4,
  },
};

export default AssetChart;
