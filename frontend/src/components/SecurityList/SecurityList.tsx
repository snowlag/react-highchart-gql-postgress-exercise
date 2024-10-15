import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_SECURITIES } from "../../graphql/queries/getSecurities";
import { getRowBackgroundColor } from "./SecurityList.utils";

const SecurityList = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const { loading, error, data } = useQuery(GET_SECURITIES, {
    variables: { limit, offset },
  });
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleRowClick = (ticker: string) => {
    navigate(`/securities/${ticker}`);
  };

  const handleNext = () => {
    setOffset(offset + limit); 
  };

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit)); 0)
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.securities.map((security: any) => (
              <TableRow
                key={security.ticker}
                onClick={() => handleRowClick(security.ticker)}
                style={{
                  cursor: "pointer",
                }}
              >
                <TableCell>{security.ticker}</TableCell>
                <TableCell>{security.security_name}</TableCell>
                <TableCell>{security.sector}</TableCell>
                <TableCell>{security.country}</TableCell>
                <TableCell
                  style={{
                    backgroundColor: getRowBackgroundColor(security.trend),
                  }}
                >
                  {security.trend}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          disabled={offset === 0} 
        >
          Previous
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={data.securities.length < limit} 
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default SecurityList;
