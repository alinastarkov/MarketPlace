import React, { useState, useEffect } from "react";
import { getUserItems, deleteUserItem } from "../API/ItemsAPI";

import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { setUserItems } from "../GlobalStateManagement/Actions/index";
import { connect } from "react-redux";

function ProfilePage(props) {
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const [userItem, setUserItem] = useState([]);
  const [userID] = useState(0);

  const gridStyle = {
    width: "25%",
    height: "25%",
    textAlign: "center",
  };

  const handleDeleteItem = (itemIndex) => (event) => {
    deleteUserItem(username, userItem[itemIndex].name).then((reponse) => {
      if (!reponse.error) {
        fetchUserItem();
      } else {
        console.log("Failed to delete item");
      }
    });
  };

  function fetchUserItem() {
    getUserItems(username).then((reponse) => {
      if (!reponse.error) {
        console.log("response fetch Item", reponse);
        setUserItem(reponse);
      } else {
        console.log("You have no item");
      }
    });
  }

  // after fetch user item we check if it's empty or not
  useEffect(() => {
    props.setGlobalUserItem(userItem);
  }, [userItem]);

  // without [userID] userEffect will be in a infinite loop
  useEffect(() => {
    fetchUserItem();
  }, [userID]);

  const card = (
    <Card title="Items you are selling">
      {userItem.map((item, i) => (
        <div key={i}>
          <Card.Grid style={gridStyle}>
            {" "}
            <Card
              cover={
                <img
                  alt="example"
                  src={require(`../../../backend/marketplace${item.image}`)}
                  style={{ height: "450px" }}
                />
              }
            >
              <Button type="primary" shape="circle">
                <Link to={`/edit/${i}`}>
                  <EditOutlined />
                </Link>
              </Button>
              <Button
                onClick={handleDeleteItem(i)}
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
              />
              <p>Name : {item.name}</p>
              <p>Description : {item.description}</p>
              <p>Price : {item.price}</p>
              <p>Brand : {item.brand}</p>
              <p>Category : {item.category}</p>
              <p>Size : {item.size}</p>
              <p>Inventory : {item.inventory}</p>
            </Card>
          </Card.Grid>
        </div>
      ))}
    </Card>
  );

  const content =
    userItem.length === 0 ? (
      <div>
        <h1> You don't have any item</h1>
      </div>
    ) : (
      card
    );

  return username == null ? (
    <div>
      <h1>You need to log in to see your profile</h1>
    </div>
  ) : (
    content
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setGlobalUserItem: (userItem) => dispatch(setUserItems(userItem)),
  };
}
const ConnectedProfilePage = connect(null, mapDispatchToProps)(ProfilePage);

export default ConnectedProfilePage;
