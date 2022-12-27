import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect, useContext } from "react";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import WorkHistorySharpIcon from "@mui/icons-material/WorkHistorySharp";
import { styled } from "@mui/material/styles";
import LibraryAddSharpIcon from "@mui/icons-material/LibraryAddSharp";
import { Stack } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Cookies } from "react-cookie";
import { UserDataContext } from "../App";
import { Actions, UserObj } from "../Reducers/UserReducer";

export const footerOptions = [
  {
    name: "Home",
    icon: <HomeSharpIcon sx={{ fontSize: "34px" }} />,
    path: "/",
  },
  {
    name: "Add",
    icon: <LibraryAddSharpIcon sx={{ fontSize: "32px" }} />,
    path: "/add/transaction",
  },
  {
    name: "Stats",
    icon: <WorkHistorySharpIcon sx={{ fontSize: "32px" }} />,
    path: "/stats",
  },
];

const tabIds = [
  { tabName: "Income", tabId: "INCOME" },
  {
    tabName: "Expenses",
    tabId: "EXPENSES",
  },
];

const StyledCard = styled(Card)(({ theme }) => {
  return {
    width: "95vw",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    padding: 15,

    borderRadius: 15,
    [theme.breakpoints.up("md")]: {
      width: "60vw",
    },
  };
});

const StyledBoxContainer = styled(Box)(({ theme }) => {
  return {
    width: "100vw",
    padding: 1,
    minHeight: "100vh",
    alignSelf: "center",
    [theme.breakpoints.up("md")]: {
      width: "75vw",
      position: "relative",
      left: "25%",
    },
  };
});

const list = [
  {
    title: "Rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 7000,
    id: uuid(),
  },
  {
    title: "Mobile",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "Salary",
    type: "Earning",
    tType: "INCOME",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "Food",
    type: "Payment",
    tType: "EXPENSES",
    amount: 500,
    id: uuid(),
  },
  {
    title: "Gym",
    type: "Payment",
    tType: "EXPENSES",
    amount: 1000,
    id: uuid(),
  },

  {
    title: "Rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "salary",
    type: "Earning",
    tType: "INCOME",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "salary",
    type: "Earning",
    tType: "INCOME",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "salary",
    type: "Earning",
    tType: "INCOME",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "salary",
    type: "Earning",
    tType: "INCOME",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "rent",
    type: "Payment",
    tType: "EXPENSES",
    amount: 12000,
    id: uuid(),
  },
  {
    title: "salary",
    type: "Earning",
    tType: "INCOME",
    amount: 12000,
    id: uuid(),
  },
];
const icons = {
  EXPENSES: <PaidSharpIcon fontSize="medium" />,
  INCOME: <CurrencyExchangeSharpIcon fontSize="medium" />,
};

const Home: React.FC = () => {
  const cookie = new Cookies();
  const [tabActive, settabId] = useState<string>(tabIds[0].tabId);
  const loaction = useLocation();
  const { userDataInfo }: any = useContext(UserDataContext);
  const { dispatch }: any = useContext(UserDataContext);
  const filteredList = list.filter((e) => e.tType === tabActive);
  const Data = async () => {
    const api = `https://expensess-tracker-default-rtdb.firebaseio.com/${cookie.get(
      "etToken"
    )}.json`;

    const res = await fetch(api);
    const data = await res.json();
    const key = Object.keys(data)[0];
    const value = data[key];
    dispatch({ type: "FETCH_SUCESS", payload: { key: key, value: value } });
  };
  useEffect(() => {
    Data();
  }, []);

  return (
    <>
      <StyledBoxContainer
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignSelf="center"
      >
        <StyledCard
          sx={{ marginTop: 3, padding: 0, borderRadius: 3 }}
          elevation={5}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{ fontSize: "20px" }}
              fontSize="large"
              fontWeight={450}
            >
              Hi Balaji,
              <span style={{ fontWeight: "350", fontSize: "15px" }}>
                Welcome to your Credit History
              </span>
            </Typography>
            <Typography
              sx={{ fontSize: "30px" }}
              fontSize="large"
              fontWeight={400}
            >
              Your Balance :<span style={{ color: "green" }}>12,000</span>
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: "20px" }}
              fontSize="large"
              fontWeight={450}
            >
              Your spending status : <span style={{ color: "red" }}> high</span>
            </Typography>
          </CardContent>
        </StyledCard>
        <Stack
          direction="row"
          alignItems="center"
          alignSelf="center"
          p={1}
          mt={2}
          borderRadius={2}
          sx={{ backgroundColor: "white", boxShadow: 15 }}
        >
          {tabIds.map((e: any) => (
            <Button
              key={e.tabId}
              variant="contained"
              disableElevation
              onClick={() => settabId(e.tabId)}
              style={{
                borderRadius: 6,
                backgroundColor: tabActive === e.tabId ? "skyblue" : "white",
                color: tabActive === e.tabId ? "#4d4d4d" : "gray",
              }}
            >
              {e.tabName}
            </Button>
          ))}
        </Stack>
        <Grid container spacing={2} p={2}>
          {filteredList.map((each: any) => (
            <Grid item md={6} xs={12} sm={12} key={each.id}>
              <Card elevation={5} sx={{ borderRadius: 5 }}>
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      borderRadius: 250,
                      padding: 1,
                      backgroundColor:
                        each.tType === "EXPENSES" ? "#ff9191" : "#6Fbf84",
                    }}
                  >
                    {each.tType === "EXPENSES" ? icons.EXPENSES : icons.INCOME}
                  </Box>
                  <Stack sx={{ paddingLeft: 2, paddingBottom: 1 }}>
                    <Typography variant="h5" fontWeight={350}>
                      <span style={{ fontSize: "13px" }}>
                        {each.tType === "EXPENSES" ? ">" : "<"}
                      </span>
                      {each.title}
                    </Typography>
                    <Typography variant="body2" fontSize={12}>
                      Rs. {each.amount}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    fontSize={15}
                    position="relative"
                    sx={{
                      left: "35%",
                      top: 20,
                      color: each.tType === "EXPENSES" ? "red" : "green",
                    }}
                  >
                    {each.type}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledBoxContainer>
    </>
  );
};

export default Home;
