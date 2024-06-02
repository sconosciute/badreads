import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddBookDialog from "../components/AddBookDialog";
import NavSearchField from "@/components/NavSearchField";

export default function SearchAppBar() {
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
                    <NavSearchField/>
                    <Box>
                        <AddBookDialog/>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
