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
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItems from "./ListItems";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

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

  const [students, setSudents] = useState([]);
  const [searchedStudents, setSearchedStudents] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchStudents = async () => {
    try {
      let res = await axios.get("http://localhost:3000/students");
      let data = await res.data;
      setSudents(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    handleSearch(searchText);
  };

  const handleSearch = async (searchText) => {
    try {
      let resSearch = await axios.get(
        `http://localhost:3000/students?q=${searchText}`
      );
      setSearchedStudents(resSearch.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudents();
    handleSearch();
    handleDelete();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3000/students/${id}`);
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchedStudents);

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
              Dashboard
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
            className="form-control mt-5 p-2"
            style={{ marginLeft: "1rem", width: "55rem" }}
          >
            <div className=" d-flex align-items-center justify-content-between">
              <div className="input1 mb-3">
                <label htmlFor="search" className="form-label ms-1">
                  Search
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  id="search"
                  name="search"
                  value={searchText}
                  onChange={handleChange}
                />
              </div>
              <div className="select mt-3">
                <select className="form-select">
                  <option value="category">category</option>
                  <option value="junior">junior</option>
                  <option value="middle">middle</option>
                  <option value="senior">senior</option>
                </select>
              </div>
            </div>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchedStudents.length > 0
                  ? searchedStudents.map((st, index) => (
                      <tr key={st.id}>
                        <td>{index + 1}</td>
                        <td>{st.firstName}</td>
                        <td>{st.lastName}</td>
                        <td>{st.gender}</td>
                        <td>{st.category}</td>
                        <td>
                          <button className="btn btn-success me-2">Edit</button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(st.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : students.map((st, index) => (
                      <tr key={st.id}>
                        <td>{index + 1}</td>
                        <td>{st.firstName}</td>
                        <td>{st.lastName}</td>
                        <td>{st.gender}</td>
                        <td>{st.category}</td>
                        <td>
                          <button className="btn btn-success me-2">Edit</button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(st.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                {/* {searchedStudents.map((ss, index) => (
                    <tr key={ss.id}>
                      <td>{index + 1}</td>
                      <td>{ss.firstName}</td>
                      <td>{ss.lastName}</td>
                      <td>{ss.gender}</td>
                      <td>{ss.category}</td>
                      <td>
                        <button className="btn btn-success me-2">Edit</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(ss.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
