import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Data from "./Data";
import { assetsReturnData, macroChartData, fedPolicyModelData } from "./Text";

const DataContainer = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Assets Return</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Data data={assetsReturnData} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Macro Chart Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Data data={macroChartData} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Fed Policy Model Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Data data={fedPolicyModelData} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DataContainer;
