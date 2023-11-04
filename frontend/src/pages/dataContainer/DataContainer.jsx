import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Data from "../../components/Data/Data";
import {
  assetsReturnData,
  macroChartData,
  fedPolicyModelData,
} from "../../components/Data/Text";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";

const DataContainer = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className="m-5 p-5 ">
      <h1 className="mt-4 text-3xl font-bold mb-5 flex justify-center">
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
        <AccordionDetails>
          <Data data={assetsReturnData} />
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
        <AccordionDetails>
          <Data data={macroChartData} />
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
        <AccordionDetails>
          <Data data={fedPolicyModelData} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DataContainer;
