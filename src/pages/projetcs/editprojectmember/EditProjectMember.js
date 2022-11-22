import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { Select as SelectM } from "@mui/material";

import {
  update_project_member,
} from "../../../http_requests/httpreq";

import { mainThemeColor, lightThemeColor } from "../../../constants/constant";

const EditProjectMember = (props) => {
  // const { user } = useUserContext();

  const [adminData, setadminData] = useState();
  // const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setadminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const fetchData = useCallback(async () => {
    setadminData(props.editData);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleSubmit = (e) => {
    if (adminData.share_amount) {
      update_project_member(adminData).then((res) => {
        if (res.data.success === 1) {
          props.handleCloseEditMemberModal();
          props.fetchData();
        }
        if (res.data.success === 0) {
          window.alert(res.data.message);
          props.fetchData();
        }
      });
    } else {
      window.alert("Input Share Amount");
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            width: "100%",
            borderRadius: "10px",
            margin: "60px auto",
          }}
        >
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                //   flexDirection: windowWidth.width < 800 ? "column" : "row",
              }}
            >
              <div
                style={{
                  width: "100%",
                  marginBottom: "25px",
                }}
              >
                <span style={{ color: mainThemeColor, fontWeight: 700 }}>
                  Member Name:{" "}
                </span>
                <span style={{ color: "#000000", fontWeight: 700 }}>
                  {adminData?.member_name}
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Share Amount"
                  value={adminData?.share_amount}
                  focused
                  onChange={handleChange}
                  name="share_amount"
                  variant="outlined"
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ margin: "auto" }}>
                <Button
                  style={{
                    textTransform: "none",
                    color: "gray",
                    marginRight: "50px",
                  }}
                  onClick={props.handleCloseAddMemberModal}
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  style={{ textTransform: "none", color: mainThemeColor }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectMember;
