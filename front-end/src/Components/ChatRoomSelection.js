import React, { useState, useEffect } from "react";
import { getAllUsers } from "../API/UserManagementAPI";
import { UserOutlined, StarOutlined } from "@ant-design/icons";
import { Card } from "antd";

const { Meta } = Card;

export default function ChatRoomSelection(props) {
  const [allUsers, setUsers] = useState([]);
  const [userID] = useState(0);
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;

  const gridStyle = {
    width: "30%",
    height: "30%",
    textAlign: "center",
  };

  const fetchallUsers = () => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  };

  useEffect(() => {
    fetchallUsers();
  }, [userID]);

  const handleCardClick = (roomName) => () => {
    props.history.push("/chat", { roomName: roomName });
  };

  const card = (
    <Card title="List of all sellers chat rooms ">
      <div onClick={handleCardClick(username)}>
        <Card.Grid style={gridStyle}>
          <Card>
            <Meta
              avatar={<StarOutlined style={{ fontSize: "40px" }} />}
              title="My chat room"
              description={"Chat room for " + username}
            />
          </Card>
        </Card.Grid>
      </div>
      {allUsers.map((user, i) => {
        if (user.username !== username) {
          return (
            <div onClick={handleCardClick(user.username)} key={i}>
              <Card.Grid style={gridStyle}>
                <Card>
                  <Meta
                    avatar={<UserOutlined style={{ fontSize: "40px" }} />}
                    title={user.username}
                    description={"Chat room for " + user.username}
                  />
                </Card>
              </Card.Grid>
            </div>
          );
        }
      })}
    </Card>
  );

  const content =
    username == null ? (
      <div>
        <h1>You need to log in to see your profile</h1>
      </div>
    ) : (
      card
    );

  return <div>{content}</div>;
}
