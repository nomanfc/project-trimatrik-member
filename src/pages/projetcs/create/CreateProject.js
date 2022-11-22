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
  create_project,
  get_all_members,
  get_all_designation,
} from "../../../http_requests/httpreq";
import { mainThemeColor, lightThemeColor } from "../../../constants/constant";

import { useUserContext } from "../../../contexts/UserContext";

const CreateProject = () => {
  const { user } = useUserContext();
  const [value, setValue] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [alluser, setAlluser] = useState();

  const [projectData, setprojectData] = useState();
  // const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setprojectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
    setprojectData({ ...projectData, creator_user_id: user?.member_id });
  }, [value]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleSubmit = (e) => {
    if (
      projectData.project_name &&
      projectData.registration_fee &&
      projectData.total_share
    ) {
      create_project(projectData).then((res) => {
        if (res.data.success === 1) {
          Router.push("/projects/allprojects");
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
            Create New Project
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
                  width: "100%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Project Name"
                  onChange={handleChange}
                  name="project_name"
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
                  label="Total Share"
                  onChange={handleChange}
                  name="total_share"
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
                  label="Registration Fee"
                  onChange={handleChange}
                  name="registration_fee"
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
                  onClick={() => Router.push("/projects/allprojects")}
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

export default CreateProject;
