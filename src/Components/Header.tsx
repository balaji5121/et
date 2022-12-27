import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Cookies } from "react-cookie";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useHistory } from "react-router-dom";

const footerOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Add",
    path: "/add/transaction",
  },
  {
    name: "Stats",
    path: "/stats",
  },
];

const Header: React.FC = () => {
  const Cookie = new Cookies();
  const history = useHistory();
  const handleLogout = () => {
    Cookie.remove("etToken");
    history.push("/login");
  };
  return (
    <AppBar position="sticky" elevation={5}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 1.5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={550}
          sx={{ display: { sm: "none", xs: "none", md: "block" } }}
        >
          Expenses <span style={{ color: "yellow" }}>Tracker</span>
        </Typography>
        <Stack
          sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AccountBalanceWalletIcon
            fontSize="large"
            sx={{ color: "yellow", marginRight: 0.5 }}
          />
          <Typography variant="h5" fontWeight={350}>
            Tracker
          </Typography>
        </Stack>

        <Button
          variant="contained"
          color="error"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <IconButton
          onClick={handleLogout}
          sx={{
            backgroundColor: "yellow",
            display: { xs: "block", sm: "block", md: "none" },
          }}
        >
          <LogoutOutlinedIcon fontSize="medium" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
