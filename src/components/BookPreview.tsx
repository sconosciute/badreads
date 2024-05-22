import Typography from "@mui/material/Typography";

"use client;"
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from "@mui/material/Rating";
import Link from "@mui/material/Link";


export default function BookPreview() {


    return (
       <Link href = "https://www.washington.edu/" underline={"hover"}>
               <Box sx={{ minWidth: 400, borderRadius: "5px",display: "flex", backgroundColor: '#E0DFD5'}}>
            <Box

                margin={"1em"}
                component="img"
                sx={{
                    height: 175,
                    width: 125,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt="Hunger Games 1 cover"
                src="https://images.gr-assets.com/books/1447303603s/2767052.jpg"
            />

                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', color:'#313638'}}>
                    <Typography variant="h4" component="div">
                        Title
                    </Typography>
                    <Typography component="div">
                        Author
                    </Typography>
                    <Rating precision={0.1} name="read-only" value={4.5} readOnly />
                </Box>
            </Box>
       </Link>
    );
}
