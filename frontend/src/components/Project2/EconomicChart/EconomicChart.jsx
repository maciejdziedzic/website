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

    function getTooltipLabel(datasetLabel) {
      let key = Object.keys(Labels).find(
        (k) => Labels[k].label === datasetLabel
      );
      return (Labels[key] && Labels[key].tooltipLabel) || datasetLabel;
    }

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
          mode: "nearest",
          intersect: false,
          axis: "x",
          caretPadding: 10, // Add this line for padding
          callbacks: {
            title: function () {
              return "";
            },
            label: function (tooltipItem) {
              const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const datasetLabel = tooltipItem.dataset.label;
              const friendlyLabel = getTooltipLabel(datasetLabel);
              const date = new Date(tooltipItem.parsed.x);
              const formattedDate = `${
                monthNames[date.getMonth()]
              } ${date.getFullYear()}`;

              const value = tooltipItem.parsed.y;
              let unit = "";
              switch (datasetLabel) {
                case "OIL":
                  unit = "$";
                  break;
                case "CORP. PROF.":
                  unit = "Billion $";
                  break;
                case "house_wages":
                  unit = "Months";
                  break;
              }
              return `${friendlyLabel}: ${value} ${unit}, ${formattedDate}`;
            },
          },
        },
      },
      hover: {
        mode: "index",
        intersect: false,
      },
    };

    const newData = {
      labels: data.map((item) => new Date(item.date)),
      datasets: activeSeriesKeys.map((key) => ({
        label: Labels[key].label,
        backgroundColor: Labels[key].color, // setting the background color for points
        borderColor: Labels[key].color, // setting the color for the line
        data: data.map((item) =>
          item[key] === null || item[key] === "" ? NaN : item[key]
        ),
        fill: false,
        yAxisID: key === "house_per_wage" ? "y1" : "y2",
        borderWidth: 0.8,
        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 4.5,
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
