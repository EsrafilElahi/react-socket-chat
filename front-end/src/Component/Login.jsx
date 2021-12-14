import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <Formik
        initialValues={{ userName: "", email: "", gender: "male" }}
        validationSchema={Yup.object({
          userName: Yup.string().required("userName is required!"),
          email: Yup.string().email("email not").required("email is required!"),
          gender: Yup.string().required("gender is required!"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { userName, email, gender } = values;
          const info = { userName, email, gender };

          setTimeout(() => {
            localStorage.setItem("firstUser", JSON.stringify(info));
            alert(JSON.stringify(values, null, 2));
            resetForm();
            navigate("/chat");
            setSubmitting(false);
          }, 200);
        }}
      >
        <Form>
          {/* UserName */}
          <label htmlFor="userName">UserName</label>
          <Field name="userName" type="userName" />
          <ErrorMessage name="userName" />

          {/* Email */}
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          {/* gender */}
          <label htmlFor="gender">Gender</label>
          <Field className="select" as="select" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Field>

          {/* Button */}
          <button className="btn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
