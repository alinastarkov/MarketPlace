import React, { Component } from "react";
import { WS_URL } from "../settings";
import { message } from "antd";

const username = localStorage.getItem("username")
  ? localStorage.getItem("username")
  : null;

var ws = new WebSocket(WS_URL);

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
    };
    this.initWS();
  }

  initWS() {
    ws.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      console.log(parsedData);
      this.OnMessage(parsedData.messages, parsedData.command);
    };

    ws.onopen = () => {
      console.log("WebSocket open");
      this.sendMessage({ command: "fetch_messages", username: username });
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };
  }

  OnMessage = (message, command) => {
    if (command === "get_all_messages") {
      this.setState({
        messages: message.reverse(),
      });
    }
    if (command === "new_message") {
      this.setState({
        messages: [...this.state.messages, message],
      });
    }
  };

  sendMessage = (messageObject) => {
    try {
      ws.send(JSON.stringify({ ...messageObject }));
    } catch (err) {
      console.log(err.message);
    }
  };

  scrollToBottom = () => {
    // const chat = this.messagesEnd;
    // const scrollHeight = chat.scrollHeight;
    // const height = chat.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  messageChangeHandler = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  sendMessageHandler = (e, message) => {
    const messageObject = {
      command: "new_message",
      username: username,
      content: message,
    };
    this.sendMessage(messageObject);
    this.setState({
      message: "",
    });

    e.preventDefault();
  };

  renderMessages = () => {
    return this.state.messages.map((message) => {
      return (
        <div key={message.id}>
          <h4> {message.user}</h4>
          <h4>{message.created_date}</h4>
          <p>{message.content}</p>
        </div>
      );
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const messages = this.state.messages;
    return username == null ? (
      <div>
        <h1>You need to log in to see your profile</h1>
      </div>
    ) : (
      <div className="chat">
        <div className="container">
          <h1>Chatting as {username}</h1>
          <h3>Displaying only the recent 50 messages</h3>

          {messages && this.renderMessages()}
        </div>
        <div className="container message-form">
          <form
            onSubmit={(e) => this.sendMessageHandler(e, this.state.message)}
            className="form"
          >
            <input
              type="text"
              onChange={this.messageChangeHandler}
              value={this.state.message}
              placeholder="Start Typing"
              required
            />
            <button type="submit" className="submit" value="Submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
