import React from "react";
import { Line } from "react-chartjs-2";

export default function Chart({ data }) {
    const state = {
    labels: data.map(val=>val.date),
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "white",
        borderWidth: 2,
        data: data.map(obj=>obj.val),
      },
    ],
  };

  return (
    <Line
      data={state}
      options={{
        // title: {
        //   display: true,
        //   text: "Average Rainfall per month",
        //   fontSize: 20,
        // },
        legend: null,
      }}
    />
  );
}
