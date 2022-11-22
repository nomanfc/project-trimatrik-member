import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getBarChartData } from "../../../http_requests/httpreq";
import { mainThemeColor } from "../../../constants/constant";

import { useUserContext } from "../../../contexts/UserContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function BarChart(props) {
  const { user } = useUserContext();

  const [details, setDetails] = useState();
  const [jan, setJan] = useState(0);
  const [janP, setJanP] = useState(0);

  const [feb, setFeb] = useState(0);
  const [febP, setFebP] = useState(0);

  const [mar, setMar] = useState(0);
  const [marP, setMarP] = useState(0);

  const [apr, setApr] = useState(0);
  const [aprP, setAprP] = useState(0);

  const [may, setMay] = useState(0);
  const [mayP, setMayP] = useState(0);

  const [jun, setJun] = useState(0);
  const [junP, setJunP] = useState(0);

  const [jul, setJul] = useState(0);
  const [julP, setJulP] = useState(0);

  const [aug, setAug] = useState(0);
  const [augP, setAugP] = useState(0);

  const [sep, setSep] = useState(0);
  const [sepP, setSepP] = useState(0);

  const [oct, setOct] = useState(0);
  const [octP, setOctP] = useState(0);

  const [nov, setNov] = useState(0);
  const [novP, setNovP] = useState(0);

  const [dec, setDec] = useState(0);
  const [decP, setDecP] = useState(0);

  useEffect(() => {
    getBarChartData(user?.id, props.year).then((res) => {
      setDetails(res.data);
      setJan(0);
      setFeb(0);
      setMar(0);
      setApr(0);
      setMay(0);
      setJun(0);
      setJul(0);
      setAug(0);
      setSep(0);
      setOct(0);
      setNov(0);
      setDec(0);

      for (var i = 0; i < res?.data?.data?.length; i++) {
        if (res.data.data[i].month === "January") {
          setJan(res.data.data[i].amount_payable);
          setJanP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "February") {
          setFeb(res.data.data[i].amount_payable);
          setFebP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "March") {
          setMar(res.data.data[i].amount_payable);
          setMarP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "April") {
          setApr(res.data.data[i].amount_payable);
          setAprP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "May") {
          setMay(res.data.data[i].amount_payable);
          setMayP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "June") {
          setJun(res.data.data[i].amount_payable);
          setJunP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "July") {
          setJul(res.data.data[i].amount_payable);
          setJulP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "August") {
          setAug(res.data.data[i].amount_payable);
          setAugP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "September") {
          setSep(res.data.data[i].amount_payable);
          setSepP(res.data.data[i].is_paid);
        }
        if (res.data.data[i].month === "Octobor") {
          setOct(res.data.data[i].amount_payable);
          setOctP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "November") {
          setNov(res.data.data[i].amount_payable);
          setNovP(res.data.data[i].is_paid);
        }

        if (res.data.data[i].month === "December") {
          setDec(res.data.data[i].amount_payable);
          setDecP(res.data.data[i].is_paid);
        }
      }
    });
  }, [props.id, props.year]);

  const dataP = [
    janP,
    febP,
    marP,
    aprP,
    mayP,
    junP,
    julP,
    augP,
    sepP,
    octP,
    novP,
    decP,
  ];

  const data = {
    labels,
    datasets: [
      {
        barThickness: 25,
        barRadius: 10,
        borderRadius: 2,
        data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
        backgroundColor: dataP.map((data) =>
          data === 1 ? mainThemeColor : "red"
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: details?.title ? details?.title : "No Data",
        font: {
          size: 18,
        },
        color: mainThemeColor,
      },
    },
  };

  return <Bar options={options} data={data} height={50} />;
}
