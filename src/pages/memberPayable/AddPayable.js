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
  add_payable,
  get_all_payment_type_data,
  get_all_members,
  get_all_project_by_member_id,
  get_share_amount,
} from "../../http_requests/httpreq";
import { mainThemeColor, lightThemeColor } from "../../constants/constant";

const AddPayable = () => {
  // const { user } = useUserContext();
  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [designation, setDesignation] = React.useState([{}]);
  const [payType, setPayType] = React.useState(null);
  const [pay, setPay] = useState();
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

  const handleChangePay = (event) => {
    setPay(event.target.value);
    setadminData({ ...adminData, [event.target.name]: event.target.value });
  };

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
    setadminData({ ...adminData, member_id: value?.id });
  }, [value]);

  useEffect(() => {
    fetchData().catch(console.error);
    get_all_payment_type_data().then((res) => {
      setPayType(res.data.data);
    });
  }, [fetchData]);

  const handleSubmit = (e) => {
    add_payable(adminData).then((res) => {
      if (res.data.success === 1) {
        Router.push("/memberpayable");
      }
      if (res.data.success === 0) {
        window.alert(res.data.message);
      }
    });
  };

  const [shareAmount, setShareAmount] = useState();

  useEffect(() => {
    get_share_amount(adminData?.member_id, adminData?.project_id).then(
      (res) => {
        setShareAmount(res.data.data?.share_amount);
      }
    );

    get_all_project_by_member_id(value?.id).then((res) => {
      if (res.data.success === 1) {
        setDesignation(res.data.data);
      }
    });
  }, [adminData]);

  return (
    <div>
      <div>
        <div
          style={{
            width: "700px",
            borderRadius: "10px",
            margin: "60px auto",
            height: "fit-content",
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
            Create Payable
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
                    Select Payment Type
                  </InputLabel>
                  <SelectM
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pay}
                    label="Select Payment Type"
                    name="payment_type_id"
                    onChange={handleChangePay}
                  >
                    {payType?.map((data, index) => (
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
                marginTop: "15px",
                width: "100%",

                display:
                  adminData?.payment_type_id === 3 ||
                  adminData?.payment_type_id === 4
                    ? "flex"
                    : "none",
              }}
            >
              <FormControl
                fullWidth
                size="small"
                style={{
                  display:
                    adminData?.payment_type_id === 3 ||
                    adminData?.payment_type_id === 4
                      ? "flex"
                      : "none",
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select Project
                </InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={desig}
                  label="Select Project"
                  name="project_id"
                  onChange={handleChangeDesignation}
                >
                  {designation?.map((data, index) => (
                    <MenuItem key={index} value={data?.project_id}>
                      {data?.project_name}
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
                  label="Title"
                  onChange={handleChange}
                  name="title"
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
                  id="outlined-basic"
                  label="Amount Payable"
                  onChange={handleChange}
                  name="amount_payable"
                  variant="outlined"
                />
                <div
                  style={{
                    fontSize: "14px",
                    marginTop: "10px",
                    color: mainThemeColor,
                    display: adminData?.payment_type_id === 3 ? "flex" : "none",
                  }}
                >
                  Share Amount : {shareAmount || "No Share"}
                </div>
              </div>

              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  type="date"
                  id="outlined-basic"
                  label="Due Date"
                  onChange={handleChange}
                  name="due_date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  onClick={() => Router.push("/memberpayable")}
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

export default AddPayable;
