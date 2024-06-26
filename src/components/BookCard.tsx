"use client";

import * as React from "react";
import {useMediaQuery, useTheme} from "@mui/system";
import {Card, CardActions, CardContent, CardMedia, Rating} from "@mui/material";
import Box from "@mui/material/Box";
import {IBook} from "@/Common";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NextLink from "next/link";


export default function BookCard({book}: {book: IBook}) {
    const theme = useTheme();
    const imgAlt = book.title + " cover";
    const media = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Card sx={{display: "flex", height: "100%", maxWidth: "600px", margin: "0"}}>
            <CardMedia sx={{ maxWidth: "33%", maxHeight: "auto", objectFit: "contain"}} component="img" image={book.icons.large} alt={imgAlt}/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography key={"title: " + book.title} component="div" variant={"h5"}>
                        {book.title}
                    </Typography>
                    <Typography key={"author: " + book.authors} component="div" variant="subtitle1">
                        {book.authors}
                    </Typography>
                    <Rating key={"Ratings for " + book.title} name="Average Rating" value={book.ratings.average} precision={0.5} readOnly />
                </CardContent>
                <CardActions>
                    <Button component={NextLink} size="small" href={`/books/${book.isbn13}`}>More Details</Button>
                </CardActions>
            </Box>
        </Card>
    )
}