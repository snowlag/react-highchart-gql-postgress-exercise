import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_SECURITY_DETAIL } from "../../graphql/queries/getSecurityDetails";

const SecurityDetail = () => {
  const { ticker } = useParams();
  const { loading, error, data } = useQuery(GET_SECURITY_DETAIL, {
    variables: { ticker },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract close prices, volume, and formatted dates
  const prices =
    data?.security.prices.map((p: any) => parseFloat(p.close)) || [];
  const volumes =
    data?.security.prices.map((p: any) => parseInt(p.volume)) || [];
  const dates =
    data?.security.prices.map((p: any) => new Date(p.date).getTime()) || []; // Convert date to timestamp

  // Highcharts options with two series (close price and volume)
  const options = {
    title: { text: `${data?.security.security_name} - Price and Volume` },
    xAxis: {
      categories: dates,
      type: "datetime",
      labels: {
        format: "{value:%b '%y}",
      },
    },
    yAxis: [
      {
        title: { text: "Stock" },
      },
      {
        title: { text: "Volume" },
        opposite: true,
      },
    ],
    series: [
      {
        name: "Stock",
        data: prices,
        type: "line",
        yAxis: 0,
      },
      {
        name: "Volume",
        data: volumes,
        type: "line",
        yAxis: 1,
        color: "red",
      },
    ],
  };

  return (
    <div>
      <h1>
        {data?.security.ticker} - {data.security.security_name}
      </h1>
      <p>Sector: {data?.security.sector}</p>
      <p>Country: {data?.security.country}</p>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SecurityDetail;
