"use client"

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddBookDialog from "../components/AddBookDialog";
import NavSearchField from "@/components/NavSearchField";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import {useTheme} from "@mui/system";

export default function SearchAppBar() {
    const theme = useTheme();
    return (
        <Box sx={{flexGrow: 1, marginBottom: 1.5}}>
            <AppBar position="static">
                <Toolbar
                    sx={{justifyContent: "space-between", display: "flex", alignItems: "center", flexWrap: "wrap"}}>
                    <Box>
                        <Link href="/" aria-label="Go to home" component={NextLink} sx={{
                            fontSize: "2em",
                            fontWeight: "375",
                            [theme.breakpoints.up("sm")]: {
                                fontSize: "2.5em"
                            }
                            }} underline="none" variant="h1">
                            Library
                        </Link>
                    </Box>
                    <NavSearchField/>
                    <Box>
                        <AddBookDialog/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
