import React from "react";
import { Modal, Form, Input, Alert } from "antd";

export const SignUpPopup = ({ visible, onCreate, onCancel, hasError }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Sign Up"
      okText="Sign Up"
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
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your first name!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your last name!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password allowClear placeholder="your password" />
        </Form.Item>
        {!hasError ? (
          <Form.Item></Form.Item>
        ) : (
          <Form.Item>
            <Alert
              message="There is an error in your sign up. Please try a different username"
              type="error"
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
