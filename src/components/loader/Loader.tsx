import React from "react";
import { useNavigation } from "react-router-dom";
import { Spin } from "antd";

const PageLoader = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999
      }}>
        <Spin size="large" tip="loading..." />
        hiii
      </div>
    );
  }

  return null;
};

export default PageLoader;
