import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be mininum 3 characters")
    .max(15, "First name must be maximum 15 characters")
    .required("First name is a required field"),
  lastName: Yup.string()
    .min(3, "Last name must be mininum 3 characters")
    .max(15, "Last name must be maximum 15 characters")
    .required("Last name is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(5, "Password must be at least 5 characters")
    .max(21, "Maximum 21 characters"),
});

const EditProfile = () => {
  const [message, setMessage] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const userId = JSON.parse(Cookies.get("_auth_state")).data.id;

  const handleEditSubmit = async (values) => {
    setMessage("");
    if (values.password !== confirmedPassword) {
      setMessage("Passwords don't match");
    } else {
      try {
        await axios.put(
          "https://localhost:8443/api/v1/users/update/" + userId,
          values,
          {
            headers: {
              Authorization: "Bearer_" + Cookies.get("_auth"),
            },
          }
        );

        setMessage("Profile updated");
      } catch (err) {
        setMessage("Bad credentials");

        console.log("Error: ", err);
      }
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: JSON.parse(Cookies.get("_auth_state")).data.firstName,
          lastName: JSON.parse(Cookies.get("_auth_state")).data.lastName,
          password: "",
        }}
        onSubmit={(values) => {
          handleEditSubmit(values);
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
                  <FormattedMessage id="updateprofile" />
                </h3>
                {message ? (
                  <>
                    <label>{message}</label>
                    <br />
                    <br />
                  </>
                ) : (
                  <span></span>
                )}
                <label>
                  <FormattedMessage id="firstlastname" />
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                  className="form-group mt-3"
                >
                  <input
                    type="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    className="form-control mt-1"
                    placeholder={
                      JSON.parse(Cookies.get("_auth_state")).data.firstName
                    }
                    id="firstName"
                    style={{ margin: "5px" }}
                  />
                  <input
                    type="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    className="form-control mt-1"
                    placeholder={
                      JSON.parse(Cookies.get("_auth_state")).data.lastName
                    }
                    id="lastName"
                    style={{ margin: "5px" }}
                  />
                </div>
                {errors.firstName && touched.firstName && errors.firstName ? (
                  <label>
                    {errors.firstName && touched.firstName && errors.firstName}
                  </label>
                ) : (
                  <span></span>
                )}
                {errors.firstName &&
                touched.firstName &&
                errors.firstName &&
                errors.lastName &&
                touched.lastName &&
                errors.lastName ? (
                  <br />
                ) : (
                  <></>
                )}
                {errors.lastName && touched.lastName && errors.lastName ? (
                  <>
                    <label>
                      {errors.lastName && touched.lastName && errors.lastName}
                    </label>
                  </>
                ) : (
                  <span></span>
                )}
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
                    placeholder="Enter new password"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>
                    <FormattedMessage id="confirmpassword" />
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => {
                      setConfirmedPassword(e.target.value);
                    }}
                    onBlur={handleBlur}
                    className="form-control mt-1"
                    placeholder="Confirm new password"
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
              </div>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
