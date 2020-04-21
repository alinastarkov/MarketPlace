import React, { useState, useEffect } from "react";
import { WS_URL } from "../settings";
import { Comment, Form, Button, List, Input } from "antd";
import { connect } from "react-redux";
import {
  setMessages,
  addMessage,
} from "../GlobalStateManagement/Actions/index";
import "./Style/Chat.scss";

const { TextArea } = Input;

function ChatComponent(props) {
  const username = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : null;
  const roomName = props.location.state.roomName;
  const [userID] = useState(0);
  const [form] = Form.useForm();
  var ws = new WebSocket(WS_URL + "/" + roomName + "/");

  useEffect(() => {
    initWS();
  }, [userID]);

  const initWS = () => {
    ws.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      console.log(parsedData);
    };

    ws.onopen = () => {
      console.log("WebSocket open");
      sendMessage({
        command: "fetch_messages",
        username: username,
        room_name: roomName,
      });
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };
  };

  const OnMessage = (parsedData) => {
    const newMessage = parsedData.messages;
    const command = parsedData.command;
    if (command === "get_all_messages") {
      props.setMessages(newMessage.reverse());
    }
    if (command === "new_message") {
      console.log("New message");
      console.log(newMessage);
      console.log(props.messages);
      newMessage.user = parsedData.user;
      var duplicateFound = false;

      if (!duplicateFound) {
        props.addMessage(newMessage);
      } else {
        console.log("duplicate!!");
      }
    }
  };

  const sendMessage = (messageObject) => {
    try {
      ws.send(JSON.stringify({ ...messageObject }));
    } catch (err) {
      console.log(err.message);
    }
  };

  const scrollToBottom = () => {
    // const chat = this.messagesEnd;
    // const scrollHeight = chat.scrollHeight;
    // const height = chat.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  const onFinish = (v) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const messageObject = {
          command: "new_message",
          username: username,
          content: values.chatMessage,
          room_name: roomName,
        };
        sendMessage(messageObject);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const Editor = ({ onFinish }) => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="chatMessage" rules={[{ required: true }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );

  const renderMessages = () => {
    return props.messages.map((message, i) => {
      return (
        <li key={i} className={message.user === username ? "me" : "them"}>
          <h4> {message.user}</h4>
          <p>{message.content}</p>
          <h4>{message.created_date}</h4>
        </li>
      );
    });
  };

  return username == null ? (
    <div>
      <h1>You need to log in to see your profile</h1>
    </div>
  ) : (
    <div className="chat">
      <div className="container">
        {username === roomName ? (
          <h1>Your seller chat room</h1>
        ) : (
          <div>
            <h1> You're currently in the chatroom of seller {roomName} </h1>
            <h3> Your username: {username}</h3>
          </div>
        )}
        <h3>Displaying only the recent 50 messages</h3>
        <ul>{renderMessages()}</ul>
      </div>
      <div className="container message-form">
        <Comment content={<Editor onFinish={onFinish} />} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.MessageReducer.messages,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setMessages: (messages) => dispatch(setMessages(messages)),
    addMessage: (message) => dispatch(addMessage(message)),
  };
}

const ConnectedChatComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatComponent);

export default ConnectedChatComponent;
