import React, { useState, useEffect } from "react";
import { getUserOrders } from "../API/OrderAPI";
import { Card } from "antd";

function MyOrders() {
  const [userID] = useState(0);
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const [userOrders, setUserOrder] = useState([]);

  const gridStyle = {
    width: "100%",
    height: "25%",
    textAlign: "center"
  };

  function fetchUserOrder() {
    getUserOrders(username).then(reponse => {
      if (!reponse.error) {
        console.log("response fetch Order", reponse);
        setUserOrder(reponse);
      } else {
        console.log("You have no order");
      }
    });
  }

  useEffect(() => {
    fetchUserOrder();
  }, [userID]);

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
    <div>
      <h1>You need to log in to see your order history</h1>
    </div>
  ) : (
    content
  );
}

export default MyOrders;
