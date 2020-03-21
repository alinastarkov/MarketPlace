import React, { useState } from "react";
import "../../App.css";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { postItem } from "../../API/ItemsAPI";
// TODO: AFTER LOG OUT SELL ITEM FORM IS NOT RERENDER => SYNCRONIZE IT
function SellItemForm() {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  // const handleUpload = ({ fileList }) => {
  //   console.log("fileList", fileList);
  //   setFile({ fileList });
  // };
  // const normFile = e => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  const handleImageChange = e => {
    setFile(e.target.files[0]);
  };

  const onFinish = v => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        values.username = localStorage.getItem("username");
        values.image = file;
        console.log(values);
        postItem(values);
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const formSell = (
    <Form {...layout} form={form} onFinish={onFinish} name="nest-messages">
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
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return !localStorage.getItem("token") ? (
    <div>
      <h1>You need to sign in to sell item</h1>
    </div>
  ) : (
    formSell
  );
}

export default SellItemForm;

{
  /* <Form.Item
        name="image"
        label="Upload Image"
        valuePropName="fileList"
        extra="Please upload images of your item"
        getValueFromEvent={normFile}
      >
        <Upload
          name="logo"
          listType="picture"
          onChange={handleUpload}
          beforeUpload={() => false}
        >
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item> */
}
