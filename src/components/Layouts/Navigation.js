import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";

import Navbar from "./Navbar";
import HsLogo from "../../../public/Logo.png";
import { mainThemeColor } from "../../constants/constant";

import SidebarMenu from "../SidebarMenu/SidebarMenu";
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

export default function Navigation({ children }) {
  const size = useWindowSize();
  const router = useRouter();

  const drawerWidth = size.width <= 730 ? 55 : 280;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(5, 3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
      background: "#FFFFFF",
      minHeight: "100vh",
    })
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    boxShadow: "1px 1px 10px rgb(0 0 0 / 10%)",
    background: "#FFFFFF",
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const [open, setOpen] = useState(size.width <= 730 ? false : true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <div
            style={{
              width: "100%",
              height: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Navbar />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          background: mainThemeColor,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: mainThemeColor,
            boxShadow: "none",
          },
          boxShadow: "none",
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div
            style={{
              margin: drawerWidth <= 70 ? "25px auto" : "50px auto",
              width: drawerWidth <= 70 ? "90%" : "",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              priority
              src="MainLogo.png"
              width={120}
              height={80}
              alt="HangerStock"
            />
          </div>
        </DrawerHeader>

        <SidebarMenu drawerWidth={drawerWidth} />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
