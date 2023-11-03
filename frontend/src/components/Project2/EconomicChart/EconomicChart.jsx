import { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Labels } from "../Labels/Labels";
import useDarkMode from "../../../contexts/DarkMode/useDarkMode";

const EconomicChart = ({ data, activeSeries }) => {
  const getCSSVariable = (variable) =>
    getComputedStyle(document.documentElement).getPropertyValue(variable);
  const [chartData, setChartData] = useState(null);
  const { darkMode } = useDarkMode();

  function getTooltipLabel(datasetLabel) {
    let key = Object.keys(Labels).find((k) => Labels[k].label === datasetLabel);
    return (Labels[key] && Labels[key].tooltipLabel) || datasetLabel;
  }

  useEffect(() => {
    if (!data.length || !Object.keys(activeSeries).length) return;

    const getActiveSeriesKeys = () =>
      Object.keys(activeSeries).filter((key) => activeSeries[key]);

    const activeSeriesKeys = getActiveSeriesKeys();

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
                case "FED RATE":
                  unit = "%";
                  break;
                case "IYC":
                  unit = "%";
                  break;
                case "US GDP":
                  unit = "%";
                  break;
                case "GDP WORLD":
                  unit = "%";
                  break;
                case "DEBT/GDP":
                  unit = "%";
                  break;
                case "CB. ASST./GDP":
                  unit = "%";
                  break;
                case "M3/GDP":
                  unit = "%";
                  break;
                case "UNEMPL":
                  unit = "%";
                  break;
                case "CPI":
                  unit = "%";
                  break;
                case "PPI":
                  unit = "%";
                  break;
                case "RES./GDP":
                  unit = "%";
                  break;
                case "C.P./GDP":
                  unit = "%";
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

        borderWidth: 0.8,
        pointRadius: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 4.5,
      })),
    };

    setChartData({ data: newData, options });
  }, [data, activeSeries, darkMode]);

  if (!chartData) {
    return null;
  }

  return (
    <div className="chart">
      <Chart type="line" data={chartData.data} options={chartData.options} />
    </div>
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
