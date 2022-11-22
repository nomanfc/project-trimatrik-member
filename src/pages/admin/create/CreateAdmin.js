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
  create_admin,
  get_all_members,
  get_all_designation,
} from "../../../http_requests/httpreq";
import { mainThemeColor, lightThemeColor } from "../../../constants/constant";

const CreateAdmin = () => {
  // const { user } = useUserContext();
  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [designation, setDesignation] = React.useState(null);
  const [alluser, setAlluser] = useState();

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
    setadminData({ ...adminData, member_id: value?.id, access_type_id: 2 });
  }, [value]);

  useEffect(() => {
    fetchData().catch(console.error);

    get_all_designation().then((res) => {
      setDesignation(res.data.data);
    });
  }, [fetchData]);

  const handleSubmit = (e) => {
    if (
      adminData.password &&
      adminData.member_id &&
      adminData.admin_user_name
    ) {
      adminData.password === adminData.cpassword
        ? create_admin(adminData).then((res) => {
            if (res.data.success === 1) {
              Router.push("/admins/alladmins");
            }
            if (res.data.success === 0) {
              window.alert(res.data.messdesig);
            }
          })
        : window.alert("Password and Confirm passsword not matched!");
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            width: "700px",
            borderRadius: "10px",
            margin: "60px auto",
            height: "550px",
            // boxShadow:
            //   "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",

            boxShadow: ` rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset`,
          }}
        >
          <div
            style={{
              padding: "30px 55px",
              width: "100%",
              background: lightThemeColor,
              color: "#FFFFFF",
              fontSize: "18px",
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            Create New Admin
          </div>

          <div
            style={{
              padding: "30px 55px",
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
                justifyContent: "space-between",
                //   flexDirection: windowWidth.width < 800 ? "column" : "row",
              }}
            >
              <div
                style={{
                  width: "47%",
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
                  width: "47%",
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <SelectM
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={desig}
                    label="Designation"
                    name="designation_id"
                    onChange={handleChangeDesignation}
                  >
                    {designation?.map((data, index) => (
                      <MenuItem key={index} value={data?.id}>
                        {data?.value}
                      </MenuItem>
                    ))}
                  </SelectM>
                </FormControl>
              </div>
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
                  label="Username"
                  onChange={handleChange}
                  name="admin_user_name"
                  variant="outlined"
                />
              </div>
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
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  onChange={handleChange}
                  name="password"
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
                  type="password"
                  id="outlined-basic"
                  label="Confirm Password"
                  onChange={handleChange}
                  name="cpassword"
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
                  margin: "100px auto auto auto",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => Router.push("/admins/alladmins")}
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
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
