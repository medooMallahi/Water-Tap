import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./DriversRecored.module.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    height: 500,
    borderRadius: 16,
  },
  table: {
    fontSize: "20rem",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    backgroundColor: "grey",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  cell: {
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
  button: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const DriversRecored = () => {
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell} align="justify">
                DriverID
              </TableCell>
              <TableCell className={classes.tableHeaderCell} align="justify">
                Name
              </TableCell>
              <TableCell align="justify"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className={classes.cell}>{row.name}</TableCell>
                <TableCell className={classes.cell}>{row.calories}</TableCell>
                <TableCell className={classes.cell}>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DriversRecored;
