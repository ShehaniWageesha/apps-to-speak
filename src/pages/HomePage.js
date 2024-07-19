import React from "react";
import { Button } from "antd";
import homeImage from "../assets/home-page-image.png";
import logoImage from "../assets/home-text-image.png";

const HomePage = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#E2F8FF",
          height: "660px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${homeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "68px",
            fontWeight: "bold",
          }}
        >
          <div>
            2x Boost{" "}
            <img
              src={logoImage}
              alt="Logo"
              style={{ verticalAlign: "middle" }}
            />{" "}
            Your
          </div>
          <div>English Speaking</div>
          <Button
            style={{
              marginTop: "20px",
              background:
                "linear-gradient(279.77deg, #90E5FF 5.41%, #00A9FF 92.45%)",
              color: "#ffffff",
              border: "none",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "20px 24px",
            }}
          >
            Start Now
          </Button>
        </div>
      </div>
      <div
        style={{
          height: "700px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            background: "linear-gradient(90.86deg, #102E3D 0%, #508FAA 99.56%)",
            color: "#ffffff",
            padding: "20px 40px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          Best English speaking assistant with happy users around the world
        </div>
      </div>
      <div
        style={{
          height: "1000px",
          backgroundColor: "#ffffff",
        }}
      ></div>
    </>
  );
};

export default HomePage;
