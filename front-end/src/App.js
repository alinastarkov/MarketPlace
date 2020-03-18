import React, { useState } from "react";
import "./App.css";
import { Input } from "antd";
import { getItems } from "../src/API/ItemsAPI";
import { Layout } from "antd";
import { Navbar } from "../src/Components/Navbar";

const { Search } = Input;
const { Content, Footer } = Layout;

function App() {
  const [text, setData] = useState("Nothing was clicked");

  const handleItemSearch = () => {
    getItems().then(response => setData(response));
  };

  return (
    <Layout className="layout">
      <Navbar />
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
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
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©2019 Created by Haylee Luu / Daphne Hegedus/ Jessica Liu with ♥
      </Footer>
    </Layout>
  );
}

export default App;
