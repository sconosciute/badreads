"use client";

import * as React from "react";
import { styled, alpha, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NavSelect from "../components/NavSelect";
import AddBookDialog from "../components/AddBookDialog";
import {useState} from "react";
import NavSearchField from "@/components/NavSearchField";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30vw",
      "&:focus": {
        width: "35vw",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [searchMode, setSearchMode] = useState("title");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Library
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            {/*A NavSelect component*/}
            <NavSelect {...{searchMode, setSearchMode}}></NavSelect>

            <NavSearchField searchMode={searchMode} setSearchMode={setSearchMode}/>
          </Box>
          <Box>
            {/* Closed dialog with "Add Book" button to open it */}
            <AddBookDialog></AddBookDialog>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
