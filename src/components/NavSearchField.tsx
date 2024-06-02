"use client"

import * as React from 'react';
import {Box, TextField, Transitions} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import {alpha} from "@mui/material/styles";
import {useTheme} from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export default function NavSearchField() {
    const theme = useTheme();

    const [searchMode, setSearchMode] = useState("title");
    const searchModes = [
        {
            value: "title",
            label: "Title"
        },
        {
            value: "author",
            label: "Author"
        },
        {
            value: "isbn-13",
            label: "ISBN-13"
        }
    ]

    const handleChange = (event: SelectChangeEvent) => {
        setSearchMode(event.target.value as string);
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Box id="search-type-select" sx={{minWidth: 120}}>
                <FormControl fullWidth size={"small"}>
                    <InputLabel shrink id="nav-input-label">
                        Look for
                    </InputLabel>
                    <Select
                        displayEmpty
                        labelId="search-mode"
                        id="nav-search-mode"
                        value={searchMode}
                        label="Sorting"
                        onChange={handleChange}
                        size={"small"}
                    >
                        {searchModes.map((mode) => (
                            <MenuItem key={mode.value} value={mode.value}>
                                {mode.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box id="search-field" sx={{
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
                <TextField sx={{ml: "1vw"}} id="nav-core-search" placeholder="Search" variant="standard"
                           InputProps={{disableUnderline: true}}>

                </TextField>
            </Box>
        </Box>
    )
}