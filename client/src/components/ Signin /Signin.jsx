import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { loginUser } from "../../store/user";

const styles = {
  root: {
    background: "black",
  },
  input: {
    color: "white",
  },
};

const Signin = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const formik = useFormik({
    initialValues: { email: "", password: "" },

    onSubmit: (values) => {
      handleSubmit(values);
      history.push("/searchDriver");
    },
  });

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <article className="br ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5  center ">
      <main className="pa4 black-80 justifiy">
        <form className="measure" onSubmit={formik.handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <TextField
                className="b pa2 input-reset ba bg-transparent hover-bg-white hover-white w-100"
                style={{ width: "100%", color: "red" }}
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
              value="Sign in"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signin;
