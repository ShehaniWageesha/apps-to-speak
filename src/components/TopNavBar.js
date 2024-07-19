import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import Logo from "../assets/logo.png";

const { Header } = Layout;

const TopNavBar = () => {
  return (
    <Layout>
      <Header
        style={{
          background: "#f9f9f9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "76px",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={Logo} alt="Logo" style={{ height: 38, width: 209 }} />
          </div>
        </div>
        <Menu
          mode="horizontal"
          style={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            background: "#f9f9f9",
            border: "none",
            gap: "20px",
            color: "#373737",
          }}
        >
          <Menu.Item key="1">
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/pricing">Pricing</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/support">Support</Link>
          </Menu.Item>
        </Menu>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              height: "44px",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid #90E5FF",
              color: "#00A9FF",
              fontWeight: "bold",
              background: "transparent",
            }}
          >
            Practice for Free&nbsp;&nbsp;
            <ArrowRightOutlined />
          </Button>
        </div>
      </Header>
    </Layout>
  );
};

export default TopNavBar;
