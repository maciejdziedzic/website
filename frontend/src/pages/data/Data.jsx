import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataContent from "./DataContent";
import { assetsReturnData, macroChartData, fedPolicyModelData } from "./Text";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";
import "./Data.css";

const Data = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className="md:mr-5 md:ml-5 md:p-8 p-2 mt-6 md:-mt-2 mb-3">
      <h1 className="text-3xl font-bold mb-10 flex justify-center">
        Project&apos;s Data
      </h1>
      <Accordion
        sx={{
          bgcolor: darkMode ? "rgb(82 82 82);" : "rgb(255, 255, 255)",
          color: darkMode
            ? "var(--text-color-dark)"
            : "var(--text-color-light)",

          "& > *": {
            borderBottom: "unset",
            "&:last-child": { paddingRight: "10px" },
            "&:first-child": { paddingLeft: "10px" },
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: darkMode
                  ? "var(--text-color-dark)"
                  : "var(--text-color-light)",
              }}
            />
          }
        >
          <div className="p-5 text-lg font-bold">Assets Return</div>
        </AccordionSummary>
        <AccordionDetails
          className={`accordion-details ${darkMode ? "dark" : ""}`}
        >
          <DataContent data={assetsReturnData} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          bgcolor: darkMode ? "rgb(82 82 82);" : "rgb(255, 255, 255)",
          "& > *": {
            borderBottom: "unset",
            "&:last-child": { paddingRight: "10px" },
            "&:first-child": { paddingLeft: "10px" },
            color: darkMode
              ? "var(--text-color-dark)"
              : "var(--text-color-light)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: darkMode
                  ? "var(--text-color-dark)"
                  : "var(--text-color-light)",
              }}
            />
          }
        >
          <div className="p-5 text-lg font-bold">Macro Chart Data</div>
        </AccordionSummary>
        <AccordionDetails
          className={`accordion-details ${darkMode ? "dark" : ""}`}
        >
          <DataContent data={macroChartData} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          bgcolor: darkMode ? "rgb(82 82 82);" : "rgb(255, 255, 255)",
          "& > *": {
            borderBottom: "unset",
            "&:last-child": { paddingRight: "10px" },
            "&:first-child": { paddingLeft: "10px" },
            color: darkMode
              ? "var(--text-color-dark)"
              : "var(--text-color-light)",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: darkMode
                  ? "var(--text-color-dark)"
                  : "var(--text-color-light)",
              }}
            />
          }
        >
          <div className="p-5 text-lg font-bold">Fed Policy Model Data</div>
        </AccordionSummary>
        <AccordionDetails
          className={`accordion-details ${darkMode ? "dark" : ""}`}
        >
          <DataContent data={fedPolicyModelData} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Data;
