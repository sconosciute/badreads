import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import {width} from "@mui/system";

export default function bookDetails() {
    return (
        <Container maxWidth="lg" sx={{display:'flex', flexFlow: "row"}}>

            <Link href = "https://www.washington.edu/" underline={"hover"}>
                <Box sx={{ minWidth: 600, borderRadius: "5px",display: "flex" , backgroundColor: '#E0DFD5', flex: '0 0 60%'}}>
                    <Box
                        margin={"1em"}
                        component="img"
                        sx={{
                            height: 400,
                            width: 270,
                            maxHeight: { xs: 800, md: 1000 },
                            maxWidth: { xs: 540, md: 675 },
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
            <Box sx = {{width: 50 , display: "flex", flexDirection: "column"}}>heeey</Box>
        </Container>
    );
}
