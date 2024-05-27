import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [option, setValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size={"small"}>
        <InputLabel shrink id="nav-input-label">
          Sort by
        </InputLabel>
        <Select
          displayEmpty
          labelId="nav-input-label"
          id="nav-simple-select"
          value={option}
          label="Sorting"
          onChange={handleChange}
          size={"small"}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"isbn"}>ISBN-13</MenuItem>
          <MenuItem value={"author"}>Author</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
