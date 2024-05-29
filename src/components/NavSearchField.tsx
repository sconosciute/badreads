import * as React from 'react';
import {Box, TextField, Transitions} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {alpha} from "@mui/material/styles";
import {useTheme} from "@mui/system";



export default function NavSearchField({searchMode, setSearchMode}:{ searchMode:string, setSearchMode: Dispatch<SetStateAction<string>> }) {
    const theme = useTheme();

    return (
        <Box sx={{
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {backgroundColor: alpha(theme.palette.common.white, 0.25),},
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(1),
                width: "auto",
            },
            maxHeight: "7vh",
            margin: "2vh",
            alignItems: "center",
            "& .MuiInputBase-input": {
                padding: theme.spacing(1, 1, 1, 0),
                //@ts-ignore can't seem to get this to recognize the Transitions type here?
                transition: theme.transitions.create("width"),
                [theme.breakpoints.up("sm")]: {
                    width: "30vw",
                    "&:focus": {
                        width: "35vw",
                    },
                },
            },

        }}>
            <TextField sx={{ml: "1vw"}} id="nav-core-search" placeholder="Search" variant="standard" InputProps={{disableUnderline: true}}>

            </TextField>
        </Box>
    )
}