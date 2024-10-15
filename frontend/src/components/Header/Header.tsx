import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  const location = useLocation();
  const isSecurityDetails = location.pathname.startsWith("/securities/");
  const navigate = useNavigate();

  let title = "Securities";
  if (isSecurityDetails) {
    title = "Security Details";
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {isSecurityDetails && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            All Securities
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
