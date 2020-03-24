import React, { useState } from "react";

import { Card, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  deleteItemToBasket,
  setBasket
} from "../GlobalStateManagement/Actions/index";
import { Link } from "react-router-dom";

function MyBasket(props) {
  const [visible, setModalVisble] = useState(false);
  const handleDeleteItem = item_id => event => {
    props.removeItemFromBasket(item_id);
  };
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;

  const incrementQuantity = index => event => {
    let newArray = props.basket.slice();
    let basketItem = newArray[index];
    let item = props.allItems.filter(item => item.id === basketItem.id);
    if (item[0].inventory === basketItem.quantity) {
      setModalVisble(true);
    } else {
      basketItem.quantity++;
      props.updateBasket(newArray);
    }
  };

  const decrementQuantity = index => event => {
    let newArray = props.basket.slice();
    let item = newArray[index];
    item.quantity--;
    if (item.quantity <= 0) {
      props.removeItemFromBasket(item.id);
    } else {
      props.updateBasket(newArray);
    }
  };

  const card = (
    <div>
      {props.basket.map((item, i) => (
        <div key={i}>
          <Card
            cover={
              <img
                alt="example"
                src={require(`../../../backend/marketplace${item.image}`)}
                style={{ height: "300px", width: "150px" }}
              />
            }
          >
            <Button
              onClick={handleDeleteItem(item.id)}
              type="primary"
              icon={<DeleteOutlined />}
            >
              {" "}
              Remove
            </Button>
            <p>Name : {item.name}</p>
            <p>Price : {item.price}</p>
            <p>Brand : {item.brand}</p>
            <p>Size : {item.size}</p>
            {item.quantity ? (
              <span>
                <Button onClick={incrementQuantity(i)}>+</Button>
                <p>Quantity: {item.quantity}</p>
                <Button onClick={decrementQuantity(i)}>-</Button>
              </span>
            ) : (
              <p></p>
            )}
            <Modal
              title="Warning"
              visible={visible}
              onOk={() => setModalVisble(false)}
              cancelButtonProps={{ style: { display: "none" } }}
            >
              <p> This item is out of stock </p>
            </Modal>
          </Card>
        </div>
      ))}
    </div>
  );

  const content =
    props.basket.length > 0 ? (
      <div>
        {card}
        <Button type="primary" size="large">
          <Link to="/checkout">checkout</Link>
        </Button>
      </div>
    ) : (
      <div>
        <h1>You don't have any item in your basket right now</h1>
      </div>
    );

  return username == null ? (
    <div>
      <h1>You need to log in to see your profile</h1>
    </div>
  ) : (
    content
  );
}

const mapStateToProps = state => {
  return {
    basket: state.BasketReducer.basket,
    allItems: state.ItemReducer.items.allItems
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeItemFromBasket: item_id => dispatch(deleteItemToBasket(item_id)),
    updateBasket: newItems => dispatch(setBasket(newItems))
  };
}

const ConnectedBasket = connect(mapStateToProps, mapDispatchToProps)(MyBasket);
export default ConnectedBasket;
