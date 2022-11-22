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
  add_project_member,
  get_all_members,
  get_all_designation,
} from "../../../http_requests/httpreq";
import { mainThemeColor, lightThemeColor } from "../../../constants/constant";

const AddProjectMember = (props) => {
  // const { user } = useUserContext();
  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [designation, setDesignation] = React.useState(null);
  const [alluser, setAlluser] = useState([""]);

  const [adminData, setadminData] = useState();
  // const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setadminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const [desig, setdesig] = React.useState("");

  const handleChangeDesignation = (event) => {
    setdesig(event.target.value);
    setadminData({ ...adminData, [event.target.name]: event.target.value });
  };

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
    setadminData({
      ...adminData,
      member_id: value?.id,
      project_id: parseInt(props.projectId),
    });
  }, [value]);

  useEffect(() => {
    fetchData().catch(console.error);
    get_all_designation().then((res) => {
      setDesignation(res.data.data);
    });
  }, [fetchData]);

  const handleSubmit = (e) => {
    if (adminData.member_id && adminData.share_amount) {
      add_project_member(adminData).then((res) => {
        if (res.data.success === 1) {
          props.fetchData();
        }
        if (res.data.success === 0) {
          window.alert(res.data.message);
        }
      });
    } else {
      window.alert("Select New Member");
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
                  marginBottom: "15px",
                }}
              >
                <Autocomplete
                  options={alluser}
                  getOptionLabel={(option) => option?.name}
                  size="small"
                  id="movies"
                  value={value}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setValue(newValue);
                      setId(newValue?.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Member" />
                  )}
                />
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
                  Add Member
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectMember;
