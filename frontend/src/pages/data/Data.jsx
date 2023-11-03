import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

function Row({ row }) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell component="th" scope="row">
        {row.metric}
      </TableCell>
      <TableCell align="right">{row.description}</TableCell>
      <TableCell align="right">
        <a href={row.source.url} target="_blank" rel="noopener noreferrer">
          {row.source.name}
        </a>
      </TableCell>
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    metric: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function Data({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableCell key={index} align={index === 0 ? "inherit" : "right"}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

Data.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        metric: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        source: PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Data;
