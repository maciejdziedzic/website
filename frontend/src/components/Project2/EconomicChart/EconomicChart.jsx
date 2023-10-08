import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Labels } from "../Labels/Labels";

const EconomicChart = ({ data, activeSeries }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!data.length || !Object.keys(activeSeries).length) return;

    const getActiveSeriesKeys = () =>
      Object.keys(activeSeries).filter((key) => activeSeries[key]);

    const getMaxMinValues = (keys) => {
      const values = data
        .flatMap((item) => keys.map((key) => item[key]))
        .filter((value) => value !== null && value !== "");
      return { min: Math.min(...values), max: Math.max(...values) };
    };

    const activeSeriesKeys = getActiveSeriesKeys();
    const housePerWageValues = getMaxMinValues(["house_per_wage"]);
    const percentDataValues = getMaxMinValues(
      activeSeriesKeys.filter((key) => key !== "house_per_wage")
    );

    const options = {
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
          },
        },
        y1: {
          type: "linear",
          position: "left",
          min: activeSeries.house_per_wage
            ? housePerWageValues.min
            : percentDataValues.min,
          max: activeSeries.house_per_wage
            ? housePerWageValues.max
            : percentDataValues.max,
        },
        y2: {
          type: "linear",
          position: "right",
          min: percentDataValues.min,
          max: percentDataValues.max,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function () {
              return "";
            },
            label: function (tooltipItem) {
              const datasetLabel = tooltipItem.dataset.label;
              const friendlyLabel = Labels[datasetLabel] || datasetLabel;
              const date = new Date(tooltipItem.parsed.x);
              return `${friendlyLabel}: ${
                tooltipItem.parsed.y
              }, ${date.getFullYear()}`;
            },
          },
        },
      },
    };

    const newData = {
      labels: data.map((item) => item.date),
      datasets: activeSeriesKeys.map((key) => ({
        label: Labels[key].label, // Correctly access the label property
        backgroundColor: Labels[key].color, // setting the color here
        data: data.map((item) =>
          item[key] === null || item[key] === "" ? NaN : item[key]
        ),
        fill: false,
        yAxisID: key === "house_per_wage" ? "y1" : "y2",
      })),
    };

    setChartData({ data: newData, options });
  }, [data, activeSeries]);

  if (!chartData) {
    return null;
  }

  return (
    <Chart type="line" data={chartData.data} options={chartData.options} />
  );
};

EconomicChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      house_per_wage: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null]),
      ]),
    })
  ).isRequired,
  activeSeries: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default EconomicChart;
