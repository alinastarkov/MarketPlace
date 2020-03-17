import React, { useState } from "react";
import "./App.css";
import { Input } from "antd";
import { getItems } from "../src/API/ItemsAPI";

const { Search } = Input;

function App() {
  const [text, setData] = useState("Nothing was clicked");

  function handleItemSearch(e) {
    getItems().then(response => setData(response));
  }

  return (
    <div className="App">
      <h1>Welcome to the market place</h1>
      <div className="searchButton">
        <Search
          placeholder="Sessun Navy Wool Coat"
          enterButton="Search"
          size="large"
          onSearch={handleItemSearch}
        />
      </div>
      <h2>{text}</h2>
    </div>
  );
}

export default App;
