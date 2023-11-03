"use client";
import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItems from "../ListItems";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [allAddTexts, setAllAddTexts] = useState([
    // input1,
    // input2,
    // input3,
    // input4,
  ]);

  const handleChange = (e) => {
    setAllAddTexts(...allAddTexts, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(allAddTexts);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              AddStudents
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <form
            className="form-control p-3 mt-4"
            onSubmit={(e) => handleSubmit(e)}
            style={
              open
                ? { width: "55rem", marginLeft: "1.5rem" }
                : { width: "60rem", marginLeft: "5rem" }
            }
          >
            <div className="input1 mt-4">
              <label htmlFor="firstname" className="form-label">
                FirstName
              </label>
              <input
                type="text"
                className="form-control"
                name="input1"
                value={input1}
                onChange={(e) => handleChange(e)}
                id="firstname"
              />
            </div>
            <div className="input2 mt-4">
              <label htmlFor="lastname" className="form-label">
                LastName
              </label>
              <input
                type="text"
                className="form-control"
                name="input3"
                value={input2}
                onChange={(e) => handleChange(e)}
                id="lastname"
              />
            </div>
            <div className="input3 mt-4">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                name="input3"
                value={input3}
                onChange={(e) => handleChange(e)}
                id="gender"
              />
            </div>
            <select
              className="form-select mt-4"
              name="input4"
              value={input4}
              onChange={(e) => handleChange(e)}
            >
              <option value="junior">junior</option>
              <option value="middle">middle</option>
              <option value="senior">senior</option>
            </select>
            {/* <Link href="/adminPanel"> */}
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Submit
            </button>
            {/* </Link> */}
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
