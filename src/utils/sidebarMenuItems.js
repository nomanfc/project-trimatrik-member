import React from "react";

/* Menu Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import GavelIcon from "@mui/icons-material/Gavel";
import MailIcon from "@mui/icons-material/Mail";
import CommentIcon from "@mui/icons-material/Comment";

import GradingIcon from "@mui/icons-material/Grading";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import PaymentIcon from "@mui/icons-material/Payment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import { FaBloggerB } from "react-icons/fa";
import { GoProject } from "react-icons/go";

export const menu = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    to: "/",
    onActive: "",
  },
  {
    icon: <GradingIcon />,
    title: "Projects",
    to: "/projects/allprojects",
    onActive: "allprojects",
  },
  {
    icon: <PaymentIcon />,
    title: "Member payable",
    onActive: "memberpayable",
    to: "/memberpayable",
  },

  {
    icon: <RequestPageIcon />,
    title: "Payout Request",
    to: "/payoutrequest",
    onActive: "payoutrequest",
  },

  {
    icon: <SettingsIcon />,
    title: "My Profile",
    to: "/settings",
    onActive: "settings",
  },
];

export const menuDisapprove = [

  {
    icon: <PaymentIcon />,
    title: "Member payable",
    onActive: "memberpayable",
    to: "/memberpayable",
  },
];

// {
//   icon: <FaBloggerB style={{fontSize:"22px"}} />,
//   title: "Blogs",
//   onActive: "blogs",
//   items: [
//     {
//       title: "All Blogs",
//       to: "/blogs/",
//       onActive: "blogs",
//     },
//     {
//       title: "Create Blog",
//       to: "/blogs/createblog",
//       onActive: "createblog",
//     },
//   ],
// },
