import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IoSquare } from "react-icons/io5";
import { get_pie_data_by_id } from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant";
import { useUserContext } from "../../../contexts/UserContext";

ChartJS.register(ArcElement, Tooltip);

const DoughNut = () => {
  const [overviewData, setOverviewData] = useState();
  const { user } = useUserContext();

  useEffect(() => {
    get_pie_data_by_id(user?.id).then((res) => {
      if (res) {
        setOverviewData(res.data);
      }
    });
  }, []);

  const data = {
    datasets: [
      {
        label: "# of Users",
        data: [overviewData?.data?.paid, overviewData?.data?.due],
        backgroundColor: ["green", "red"],
        borderColor: ["green", "red"],
        borderWidth: 1,
      },
    ],
    labels: ["Paid", "Due"],
  };

  return (
    <>
      <div
        style={{
          height: "auto",
          margin: " auto",
          width: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "10px",
        }}
      >
        <div style={{ height: "95%", width: "50%" }}>
          <div
            style={{
              textAlign: "center",
              color: mainThemeColor,
              fontWeight: 700,
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            {overviewData?.data?.due || overviewData?.data?.paid
              ? overviewData?.title
              : "No Data"}
          </div>

          <div style={{ height: "200px", width: "200px", margin: "auto" }}>
            <Doughnut
              data={data}
              height={100}
              width={100}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: "45%",
            margin: "auto",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "red",
              display: "flex",
              flexWrap: " wrap",
              width: "170px",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <div
              style={{
                color: "red",
                width: "100%",
                textAlign: "center",
                background: "red",
                color: "white",
                borderRadius: "4px 4px 0 0",
              }}
            >
              {overviewData?.data?.due || 0}
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                border: "1px solid red",
              }}
            >
              due
            </div>{" "}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
              display: "flex",
              flexWrap: " wrap",
              width: "170px",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <div
              style={{
                color: "green",
                width: "100%",
                textAlign: "center",
                background: "green",
                color: "white",
                borderRadius: "4px 4px 0 0",
              }}
            >
              {overviewData?.data?.paid || 0}
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                border: "1px solid green",
              }}
            >
              paid
            </div>{" "}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: mainThemeColor,
              display: "flex",
              flexWrap: " wrap",
              width: "170px",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <div
              style={{
                color: mainThemeColor,
                width: "100%",
                textAlign: "center",
                background: mainThemeColor,
                color: "white",
                borderRadius: "4px 4px 0 0",
              }}
            >
              {overviewData?.data?.total || 0}
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                border: "1px solid green",
              }}
            >
              total
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoughNut;
