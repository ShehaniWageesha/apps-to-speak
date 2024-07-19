import React from "react";
import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import Logo from "../assets/logo-white.png";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        background: "#0C2837",
        color: "#ffffff",
        padding: "40px 16px",
        textAlign: "center",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        boxSizing: "border-box",
      }}
    >
      <div>
        <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
          <Col span={24}>
            <div className="logo" style={{ marginBottom: "10px" }}>
              <img src={Logo} alt="Logo" style={{ height: 38, width: 155 }} />
            </div>
          </Col>
          <Col span={24} style={{ marginBottom: "60px" }}>
            <p
              style={{
                maxWidth: "390px",
                height: "40px",
                gap: "0px",
                opacity: "0.5",
                fontWeight: "400",
                lineHeight: "20.16px",
                textAlign: "center",
                color: "#FFFFFF",
                margin: "0 auto",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </Col>
          <Col span={24} style={{ marginBottom: "60px" }}>
            <Row justify="center" gutter={[48, 16]}>
              <Col>
                <a href="/courses" style={{ color: "#ffffff" }}>
                  Courses
                </a>
              </Col>
              <Col>
                <a href="/pricing" style={{ color: "#ffffff" }}>
                  Pricing
                </a>
              </Col>
              <Col>
                <a href="/contact" style={{ color: "#ffffff" }}>
                  Contact
                </a>
              </Col>
              <Col>
                <a href="/support" style={{ color: "#ffffff" }}>
                  Support
                </a>
              </Col>
              <Col>
                <a href="/faqs" style={{ color: "#ffffff" }}>
                  FAQs
                </a>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row justify="center" gutter={[32, 16]}>
              <Col>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlined
                    style={{ fontSize: "24px", color: "#B0B0B0" }}
                  />
                </a>
              </Col>
              <Col>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterOutlined
                    style={{ fontSize: "24px", color: "#B0B0B0" }}
                  />
                </a>
              </Col>
              <Col>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramOutlined
                    style={{ fontSize: "24px", color: "#B0B0B0" }}
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default FooterComponent;
