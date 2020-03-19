import React from "react";
import { Modal, Form, Input, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const SignInPopup = ({ visible, onCreate, onCancel, hasError }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Sign in"
      okText="Sign in"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
        </Form.Item>
        {!hasError ? (
          <Form.Item></Form.Item>
        ) : (
          <Form.Item>
            <Alert message="Your user name or password is wrong" type="error" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
