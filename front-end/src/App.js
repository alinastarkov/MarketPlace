import React from "react";
import "./App.css";
import { Layout } from "antd";
import { Navbar } from "../src/Components/Navbar";
import MainPage from "../src/Components/MainPage";
import SellItemForm from "../src/Components/Forms/SellItemForm";
import ProfilePage from "../src/Components/ProfilePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Navbar />
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={MainPage}></Route>
              <Route path="/sell" component={SellItemForm}></Route>
              <Route path="/profile" component={ProfilePage}></Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2019 Created by Haylee Luu / Daphne Hegedus/ Jessica Liu with ♥
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
