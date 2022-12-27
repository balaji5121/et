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
import React, { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import { useHistory, Redirect } from "react-router-dom";
import { Cookies } from "react-cookie";

const StyledCard = styled(Card)(({ theme }) => {
  return {
    width: "75vw",
    display: "flex",
    flexDirection: "column",
    padding: 15,
    borderRadius: 15,
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
  };
});

const Login: React.FC = () => {
  const cookie = new Cookies();
  const [username, setUsername] = useState<string>("");
  const [errorMsg, setError] = useState<boolean>(false);
  const history = useHistory();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const api = `https://expensess-tracker-default-rtdb.firebaseio.com/${username}.json`;
    const res = await fetch(api);
    const data = await res.json();

    if (data) {
      setError(false);
      history.push("/");
      cookie.set("etToken", username);
    } else {
      setError(true);
    }
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
      <StyledCard elevation={18}>
        <Typography
          variant="h4"
          fontWeight={300}
          gutterBottom
          sx={{ alignSelf: "center" }}
        >
          Login
        </Typography>
        <CardContent>
          <form onSubmit={handleLogin}>
            <TextField
              onChange={handleInputChange}
              fullWidth
              type="text"
              label="username"
              color={errorMsg ? "error" : "primary"}
              required
              helperText="
              If you don`t have account signup with create account
            "
            />
            {errorMsg && (
              <Typography ml={0.3} color="error">
                User Doesnot exits
              </Typography>
            )}

            <Stack direction="row" sx={{ paddingTop: 2 }}>
              <Button type="submit" variant="contained" sx={{ marginRight: 1 }}>
                Login
              </Button>
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Create Account
              </Button>
            </Stack>
          </form>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Login;
