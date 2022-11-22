import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import { get_dash_data_by_id } from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant";

import { useUserContext } from "../../../contexts/UserContext";

const DashData = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const [dashData, setDashData] = useState();
  const [enter, setEnter] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await get_dash_data_by_id(user?.id);
    setDashData(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        minHeight: "100px",
      }}
    >
      {dashData?.map((data, index) => (
        <div
          key={index}
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            boxShadow: `rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px`,
            borderRadius: "10px",
            background: "#FFFFFF",
            height: "100px",
            width: "24%",
            cursor: "pointer",
            display: "flex",
          }}
          onClick={() =>
            data.box_tap_link ? router.push(data?.box_tap_link) : "/"
          }
          onMouseEnter={() => setEnter(true)}
        >
          <div>
            <div
              style={{
                color: mainThemeColor,
                fontWeight: 600,
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              <span>{data?.title}</span>
            </div>
            <div
              style={{
                textAlign: "center",
                fontWeight: 900,
                fontSize: "25px",
                color: "#000000",
              }}
            >
              <span>{data?.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashData;
