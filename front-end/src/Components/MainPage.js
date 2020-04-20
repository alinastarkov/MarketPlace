import React, { useState, useEffect } from "react";
import "../App.css";
import { getItems } from "../API/ItemsAPI";
import { Input, Card, Button, Modal } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  addItemToBasket,
  setAllItems,
  setTotalPrice,
} from "../GlobalStateManagement/Actions/index";
import { calculateTotal } from "../utils/utilsFunction";
import { connect } from "react-redux";
import HeaderImage from "../../Images/1.jpg";

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
    textAlign: "center",
  };

  const handleItemSearch = () => {};

  const fetchallItems = () => {
    getItems(username).then((response) => {
      props.setItemData(response);
      setItemData(response);
    });
  };

  useEffect(() => {
    props.allItems.length === 0 ? setNoItem(true) : setNoItem(false);
  }, [props.allItems]);

  const addItemToBasket = (itemIndex) => (event) => {
    props.addItemToBasket(props.allItems[itemIndex]);
    setModalVisble(true);
    decrementItemInventory(itemIndex);
  };

  useEffect(() => {
    props.updateTotalPrice(calculateTotal(props.basket));
  }, [props.basket]);

  //TODO: think about multi threading?
  const decrementItemInventory = (index) => {
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
    <div>
      <h1>Shop All Items</h1>
      {allItems.map((item, i) => (
        <div key={i}>
          <Card.Grid style={gridStyle}>
            {" "}
            <Card
              cover={
                <img
                  alt="example"
                  src={require(`../../../backend/marketplace${item.image}`)}
                  style={{ height: "auto" }}
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
              <p>Brand : {item.brand}</p>
              <p>Price : {item.price}</p>
              <p>Number of Items Available : {item.inventory}</p>
            </Card>
          </Card.Grid>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <img className="header-img" src={HeaderImage} />
      {/* <div className="searchButton">
        <Search
          placeholder="Sessun Navy Wool Coat"
          enterButton="Search"
          size="large"
          onSearch={handleItemSearch}
        />
      </div> */}
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

const mapStateToProps = (state) => {
  return {
    basket: state.BasketReducer.basket,
    allItems: state.ItemReducer.items.allItems,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addItemToBasket: (item) => dispatch(addItemToBasket(item)),
    setItemData: (allItems) => dispatch(setAllItems(allItems)),
    updateTotalPrice: (newPrice) => dispatch(setTotalPrice(newPrice)),
  };
}
const ConnectedMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default ConnectedMainPage;
