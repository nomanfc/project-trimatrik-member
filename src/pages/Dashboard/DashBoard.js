import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";

import { BarChart } from "./barChart/BarChart";
import DashData from "./dashData/DashData";
import DoughNut from "./pieChart/PieChart";

import { get_all_members } from "../../http_requests/httpreq";
import { mainThemeColor } from "../../constants/constant";
import Projects from "./projetcs/Projects";
import { useUserContext } from "../../contexts/UserContext";

const DashBoard = () => {
  const { user } = useUserContext();
  const [alluser, setAlluser] = useState([""]);
  const [value, setValue] = React.useState();
  const [year, setYear] = useState("2022");
  const [id, setId] = React.useState(null);

  const fetchData = useCallback(async () => {
    const res = await get_all_members();
    setAlluser(res.data.data);
  }, [value]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          margin: "0px auto 50px auto",
        }}
      >
        <DashData />
      </div>

      <div
        style={{
          width: "100%",
          height: "fit-content",
          margin: "50px auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#000000", fontWeight: 700 }}></div>

          <div style={{ width: "fit-content", display: "flex" }}>
            <div style={{ marginLeft: "30px" }}>
              <FormControl fullWidth size="small" focused>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <SelectM
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Year"
                  name="designation_id"
                  onChange={handleChangeYear}
                  style={{ color: mainThemeColor }}
                >
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </SelectM>
              </FormControl>
            </div>
          </div>
        </div>
        <BarChart id={id} year={year} />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "47%", height: "200px" }}>
          <div
            style={{
              margin: "10px auto",
              color: mainThemeColor,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => Router.push("/memberpayable")}
          >
            <span style={{ fontWeight: 700, fontSize: "18px" }}>
              {" "}
              Memeber Payble
            </span>
            <span style={{ fontWeight: 700, fontSize: "18px" }}>View All</span>
          </div>
          <Projects />
        </div>
        <div style={{ width: "47%", height: "200px" }}>
          <DoughNut />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
