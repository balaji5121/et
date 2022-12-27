import {
  Box,
  Card,
  Typography,
  Grid,
  CardContent,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Cookies } from "react-cookie";
import { Redirect, useHistory } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => {
  return {
    width: "75vw",
    display: "flex",
    borderRadius: 15,
    flexDirection: "column",
    padding: 15,
    [theme.breakpoints.up("sm")]: {
      width: "30vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30vw",
    },
  };
});

interface transaction {
  id: number;
  amount: number;
  title: string;
  type: string;
}

interface userObj {
  username: string;
  name: string;
  credits?: transaction[];
  debits?: transaction[];
}

const user = {
  username: "",
  name: "",
  credits: [],
  debits: [],
};

const Signup: React.FC = () => {
  const [userObject, setUserObject] = useState<userObj>(user);
  const cookie = new Cookies();
  const history = useHistory();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserObject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = `https://expensess-tracker-default-rtdb.firebaseio.com/${userObject.username}.json`;
    const options = {
      method: "POST",
      body: JSON.stringify(userObject),
    };
    console.log(options);
    const res = await fetch(api, options);
    history.push("/");
    cookie.set("etToken", userObject.username);
  };

  if (cookie.get("etToken")) {
    return <Redirect to="/" />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#e2e2e2",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <StyledCard elevation={18}>
        <Typography
          variant="h4"
          fontWeight={300}
          gutterBottom
          sx={{ alignSelf: "center" }}
        >
          Sign up
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              name="username"
              onChange={handleInputChange}
              fullWidth
              type="text"
              // size="small"
              label="Username"
              sx={{ marginBottom: 1.5 }}
              helperText="username can't be changed"
            />{" "}
            <TextField
              required
              name="name"
              onChange={handleInputChange}
              fullWidth
              type="text"
              // size="small"
              label="Name"
              helperText="your name"
            />
            <Button variant="contained" sx={{ marginTop: 1 }} type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Signup;
