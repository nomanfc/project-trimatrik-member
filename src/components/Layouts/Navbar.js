import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../../contexts/UserContext";

import { mainThemeColor } from "../../constants/constant";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const Navbar = () => {
  const size = useWindowSize();
  const { user, logout } = useUserContext();

  return (
    <>
      <div
        style={{
          display: size.width <= 730 ? "none" : "flex",
          width: "50%",
          height: "100%",
          flexDirection: "column",
          paddingTop: "25px",
        }}
      >
      </div>

      <div
        style={{
          display: "flex",
          width: size?.width <= 730 ? "100%" : "50%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {user && (
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#202124",
              textTransform: "capitalize",
            }}
          >
            <span style={{ color: mainThemeColor }}>{user?.name}</span>{" "}
          </div>
        )}
        <IconButton onClick={logout}>
          <LogoutIcon style={{ color: "red", fontWeight: 700 }} />
        </IconButton>
      </div>
    </>
  );
};

export default Navbar;
