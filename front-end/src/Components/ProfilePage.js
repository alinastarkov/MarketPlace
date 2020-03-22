import React, { useState, useEffect } from "react";
import { getUserItems } from "../API/ItemsAPI";

import { Card, Avatar } from "antd";
const { Meta } = Card;

export default function ProfilePage() {
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const [userItem, setUserItem] = useState([]);
  const [noItem, setNoItem] = useState(true);
  const [userID, setUserID] = useState(0);

  const gridStyle = {
    width: "25%",
    textAlign: "center"
  };

  useEffect(() => {
    getUserItems(username).then(reponse => {
      if (!reponse.error) {
        console.log(reponse);
        setUserItem(reponse);
        setNoItem(false);
      } else {
        console.log("You have no item");
      }
    });
  }, [userID]);

  const card = (
    <Card title="Items you are selling">
      {userItem.map((item, i) => (
        <Card.Grid style={gridStyle}>
          {" "}
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={item.name}
          />
          <p>Description : {item.description}</p>
          <p>Price : {item.price}</p>
          <p>Brand : {item.brand}</p>
          <p>Category : {item.category}</p>
          <p>Size : {item.size}</p>
        </Card.Grid>
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

// <Card.Grid style={gridStyle}>Content</Card.Grid>
//       <Card.Grid hoverable={false} style={gridStyle}>
//         Content
//       </Card.Grid>
//       <Card.Grid style={gridStyle}>Content</Card.Grid>
//       <Card.Grid style={gridStyle}>Content</Card.Grid>
//       <Card.Grid style={gridStyle}>Content</Card.Grid>
//       <Card.Grid style={gridStyle}>Content</Card.Grid>
//       <Card.Grid style={gridStyle}>Content</Card.Grid>
