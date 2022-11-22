import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { mainThemeColor, lightThemeColor } from "../../constants/constant";
import { useUserContext } from "../../contexts/UserContext";
import { menu, menuDisapprove } from "../../utils/sidebarMenuItems";
import { hasChildren } from "../../utils/checkHasChildren";

export default function App() {
  const { user } = useUserContext();

  if (user?.is_approved === 1) {
    return menu.map((item, key) => <MenuItem key={key} item={item} />);
  } else {
    return menuDisapprove.map((item, key) => (
      <MenuItem key={key} item={item} />
    ));
  }
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item, drawerWidth }) => {
  const router = useRouter();
  const subUrls = router.pathname.split("/");
  const subUrl = subUrls[subUrls.length - 1];
  return (
    <Link href={item?.to || ""}>
      <ListItem
        button
        style={{
          borderLeft: subUrl === item?.onActive ? "4px solid #FFFFFF" : "none",
          background:
            subUrl === item?.onActive
              ? `linear-gradient(90deg, ${lightThemeColor} 0%, rgba(38, 82, 4, 0) 100%)`
              : "none",
        }}
      >
        <ListItemIcon style={{ minWidth: "40px", color: "white" }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          style={{
            display: drawerWidth <= 70 ? "none" : "block",
            color: "white",
            fontFamily: "Poppins",
          }}
        />
      </ListItem>
    </Link>
  );
};

const MultiLevel = ({ item, drawerWidth }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon style={{ minWidth: "40px", color: "white" }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          style={{
            display: drawerWidth <= 70 ? "none" : "block",
            color: "white",
          }}
        />
        {open ? (
          <ExpandLessIcon style={{ color: "white" }} />
        ) : (
          <ExpandMoreIcon style={{ color: "white" }} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
