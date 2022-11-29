import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Mininum 1 characters")
    .max(15, "Maximum 15 characters")
    .required("Username is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 8 characters"),
});

function Login() {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:8443/api/v1/auth/login",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 60,
        tokenType: "Bearer",
        authState: { data: response.data },
      });

      navigate("/");
      window.location.reload(false);
    } catch (err) {
      setError("Bad credentials");
      console.log(err);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          handleLoginSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="Auth-form-container">
            <form className="Auth-form" noValidate onSubmit={handleSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">
                  <FormattedMessage id="signin" />
                </h3>
                {error ? (
                  <label style={{ color: "red" }}>{error}</label>
                ) : (
                  <></>
                )}

                <div className="form-group mt-3">
                  <label>
                    <FormattedMessage id="username" />
                  </label>
                  <input
                    type="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="form-control mt-1"
                    placeholder="Enter username"
                    id="username"
                  />
                  {errors.username && touched.username && errors.username ? (
                    <label>
                      {errors.username && touched.username && errors.username}
                    </label>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="form-group mt-3">
                  <label>
                    <FormattedMessage id="password" />
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="form-control mt-1"
                    placeholder="Enter password"
                  />
                  {errors.password && touched.password && errors.password ? (
                    <label>
                      {errors.password && touched.password && errors.password}
                    </label>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    <FormattedMessage id="submit" />
                  </button>
                </div>
                <p className="forgot-password text-right mt-2">
                  <FormattedMessage id="donthaveaccount" />{" "}
                  <Link to="/signup">
                    <FormattedMessage id="registerhere" />
                  </Link>
                </p>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
