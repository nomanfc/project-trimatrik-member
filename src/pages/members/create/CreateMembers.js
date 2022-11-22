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
  create_member,
  get_all_members,
  get_all_cadre,
} from "../../../http_requests/httpreq";
import { mainThemeColor, lightThemeColor } from "../../../constants/constant";
import { useUserContext } from "../../../contexts/UserContext";

const CreateMember = () => {
  const { user } = useUserContext();
  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [cadre, setCadre] = React.useState(null);
  const [alluser, setAlluser] = useState();

  const [checked, setChecked] = useState(false);

  const [memberData, setmemberData] = useState({ is_new_member: 1 });
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

  const handleChangeCheck = (e) => {
    setChecked(e.target.checked);
    e.target.checked === true
      ? setmemberData({ ...memberData, is_new_member: 0 })
      : setmemberData({ ...memberData, is_new_member: 1 });
  };

  const handleSubmit = (e) => {
    if (
      memberData.password &&
      memberData.first_name &&
      memberData.email &&
      memberData.password &&
      memberData.cadre_type_id
    ) {
      memberData.password === memberData.cpassword
        ? create_member(memberData).then((res) => {
            if (res.data.success === 1) {
              Router.push("/members/allmembers");
            }
            if (res.data.success === 0) {
              window.alert(res.data.message);
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
            height: "auto",
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
            Create New Member
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
                <InputLabel id="demo-simple-select-label">
                  Cadre Type
                </InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cad}
                  label="Cadre Type"
                  name="cadre_type_id"
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
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  name="email"
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
                  label="Phone"
                  name="phone"
                  onChange={handleChangeMember}
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
                  name="password"
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
                  type="password"
                  id="outlined-basic"
                  label="Confirm Password"
                  name="cpassword"
                  onChange={handleChangeMember}
                  variant="outlined"
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                marginTop: "15px",
                justifyContent: "space-between",
                // display: checked ? "none" : "flex",
                display: "none",
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
                  label="Payment Type"
                  name="payment_type"
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
                  label="Payment"
                  name="payment"
                  onChange={handleChangeMember}
                  variant="outlined"
                />
              </div>
            </div>

            <div style={{ width: "100%", marginTop: "30px" }}>
              <FormControlLabel
                control={
                  <Checkbox name="is_new_member" onChange={handleChangeCheck} />
                }
                label="This is an existing member"
              />
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
                  onClick={() => Router.push("/members/allmembers")}
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

export default CreateMember;
