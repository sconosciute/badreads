import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {Dispatch, SetStateAction} from "react";

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

export default function NavSelect({searchMode, setSearchMode}:{ searchMode:string, setSearchMode: Dispatch<SetStateAction<string>> }) {

  const handleChange = (event: SelectChangeEvent) => {
    setSearchMode(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120}}>
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
  );
}
