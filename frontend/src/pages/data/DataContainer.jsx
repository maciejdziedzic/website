import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Data from "../../components/Data/Data";
import {
  assetsReturnData,
  macroChartData,
  fedPolicyModelData,
} from "../../components/Data/Text";

const DataContainer = () => {
  return (
    <div className="m-5">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>Assets Return</div>
        </AccordionSummary>
        <AccordionDetails>
          <Data data={assetsReturnData} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>Macro Chart Data</div>
        </AccordionSummary>
        <AccordionDetails>
          <Data data={macroChartData} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
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
