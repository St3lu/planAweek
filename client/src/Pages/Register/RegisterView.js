import React from "react";
import { Form, Icon, Input, Button, Alert } from "antd";
import { withFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

const RegisterView = ({
  values,
  handleSubmit,
  handleChange,
  touched,
  errors,
  error
}) => {
  return (
    <div
      style={{
        width: "400px",
        marginTop: "40px",
        textAlign: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)"
      }}
    >
      <h1>Register</h1>
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Item
          validateStatus={errors.username ? "error" : undefined}
          help={
            touched.username && errors.username ? errors.username : undefined
          }
        >
          <Input
            size="large"
            value={values.username}
            onChange={handleChange}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
            name="username"
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.email ? "error" : undefined}
          help={touched.email && errors.email ? errors.email : undefined}
        >
          <Input
            size="large"
            value={values.email}
            prefix={<Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          validateStatus={errors.password ? "error" : undefined}
          help={
            touched.password && errors.password ? errors.password : undefined
          }
        >
          <Input
            size="large"
            value={values.password}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        {error ? (
          <Alert
            message="There is a problem with your submit"
            description={error}
            type="error"
          />
        ) : null}

        <Form.Item>
          <Button
            style={{
              marginTop: "10px"
            }}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register now
          </Button>
          Or <Link to="/login">login</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Your username should be at least 3 characters")
    .max(25, "Your username should be maximum 25 characters")
    .required("Your username is required"),
  password: yup
    .string()
    .min(3, "Your password should be at least 3 characters")
    .max(100, "Your password should be maximum 100 characters")
    .required("Your password is required"),
  email: yup
    .string()
    .required("Your email is required")
    .email("You should provide a valid email")
});

export default withFormik({
  validationSchema,
  validateOnBlur: true,
  validateOnChange: false,
  mapPropsToValues({ username, email, password }) {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  handleSubmit(values, { props }) {
    props.getValues(values);
  }
})(RegisterView);
