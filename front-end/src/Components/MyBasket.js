import React, { useState, useEffect } from "react";

import { Card, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  deleteItemToBasket,
  setBasket,
  setTotalPrice,
} from "../GlobalStateManagement/Actions/index";
import { Link } from "react-router-dom";
import TotalOrder from "../Components/TotalOrder";
import { calculateTotal } from "../utils/utilsFunction";
import "./Style/MyBasket.scss";

const { Meta } = Card;
function MyBasket(props) {
  const [visible, setModalVisble] = useState(false);
  const handleDeleteItem = (item_id) => (event) => {
    props.removeItemFromBasket(item_id);
  };
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const gridStyle = {
    width: "100%",
    height: "25%",
    textAlign: "center",
  };

  const incrementQuantity = (index) => (event) => {
    let newArray = props.basket.slice();
    let basketItem = newArray[index];
    let item = props.allItems.filter((item) => item.id === basketItem.id);
    if (item[0].inventory === basketItem.quantity) {
      setModalVisble(true);
    } else {
      basketItem.quantity++;
      props.updateBasket(newArray);
    }
  };

  useEffect(() => {
    props.updateTotalPrice(calculateTotal(props.basket));
  }, [props.basket]);

  const decrementQuantity = (index) => (event) => {
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
    <div className="basket-page">
      {props.basket.map((item, i) => (
        <div key={i}>
          <Card>
            <Meta
              title={item.name}
              description={[
                <div>
                  <p>Price : {item.price}</p>
                  <p>Brand : {item.brand}</p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Size : {item.size}</p>
                </div>,
              ]}
              avatar={
                <img
                  alt="example"
                  src={require(`../../../backend/marketplace${item.image}`)}
                  style={{ height: "150px" }}
                />
              }
            ></Meta>
            <div className="remove-button">
              <Button
                onClick={handleDeleteItem(item.id)}
                type="primary"
                icon={<DeleteOutlined />}
              >
                Remove
              </Button>
            </div>
            {item.quantity ? (
              <span className="quantity-buttons">
                <Button onClick={incrementQuantity(i)}>+</Button>
                <p className="quantity-text">Quantity: {item.quantity}</p>
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
      <div className="basket-page">
        <Card title="Your Basket Items">
          <Card.Grid style={gridStyle}>{card}</Card.Grid>
          <TotalOrder />
          <Button type="primary" size="large">
            <Link to="/checkout">Check out</Link>
          </Button>
        </Card>
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

const mapStateToProps = (state) => {
  return {
    basket: state.BasketReducer.basket,
    allItems: state.ItemReducer.items.allItems,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeItemFromBasket: (item_id) => dispatch(deleteItemToBasket(item_id)),
    updateBasket: (newItems) => dispatch(setBasket(newItems)),
    updateTotalPrice: (newPrice) => dispatch(setTotalPrice(newPrice)),
  };
}

const ConnectedBasket = connect(mapStateToProps, mapDispatchToProps)(MyBasket);
export default ConnectedBasket;
