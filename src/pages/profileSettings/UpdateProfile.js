import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Select as SelectM } from "@mui/material";

import {
  update_member_panel,
  get_all_members,
  get_all_cadre,
} from "../../http_requests/httpreq";
import { mainThemeColor, lightThemeColor } from "../../constants/constant";
import { useUserContext } from "../../contexts/UserContext";
import { TryRounded } from "@mui/icons-material";

const UpdateProfile = (props) => {
  const { user } = useUserContext();
  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [cadre, setCadre] = React.useState(null);
  const [alluser, setAlluser] = useState();

  const [checked, setChecked] = useState(false);

  const [memberData, setmemberData] = useState(props?.profileData);
  // const [duplicate, setDuplicate] = useState(false);

  const [cad, setCad] = React.useState("");

  const handleChangeCadre = (event) => {
    setCad(event.target.value);
    setmemberData({ ...memberData, [event.target.name]: event.target.value });
  };

  const handleChangeMember = (event) => {
    setmemberData({ ...memberData, [event.target.name]: event.target.value });
  };

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
    setmemberData({
      ...memberData,
      active_admin_id: user?.member_id,
      access_type_id: 3,
    });
  }, [value]);

  useEffect(() => {
    fetchData().catch(console.error);

    get_all_cadre().then((res) => {
      setCadre(res.data.data);
    });
  }, [fetchData]);

  const handleSubmit = (e) => {
    if (memberData.first_name && memberData.cadre_type_id) {
      update_member_panel(memberData).then((res) => {
        if (res.data.success === 1) {
          props.handleCloseUpdateProfileModal();
          props.setMsgS(res.data.message);
          props.setSnackbarS(true);
          props.fetchData();
        }
        if (res.data.success === 0) {
          window.alert(res.data.message);
        }
      });
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
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
              marginTop: "15px",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="First Name"
                name="first_name"
                value={memberData?.first_name}
                onChange={handleChangeMember}
                variant="outlined"
              />
            </div>

            <div
              style={{
                width: "47%",
              }}
            >
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Last Name"
                name="last_name"
                value={memberData?.last_name}
                onChange={handleChangeMember}
                variant="outlined"
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              marginTop: "15px",
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Cadre Type</InputLabel>
              <SelectM
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Cadre Type"
                name="cadre_type_id"
                value={parseInt(memberData?.cadre_type_id)}
                onChange={handleChangeCadre}
              >
                {cadre?.map((data, index) => (
                  <MenuItem key={index} value={data?.id}>
                    {data?.value}
                  </MenuItem>
                ))}
              </SelectM>
            </FormControl>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "15px",
              justifyContent: "space-between",
              //   flexDirection: windowWidth.width < 800 ? "column" : "row",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                label="Email"
                name="email"
                value={memberData?.email}
                onChange={handleChangeMember}
                variant="outlined"
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                margin: "30px auto 30px auto",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={props.handleCloseUpdateProfileModal}
                style={{
                  textTransform: "none",
                  background: "gray",
                  color: "#FFFFFF",
                  width: "47%",
                  padding: "10px 100px",
                  marginRight: "20px",
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                style={{
                  textTransform: "none",
                  background: mainThemeColor,
                  width: "47%",
                  color: "#FFFFFF",
                  padding: "10px 100px",
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
