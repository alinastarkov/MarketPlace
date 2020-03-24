import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { getItems } from "../API/ItemsAPI";
import { Input, Card, Button, Modal } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  addItemToBasket,
  setAllItems
} from "../GlobalStateManagement/Actions/index";
import { connect } from "react-redux";
const { Search } = Input;

function MainPage(props) {
  const username = localStorage.getItem("username");
  const [allItems, setItemData] = useState([]);
  const [noItem, setNoItem] = useState(true);
  const [userID] = useState(0);
  const [confirmVisible, setModalVisble] = useState(false);

  const gridStyle = {
    width: "25%",
    height: "25%",
    textAlign: "center"
  };

  const handleItemSearch = () => {};

  const fetchallItems = () => {
    getItems(username).then(response => {
      props.setItemData(response);
      setItemData(response);
    });
  };

  useEffect(() => {
    props.allItems.length === 0 ? setNoItem(true) : setNoItem(false);
  }, [props.allItems]);

  const addItemToBasket = itemIndex => event => {
    props.addItemToBasket(props.allItems[itemIndex]);
    setModalVisble(true);
    decrementItemInventory(itemIndex);
  };

  //TODO: think about multi threading?
  const decrementItemInventory = index => {
    let clone = Object.assign({}, allItems[index]);
    const inventory = parseInt(clone.inventory);
    clone.inventory = inventory - 1;
    const newItemArray = allItems.slice();
    newItemArray[index] = clone;
    setItemData(newItemArray);
  };

  useEffect(() => {
    fetchallItems();
  }, [userID]);

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
                disabled={item.inventory <= 0 ? true : false}
              >
                Buy now
              </Button>
              {item.inventory <= 0 ? <p>OUT OF STOCK</p> : <p></p>}
              <p>Name : {item.name}</p>
              <p>Description : {item.description}</p>
              <p>Price : {item.price}</p>
              <p>Brand : {item.brand}</p>
              <p>Category : {item.category}</p>
              <p>Size : {item.size}</p>
              <p>Number of Items Available : {item.inventory}</p>
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
      <Modal
        title="Add Item Confirmation"
        visible={confirmVisible}
        onOk={() => setModalVisble(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>The Item has been added to your basket</p>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    basket: state.BasketReducer.basket,
    allItems: state.ItemReducer.items.allItems
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addItemToBasket: item => dispatch(addItemToBasket(item)),
    setItemData: allItems => dispatch(setAllItems(allItems))
  };
}
const ConnectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default ConnectedMainPage;
