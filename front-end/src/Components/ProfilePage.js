import React, { useState, useEffect } from "react";
import { getUserItems, deleteUserItem } from "../API/ItemsAPI";

import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ProfilePage() {
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const [userItem, setUserItem] = useState([]);
  const [noItem, setNoItem] = useState(true);
  const [userID] = useState(0);

  const gridStyle = {
    width: "25%",
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

  const handleEditItem = itemIndex => event => {
    console.log(itemIndex);
  };

  function fetchUserItem() {
    getUserItems(username).then(reponse => {
      if (!reponse.error) {
        console.log(reponse);
        setUserItem(reponse);
        setNoItem(false);
      } else {
        console.log("You have no item");
      }
    });
  }

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
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={require(`../../../backend/marketplace${item.image}`)}
                />
              }
            >
              <Button
                onClick={handleEditItem(i)}
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
              />
              <Button
                onClick={handleDeleteItem(i)}
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
              />
              <p>Description : {item.description}</p>
              <p>Price : {item.price}</p>
              <p>Brand : {item.brand}</p>
              <p>Category : {item.category}</p>
              <p>Size : {item.size}</p>
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
