import React from "react";
import "../../App.css";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function SellItemForm() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Form {...layout} name="nest-messages">
      <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="size" label="Size" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="category" label="category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="brand" label="brand" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Please upload images of your item"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SellItemForm;
