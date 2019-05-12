import React from "react";
import { Form, Icon, Input, Button, Alert } from "antd";
import { withFormik } from "formik";
import { Link } from "react-router-dom";

const LoginView = ({
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
      <h1>Log in</h1>
      <Form className="login-form" onSubmit={handleSubmit}>
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
            Log in
          </Button>
          Or <Link to="/register">register</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: "",
      password: ""
    };
  },
  handleSubmit(values, { props }) {
    props.getValues(values);
  }
})(LoginView);
