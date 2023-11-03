"use client";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import Link from "next/link";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const ListItems = () => {
  return (
    <React.Fragment>
      <Link href="/" style={{ textDecoration: "none", color: "black" }}>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItemButton>
      </Link>
      <Link
        href="/adminPanel"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link
        href="/adminPanel/addStudents"
        style={{ textDecoration: "none", color: "black" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="AddStudents" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};

export default ListItems;
