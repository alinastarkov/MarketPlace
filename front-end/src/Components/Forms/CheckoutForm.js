import React, { useState } from "react";
import "../../App.css";
import { Form, Input, Button, Modal } from "antd";
import { connect } from "react-redux";
import TotalOrder from "../TotalOrder";
import { postPayment } from "../../API/OrderAPI";
import { setBasket } from "../../GlobalStateManagement/Actions/index";
import { CheckCircleTwoTone } from "@ant-design/icons";

// TODO: AFTER LOG OUT SELL ITEM FORM IS NOT RERENDER => SYNCRONIZE IT

function CheckOutForm(props) {
  // FOR EDIT FORM

  const [form] = Form.useForm();
  const [modalVisible, setModalVisble] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (v) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        values.ordered_items = props.basket.map((item) => {
          return {
            item_id: item.id,
            quantity: item.quantity,
            price: item.price,
          };
        });
        values.username = localStorage.getItem("username");
        values.total_price = props.totalPrice;
        postPayment(values)
          .then(() => props.updateBasket([]))
          .then(() => {
            setModalVisble(true);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setModalVisble(false);
    props.history.push("/");
  };

  const handleOk = () => {
    setModalVisble(false);
    props.history.push("/user-order");
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
      <Modal
        title="Order Confirmation"
        okText="Go to your order history"
        cancelText="Go to main page"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: "40px" }}
        />
        <p>Your order has been successfully placed.</p>
        <p>An email with your order detail was sent to your email address</p>
      </Modal>
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

const mapStateToProps = (state) => {
  return {
    basket: state.BasketReducer.basket,
    totalPrice: state.ItemReducer.items.totalPrice,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateBasket: (newItems) => dispatch(setBasket(newItems)),
  };
}

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutForm);
export default ConnectedForm;
