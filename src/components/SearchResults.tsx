import * as React from "react";
import {useTheme} from "@mui/system";
import {baseUrl, IBook, IBookResponse} from "@/Common";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";
import Grid from "@mui/material/Grid";

async function getAllBooks(page: number = 1, pageSize: number = 10) {
    const res = await fetch(`${baseUrl}/books/all?page=${page}&pageSize=${pageSize}`);
    const resJ = await res.json();
    console.dir(resJ);
    return resJ.entries;
}

export default async function SearchResults({query}: { query: string }) {

    console.log("grabbing books");
    const books = await getAllBooks();
    console.dir(books);

    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            <Grid container spacing={2} columns={3}>
                {books.map((book: IBook) => (
                    <Grid item xs={3} md={1}>
                        <BookCard book={book}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
