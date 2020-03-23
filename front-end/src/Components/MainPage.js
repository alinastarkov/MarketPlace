import React, { useState, useEffect } from "react";
import "../App.css";
import { getItems } from "../API/ItemsAPI";
import { Input, Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function MainPage() {
  const [allItems, setData] = useState([]);
  const username = localStorage.getItem("username");
  const [noItem, setNoItem] = useState(true);
  const [userID] = useState(0);

  const gridStyle = {
    width: "25%",
    height: "25%",
    textAlign: "center"
  };

  const handleItemSearch = () => {};

  const fetchAllItems = () => {
    getItems(username).then(response => setData(response));
  };

  const addItemToBasket = itemIndex => event => {};

  useEffect(() => {
    fetchAllItems();
  }, [userID]);

  useEffect(() => {
    allItems.length === 0 ? setNoItem(true) : setNoItem(false);
  }, [allItems]);

  const itemCard = (
    <Card title="Available Item">
      {allItems.map((item, i) => (
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
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                onClick={addItemToBasket(i)}
              >
                Buy now
              </Button>
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
      {noItem ? <h2>There is no available items right now</h2> : itemCard}
    </div>
  );
}
