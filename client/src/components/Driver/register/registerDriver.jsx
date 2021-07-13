import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import styles from "./RegisterDriver.module.css";
import { TextField, Button, makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { registerDriver } from "../../../store/user";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    fontSize: 25,
  },
}));

const RegisterDriver = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const notifications = useSelector((state) => state.entities.notifications);

  const formik = useFormik({
    initialValues: {
      email: "almallahi@outlook.com",
      name: "mohammed Al-mallahi",
      password: "+972592413118",
    },

    onSubmit: (values) => {
      dispatch(registerDriver(values));
    },
  });

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/searchDriver");
    }
  }, [notifications]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.Formtitle}>Add New Driver</div>
        <div className={styles.formGroup}>
          <TextField
            className={styles.TextField}
            name="email"
            label="Enter your email"
            variant="outlined"
            inputProps={{ style: { fontSize: 20 } }}
            {...formik.getFieldProps("email")}
          />
          <TextField
            className={styles.TextField}
            name="name"
            label="Enter your name"
            variant="outlined"
            inputProps={{ style: { fontSize: 20 } }}
            {...formik.getFieldProps("name")}
          />
          <TextField
            className={styles.TextField}
            name="password"
            label="Enter your Password"
            variant="outlined"
            inputProps={{ style: { fontSize: 20 } }}
            {...formik.getFieldProps("password")}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterDriver;
