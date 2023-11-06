import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useDarkMode from "../../contexts/DarkMode/useDarkMode";
import PropTypes from "prop-types";

function Row({ row }) {
  const { darkMode } = useDarkMode();
  return (
    <TableRow
      sx={{
        "& > *": {
          borderBottom: "unset",
          padding: "5px",
          "&:last-child": { paddingRight: "10px" },
          "&:first-child": { paddingLeft: "10px" },
        },
      }}
    >
      <TableCell
        component="th"
        scope="row"
        style={{
          fontFamily: '"Nunito Sans", sans-serif, "Segoe UI", Tahoma, Geneva',
          color: darkMode
            ? "var(--text-color-dark)"
            : "var(--text-color-light)",
        }}
      >
        {row.metric}
      </TableCell>
      <TableCell
        align="left"
        style={{
          fontFamily: '"Nunito Sans", sans-serif, "Segoe UI", Tahoma, Geneva',
          color: darkMode
            ? "var(--text-color-dark)"
            : "var(--text-color-light)",
        }}
      >
        {row.description}
      </TableCell>
      <TableCell
        align="left"
        style={{
          fontFamily: '"Nunito Sans", sans-serif, "Segoe UI", Tahoma, Geneva',
          color: darkMode
            ? "var(--text-color-dark)"
            : "var(--text-color-light)",
        }}
      >
        <a
          href={row.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-0"
        >
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

function DataContent({ data }) {
  const { darkMode } = useDarkMode();

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="collapsible table"
        className={darkMode ? "bg-neutral-700" : "bg-stone-50"}
      >
        <TableHead>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableCell
                key={index}
                align={index === 0 ? "inherit" : "left"}
                style={{
                  fontFamily:
                    '"Nunito Sans", sans-serif, "Segoe UI", Tahoma, Geneva',
                  color: darkMode
                    ? "var(--text-color-dark)"
                    : "var(--text-color-light)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
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

DataContent.propTypes = {
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

export default DataContent;
