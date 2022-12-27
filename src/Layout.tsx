import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import { footerOptions } from "./Pages/Home";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#e2e2e2",
          paddingRight: 1,
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              width: "25vw",
              display: { md: "flex", xs: "none", sm: "none" },
              flexDirection: "column",
              paddingTop: 3,
              backgroundColor: "white",
              height: "95vh",
              position: "fixed",
              left: 0,
            }}
          >
            <List style={{ marginTop: 1, marginBottom: 1 }}>
              {footerOptions.map((each: any) => (
                <Link
                  to={each.path}
                  key={each.path}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor:
                        each.path === location.pathname ? "#cccccc" : "",
                    }}
                  >
                    <ListItemIcon>{each.icon}</ListItemIcon>
                    <Typography
                      variant="h1"
                      sx={{ fontSize: "20px", color: "#666666" }}
                      fontWeight={450}
                    >
                      {each.name}
                    </Typography>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
          {props.children}
        </Stack>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "none" },
          backgroundColor: "white",
          height: "5vh",
          left: 0,
          right: 0,
          padding: 2,
          position: "fixed",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          bottom: 0,
          boxShadow: 5,
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {footerOptions.map((each: any) => (
          <Link
            to={each.path}
            key={each.path}
            style={{ textDecoration: "none" }}
          >
            <Stack
              direction="column"
              alignItems="center"
              sx={{ padding: 3, color: "gray" }}
            >
              {each.icon}
              {each.name}
            </Stack>
          </Link>
        ))}
      </Box>
    </>
  );
};

export default Layout;
