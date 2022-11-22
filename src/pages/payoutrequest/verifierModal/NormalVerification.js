import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { mainThemeColor } from "../../../constants/constant.js";

const NormalVerification = (props) => {
  return (
    <div>
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "auto" }}>
          <Button
            style={{
              textTransform: "none",
              color: "gray",
              marginRight: "50px",
            }}
            onClick={props.handleCloseApproveModal}
          >
            Cancel
          </Button>
          <Button
            onClick={props.handleVerification}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NormalVerification;
