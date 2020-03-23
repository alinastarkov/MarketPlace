import React, { useState, useEffect, useContext } from "react";
import { getUserItems, deleteUserItem } from "../API/ItemsAPI";

import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Context } from "../GlobalStateManagement/Store";

export default function ProfilePage() {
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const [userItem, setUserItem] = useState([]);
  const [noItem, setNoItem] = useState(true);
  const [userID] = useState(0);
  const [state, dispatch] = useContext(Context);

  const gridStyle = {
    width: "25%",
    height: "25%",
    textAlign: "center"
  };

  const handleDeleteItem = itemIndex => event => {
    deleteUserItem(username, userItem[itemIndex].name).then(reponse => {
      if (!reponse.error) {
        fetchUserItem();
      } else {
        console.log("Failed to delete item");
      }
    });
  };

  function fetchUserItem() {
    getUserItems(username).then(reponse => {
      if (!reponse.error) {
        console.log("response fetch Item", reponse);
        setUserItem(reponse);
        dispatch({ type: "SET_ITEMS", payload: reponse });
      } else {
        console.log("You have no item");
      }
    });
  }

  useEffect(() => {
    userItem.length === 0 ? setNoItem(true) : setNoItem(false);
  }, [userItem]);

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
                  style={{ height: "300px" }}
                />
              }
            >
              <Button type="link" shape="circle" icon={<EditOutlined />}>
                <Link to={`/edit/${i}`}>Edit</Link>
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

  const content = noItem ? (
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
