import * as React from "react";
import {useTheme} from "@mui/system";
import {baseUrl, IBook, IBookResponse} from "@/Common";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";

async function getAllBooks(page: number = 1, pageSize: number = 10) {
    const res = await fetch(`${baseUrl}/books/all?page=${page}&pageSize=${pageSize}`) as IBookResponse
    console.dir(res);
    return res.entries;
}

export default async function SearchResults({query} : {query: string}) {

    const books = await getAllBooks();

    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            {books.map((book) => (
                <BookCard book={book} />
            ))}
        </Box>
    )
}
