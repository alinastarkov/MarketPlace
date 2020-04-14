import React, { useState } from "react";
import "../../App.css";
import { Form, Input, Button, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { postItem } from "../../API/ItemsAPI";
import { connect } from "react-redux";

// TODO: AFTER LOG OUT SELL ITEM FORM IS NOT RERENDER => SYNCRONIZE IT

function SellItemForm(props) {
  // FOR EDIT FORM
  var currentLocation = window.location.pathname;
  const index = currentLocation.slice(currentLocation.lastIndexOf("/") + 1);
  const isEdit = /^\d+$/.test(index);
  const modifiedItem = isEdit ? props.userItems[index] : undefined;
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const fields = {
    name: modifiedItem ? modifiedItem.name : "",
    description: modifiedItem ? modifiedItem.description : "",
    size: modifiedItem ? modifiedItem.size : "",
    brand: modifiedItem ? modifiedItem.brand : "",
    category: modifiedItem ? modifiedItem.category : "",
    price: modifiedItem ? modifiedItem.price : "",
    inventory: modifiedItem ? modifiedItem.inventory : "",
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleUpload = ({ fileList }) => {
    setFile({ fileList });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (v) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        values.username = localStorage.getItem("username");
        values.image = file.fileList[0].originFileObj;
        if (modifiedItem) {
          values.id = modifiedItem.id;
        }
        console.log("send request form: ", values);
        postItem(values).then(() => props.history.push("/"));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const formSell = (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      name="nest-messages"
      initialValues={fields}
    >
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
      <Form.Item label="Price">
        <Form.Item name="price" noStyle>
          <InputNumber min={1} />
        </Form.Item>
        <span className="ant-form-text"> Item</span>
      </Form.Item>
      <Form.Item label="Number of Item">
        <Form.Item name="inventory" noStyle>
          <InputNumber min={1} />
        </Form.Item>
        <span className="ant-form-text"> Item</span>
      </Form.Item>
      <Form.Item
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

const mapStateToProps = (state) => {
  return { userItems: state.ItemReducer.items.userItems };
};
const ConnectedForm = connect(mapStateToProps)(SellItemForm);
export default ConnectedForm;
