import React, { useEffect } from "react";

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

import { useDispatch, useSelector } from "react-redux";
import { getDrivers, deleteDriver } from "../../../store/drivers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    height: 500,
    borderRadius: 16,
    margin: "auto",
    background: "transparent",
  },
  table: {
    fontSize: "20rem",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    color: "black",
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
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.entities.drivers.list);

  const deletedriver = (id) => {
    dispatch(deleteDriver({ id }));
    dispatch(getDrivers());
  };

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return (
    <React.Fragment>
      {drivers.length !== 0 ? (
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
                <TableCell className={classes.tableHeaderCell} align="justify">
                  Phone
                </TableCell>
                <TableCell
                  className={classes.tableHeaderCell}
                  align="justify"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className={classes.cell}>{row._id}</TableCell>
                  <TableCell className={classes.cell}>{row.name}</TableCell>
                  <TableCell className={classes.cell}>{row.phone}</TableCell>
                  <TableCell className={classes.cell}>
                    <IconButton
                      className={classes.margin}
                      onClick={() => deletedriver(row._id)}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>There're no drivers</h1>
      )}
    </React.Fragment>
  );
};

export default DriversRecored;
