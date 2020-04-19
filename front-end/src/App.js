import React from "react";
import "./App.css";
import { Layout, PageHeader } from "antd";
import { Navbar } from "../src/Components/Navbar";
import MainPage from "../src/Components/MainPage";
import SellItemForm from "../src/Components/Forms/SellItemForm";
import UserItemPage from "../src/Components/MyItemSell";
import MyBasketPage from "../src/Components/MyBasket";
import CheckoutForm from "../src/Components/Forms/CheckoutForm";
import MyOrder from "../src/Components/MyOrders";
import ChatComponent from "../src/Components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../src/GlobalStateManagement/Reducer/Reducer";

const { Content, Footer } = Layout;
const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="layout">
          <Navbar />
          <div className="site-page-header">
            <h1>Peluche</h1>
          </div>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/" component={MainPage}></Route>
                <Route path="/sell" component={SellItemForm}></Route>
                <Route path="/edit/*" component={SellItemForm}></Route>
                <Route path="/user-item" component={UserItemPage}></Route>
                <Route path="/basket" component={MyBasketPage}></Route>
                <Route path="/checkout" component={CheckoutForm}></Route>
                <Route path="/user-order" component={MyOrder}></Route>
                <Route path="/chat" component={ChatComponent}></Route>
              </Switch>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
            ©2019 Created by Haylee Luu / Daphne Hegedus/ Jessica Liu with ♥
          </Footer> */}
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
