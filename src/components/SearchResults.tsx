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

    const books = await getAllBooks();

    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            <Grid sx={{justifyItems: "center"}} container spacing={2} columns={9}>
                {books.map((book: IBook) => (
                    <Grid key={book.isbn13} item xs={9} md={4.5} lg={3}>
                        <BookCard book={book}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
