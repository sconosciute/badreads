"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavSelect from "../components/NavSelect";
import AddBookDialog from "../components/AddBookDialog";
import {useState} from "react";
import NavSearchField from "@/components/NavSearchField";

const basePath = "http://localhost:4000"

function handleSearch(query: string, mode: string) {
  switch (mode){
      case "title":
          break;
      case "author":
          break;
      case "isbn-13":
          break;
  }
}

export default function SearchAppBar() {
    const [searchMode, setSearchMode] = useState("title");
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar
                    sx={{justifyContent: "space-between", display: "flex", alignItems: "center", flexWrap: "wrap"}}>
                    <Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {xs: "none", sm: "block"}}}
                        >
                            Library
                        </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <NavSelect {...{searchMode, setSearchMode}}></NavSelect>

                        <NavSearchField searchMode={searchMode} setSearchMode={setSearchMode}/>
                    </Box>
                    <Box>
                        <AddBookDialog/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
