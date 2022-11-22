import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

import { mainThemeColor } from "../../constants/constant";
import {
  update_member_phone,
  get_member_by_id,
} from "../../http_requests/httpreq";

const UpdatePhone = (props) => {
  const [updatePhoneData, setUpdatePhoneData] = useState();

  const handleChangePhone = (e) => {
    setUpdatePhoneData({ ...updatePhoneData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    get_member_by_id(props.user.id).then((res) => {
      setUpdatePhoneData(res.data.data);
    });
  }, []);

  const handleUpdatePhone = (e) => {
    update_member_phone(updatePhoneData).then((res) => {
      if (res.data.success === 1) {
        props.setMsgS(res.data.message);
        props.handleCloseUpdatePhoneModal();
        props.setSnackbarS(true);
        props.fetchData();
      } else {
        window.alert(res.data.message);
      }
    });
  };

  return (
    <div>
      <div>
        <div
          style={{
            width: "100%",
            marginTop: "30px",
          }}
        >
          <TextField
            size="small"
            fullWidth
            focused
            id="outlined-basic"
            label="Phone Number"
            onChange={handleChangePhone}
            value={updatePhoneData?.phone}
            name="phone"
            variant="outlined"
          />
        </div>
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
            onClick={props.handleCloseUpdatePhoneModal}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdatePhone}
            style={{ textTransform: "none", color: mainThemeColor }}
          >
            Update Phone number
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePhone;
