import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { SignInPopup } from "../Components/Popup/SignInPopup";
import { SignUpPopup } from "../Components/Popup/SignUpPopup";
import * as UserManagement from "../API/UserManagementAPI";

const { Header } = Layout;

export function Navbar() {
  const [signInVisible, setSigninPopup] = useState(false);
  const [signUpVisible, setSignupPopup] = useState(false);
  const [isSignedin, setSignin] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleSigninClick = () => {
    setSigninPopup(true);
  };

  const handleSignupClick = () => {
    setSignupPopup(true);
  };

  const onCancelSignin = () => {
    setSigninPopup(false);
  };

  const onCreateSignin = values => {
    UserManagement.login(values).then(reponse => {
      localStorage.setItem("token", reponse.token);
      setSignin(true);
    });
    setSigninPopup(false);
  };

  const onCancelSignUp = () => {
    setSignupPopup(false);
  };

  const onCreateSignUp = values => {
    UserManagement.signup(values);
    setSignupPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSignin(false);
  };

  const generateSignInNav = (
    <Menu
      className="menu-item-group"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1" onClick={handleLogout}>
        My profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
      <Menu.Item key="3">Your basket</Menu.Item>
    </Menu>
  );

  const generatenotSignInNav = (
    <Menu
      className="menu-item-group"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1" onClick={handleSigninClick}>
        Sign in
      </Menu.Item>
      <SignInPopup
        visible={signInVisible}
        onCreate={onCreateSignin}
        onCancel={onCancelSignin}
      />
      <Menu.Item key="2" onClick={handleSignupClick}>
        Sign up
      </Menu.Item>
      <SignUpPopup
        visible={signUpVisible}
        onCreate={onCreateSignUp}
        onCancel={onCancelSignUp}
      />
      <Menu.Item key="3">Your basket</Menu.Item>
    </Menu>
  );

  return (
    <Header>{isSignedin ? generateSignInNav : generatenotSignInNav}</Header>
  );
}
