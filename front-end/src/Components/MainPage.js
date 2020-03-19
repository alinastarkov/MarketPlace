import React, { useState } from "react";
import "../App.css";
import { getItems } from "../API/ItemsAPI";
import { Input } from "antd";
const { Search } = Input;

export default function MainPage() {
  const [text, setData] = useState("Nothing was clicked");

  const handleItemSearch = () => {
    getItems().then(response => setData(response));
  };
  return (
    <div>
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
