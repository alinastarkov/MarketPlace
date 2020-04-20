import React, { useState, useEffect } from "react";
import { getUserOrders } from "../API/OrderAPI";
import { getItems } from "../API/ItemsAPI";
import { setAllItems } from "../GlobalStateManagement/Actions/index";
import { Card, Avatar } from "antd";
import { connect } from "react-redux";
import "./Style/MyOrder.scss";

const { Meta } = Card;

function MyOrders(props) {
  const [userID] = useState(0);
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const [userOrders, setUserOrder] = useState([]);
  const [dict, setDict] = useState({});

  const gridStyle = {
    width: "100%",
    height: "25%",
    textAlign: "center",
  };

  function fetchUserOrder() {
    getUserOrders(username).then((reponse) => {
      if (!reponse.error) {
        setUserOrder(reponse);
      } else {
        console.log("You have no order");
      }
    });
  }

  const createDictFromAllItems = (allItems) => {
    const dict = {};
    if (allItems.length > 0) {
      allItems.forEach((item) => (dict[item.id] = item));
    }
    setDict(dict);
  };

  const fetchallItems = (username) => {
    getItems(username).then((response) => {
      props.setItemData(response);
      createDictFromAllItems(response);
    });
  };

  useEffect(() => {
    fetchUserOrder(username);
  }, [props.allItems]);

  useEffect(() => {
    if (props.allItems.length === 0) {
      fetchallItems();
    } else {
      fetchUserOrder();
      createDictFromAllItems(props.allItems);
    }
  }, [userID]);

  const generateOrderItems = (orderedItems) => {
    return (
      <div className="all-Order-item">
        {orderedItems.map((item) => {
          const i = dict[item.item_id];
          if (i) {
            return (
              <Card size="small">
                <Meta
                  avatar={
                    <img
                      alt="example"
                      src={require(`../../../backend/marketplace${i.image}`)}
                      style={{ height: "150px" }}
                    />
                  }
                  title={i.brand}
                  description={[
                    <div>
                      <p>Name: {i.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {i.size}</p>
                      <p>Price: {i.price}</p>
                    </div>,
                  ]}
                ></Meta>
              </Card>
            );
          }
        })}
      </div>
    );
  };

  const card = (
    <Card title="Your Order History">
      {userOrders.map((order, i) => (
        <div key={i}>
          <Card.Grid style={gridStyle}>
            {" "}
            <Card>
              <p>Name : {order.full_name}</p>
              <p>Address : {order.address}</p>
              <p>Country : {order.country}</p>
              <p>State : {order.city}</p>
              <p>Card Number : {order.card_number} </p>
              <p>Total price : {order.total_price} $</p>
              <hr />
              {generateOrderItems(order.ordered_items)}
            </Card>
          </Card.Grid>
        </div>
      ))}
    </Card>
  );

  const content =
    userOrders.length === 0 ? (
      <div>
        <h1> You don't have any item</h1>
      </div>
    ) : (
      card
    );

  return username == null ? (
    <div className="order-page">
      <h1>You need to log in to see your order history</h1>
    </div>
  ) : (
    <div className="order-page">{content}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    allItems: state.ItemReducer.items.allItems,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setItemData: (allItems) => dispatch(setAllItems(allItems)),
  };
}

const ConnectedMyOrders = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);

export default ConnectedMyOrders;
