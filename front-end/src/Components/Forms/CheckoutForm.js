import React from "react";
import "../../App.css";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import TotalOrder from "../TotalOrder";
import { postPayment } from "../../API/PaymentAPI";

// TODO: AFTER LOG OUT SELL ITEM FORM IS NOT RERENDER => SYNCRONIZE IT

function CheckOutForm(props) {
  // FOR EDIT FORM

  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const onFinish = v => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        values.ordered_items = props.basket.map(item => {
          return { id: item.id, quantity: item.quantity, price: item.price };
        });
        values.username = localStorage.getItem("username");
        values.total_price = props.totalPrice;
        postPayment(values);
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const formSell = (
    <div>
      <Form {...layout} form={form} onFinish={onFinish} name="nest-messages">
        <Form.Item
          name="full_name"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="state" label="State" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="card_number"
          label="Credit Card Number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <TotalOrder />
    </div>
  );

  return !localStorage.getItem("token") ? (
    <div>
      <h1>You need to sign in to check out item</h1>
    </div>
  ) : (
    formSell
  );
}

const mapStateToProps = state => {
  return {
    basket: state.BasketReducer.basket,
    totalPrice: state.ItemReducer.items.totalPrice
  };
};

const ConnectedForm = connect(mapStateToProps)(CheckOutForm);
export default ConnectedForm;
