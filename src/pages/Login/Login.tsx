import React from "react";
import { Form, Input, Button, Image, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.min.css";
import "./login.css";
import { LoginRequest } from "../../store/auth";
import { AppDispatch } from "../../App";
import { IStore } from "../../models/store";
import { LoginRequestBody } from "../../models/authModel";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: IStore) => state.auth);

  const onFinish = (values: LoginRequestBody) => {
    dispatch(
      LoginRequest({ username: values.username, password: values.password })
    );
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        username: "",
        password: "",
      }}
      onFinish={onFinish}
    >
      <Image
        className="form-logo"
        width={100}
        src="https://www.creainc.us/assets/img/logo.svg"
        preview={false}
      />
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          size="large"
          status={error && "error"}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
          status={error && "error"}
          disabled={loading}
        />
      </Form.Item>
      {error && <Alert message={error} type="error" className="form-error" />}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          disabled={loading}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}
