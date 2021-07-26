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
  const notifications = useSelector((state) => state.entities.notifications);

  const formik = useFormik({
    initialValues: {
      email: "ex.@outlook.com",
      name: "mohammed Al-mallahi",
      password: "00000",
      phone: "0592413118",
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
    <article className="br ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5  center ">
      <main className="pa4 black-80 justifiy">
        <form className="measure" onSubmit={formik.handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">New Driver</legend>
            <div className="mt3">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your email"
                variant="outlined"
                {...formik.getFieldProps("email")}
              />
            </div>
            <div className="mv3">
              <TextField
                className="b pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100"
                style={{ width: "100%" }}
                name="phone"
                label="Enter our phone"
                variant="outlined"
                {...formik.getFieldProps("phone")}
              />
            </div>
            <div className="mv3">
              <TextField
                className="b pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100"
                style={{ width: "100%" }}
                name="name"
                label="Enter our name"
                variant="outlined"
                {...formik.getFieldProps("name")}
              />
            </div>
            <div className="mv3">
              <TextField
                className="b pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100"
                style={{ width: "100%" }}
                name="password"
                label="Enter your password"
                variant="outlined"
                {...formik.getFieldProps("password")}
              />
            </div>
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default RegisterDriver;
