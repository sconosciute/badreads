"use client";

import * as React from "react";
import {useTheme} from "@mui/system";
import {Card, CardContent, CardMedia} from "@mui/material";
import Box from "@mui/material/Box";
import {IBook} from "@/Common";
import Typography from "@mui/material/Typography";

export default function BookCard({book}: {book: IBook}) {
    const theme = useTheme();
    const imgAlt = book.title + " cover";

    return (
        <Card sx={{display: "flex"}}>
            <CardMedia sx={{ maxWidth: "33%" }} component="img" image={book.icons.small} alt={imgAlt}/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant={"h5"}>
                        {book.title}
                    </Typography>
                    <Typography component="div" variant="subtitle1">
                        {book.authors}
                    </Typography>
                </CardContent>

            </Box>
        </Card>
    )
}