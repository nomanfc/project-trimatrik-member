import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { mainThemeColor } from "../../constants/constant.js";

import {
  get_all_designation,
  get_all_cadre,
  update_password,
} from "../../http_requests/httpreq";
import { useUserContext } from "../../contexts/UserContext.js";

const ChangePassword = (props) => {
  const { user } = useUserContext();
  const [pass, setPass] = useState();

  const handleChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const handleChangePass = () => {
    if (pass?.new_password && pass?.old_password) {
      if (pass.new_password === pass.cPass) {
        if (pass.new_password !== pass.old_password) {
          update_password(pass, user?.member_id).then((res) => {
            if (res.data.success === 1) {
              props.setMsgS(res.data.message);
              props.handleClose();
              props.setSnackbarS(true);
              props.fetchData();
            } else {
              window.alert(res.data.data);
            }
          });
        } else {
          window.alert("New password is same as old password!!");
        }
      } else {
        window.alert("New password and Confirm password mismatch");
      }
    }
    else{
        window.alert("Fill up the input field first")
    }
  };

  return (
    <>
      <div>
        <TextField
          size="small"
          fullWidth
          type="password"
          id="outlined-basic"
          label="Enter Old Password"
          name="old_password"
          onChange={handleChange}
          style={{ marginTop: "15px" }}
          variant="outlined"
        />
      </div>

      <div>
        <TextField
          size="small"
          fullWidth
          type="password"
          id="outlined-basic"
          label="Enter New Password"
          name="new_password"
          onChange={handleChange}
          style={{ marginTop: "15px" }}
          variant="outlined"
        />
      </div>

      <div>
        <TextField
          size="small"
          fullWidth
          type="password"
          id="outlined-basic"
          label="Enter Confirm Password"
          name="cPass"
          onChange={handleChange}
          style={{ marginTop: "15px" }}
          variant="outlined"
        />
      </div>

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
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleChangePass}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Change
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
