import React from "react";

import { Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { deleteItemToBasket } from "../GlobalStateManagement/Actions/index";
import { Link } from "react-router-dom";

function MyBasket(props) {
  const handleDeleteItem = item_id => event => {
    props.removeItemFromBasket(item_id);
  };
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
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
  return { basket: state.BasketReducer.basket };
};

function mapDispatchToProps(dispatch) {
  return {
    removeItemFromBasket: item_id => dispatch(deleteItemToBasket(item_id))
  };
}

const ConnectedBasket = connect(mapStateToProps, mapDispatchToProps)(MyBasket);
export default ConnectedBasket;
