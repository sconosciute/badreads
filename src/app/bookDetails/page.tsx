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
        <Container maxWidth="lg" sx={{display:'flex', flexFlow: "row", marginTop: "1em", gap: "2em"}}>
            <Box sx={{ minWidth: 600, borderRadius: "5px",display: "flex" , backgroundColor: '#E0DFD5', flex: '0 0 70%'}}>
                {/*Book image*/}
                <Box
                    component="img"
                    margin={"1em"}
                    sx={{
                        height: 400,
                        width: 270,
                        maxHeight: { xs: 800, md: 1000 },
                        maxWidth: { xs: 540, md: 675 },
                    }}
                    alt="Hunger Games 1 cover"
                    src="https://images.gr-assets.com/books/1447303603s/2767052.jpg"
                />


                {/*Main information*/}
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', color:'#313638'}}>
                    <Typography variant="h3">
                        Title
                    </Typography>
                    <Typography sx={{fontSize: "1.8em"}}>
                        Author
                    </Typography>
                    <Typography>
                        ISBN-13: [isbn]
                    </Typography>


                    <Box>
                        <Box>
                            <Rating precision={0.1} size={"large"} value={4.5} readOnly sx={{marginTop:"1em"}} />
                            <Typography >
                                Average rating: [4.5] stars
                            </Typography>
                        </Box>

                        <Typography sx={{marginTop: "1em"}}>
                            One star ratings: [number] <br/>
                            Two star ratings: [number] <br/>
                            Three star ratings: [number] <br/>
                            Four star ratings: [number] <br/>
                            Five star ratings: [number] <br/>
                        </Typography>
                    </Box>


                    <Box sx={{justifyContent:'space-around'}}>
                        <Button variant="contained" sx={{margin:2}}>Update</Button>
                        <Button variant="contained" sx={{margin:2}}>Delete</Button>
                    </Box>
                </Box>
            </Box>


            {/*Recommendation sidebar*/}
            <Box sx = {{width: 50 , display: "flex", flexDirection: "column", flex: '0 0 30%'}}>
                (Other books would go here)
            </Box>
        </Container>
    );
}
