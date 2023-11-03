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
    <div className="m-5 bg">
      <h1 className=" text-3xl mb-5 flex justify-center">Data Sources</h1>
      <Accordion
        sx={{
          bgcolor: darkMode ? "rgb(82 82 82);" : "rgb(255, 255, 255)",
          "& > *": {
            borderBottom: "unset",
            "&:last-child": { paddingRight: "10px" },
            "&:first-child": { paddingLeft: "10px" },
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>Assets Return</div>
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
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>Macro Chart Data</div>
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
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>Fed Policy Model Data</div>
        </AccordionSummary>
        <AccordionDetails>
          <Data data={fedPolicyModelData} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DataContainer;
