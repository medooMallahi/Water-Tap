import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { TextField, Button, makeStyles } from "@material-ui/core";

import { editDriver } from "../../../store/drivers";

const EditDriver = (props) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.entities.notifications);

  let { id } = useParams();

  console.log(id, "this ID");

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
    },

    onSubmit: (values) => {
      dispatch(editDriver({ values, id }));
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
            <legend className="f1 fw6 ph0 mh0">Edit Driver</legend>
            <div className="mt3">
              <TextField
                style={{ width: "100%" }}
                name="phone"
                label="Edit phone"
                variant="outlined"
                {...formik.getFieldProps("phone")}
              />
            </div>
            <div className="mt3">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Edit email"
                variant="outlined"
                {...formik.getFieldProps("email")}
              />
            </div>
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Edit driver"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default EditDriver;
