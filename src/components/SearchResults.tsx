"use client"

import * as React from "react";
import {baseUrl, IBook, IBookResponse} from "@/Common";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";
import Grid from "@mui/material/Grid";
import {Pagination} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";



export default async function SearchResults({query = "", searchType = searchTypes.all}: { query: string, searchType: searchTypes }) {

    let searchFunc;
    switch (searchType) {
        case searchTypes.all: searchFunc = getAllBooks;
            break;
        case searchTypes.author: searchFunc = getBookAuthor;
            break;
        case searchTypes.isbn: searchFunc = getBookIsbn;
            break;
        default: searchFunc = getAllBooks;
    }

    const [pageSize, setPageSize] = React.useState<number>(12);
    const [page, setPage] = React.useState<number>(1);

    async function getAllBooks(query: string) {
        let res = await fetch(`${baseUrl}/books/all?page=${page}&pageSize=${pageSize}`);
        return await res.json();
    }

    async function getBookAuthor(author: string) {
        let res = await fetch(`${baseUrl}/books/author/?authorName=${author}`);
        return await res.json();
    }

    async function getBookIsbn(isbn: string) {
        let res = await fetch(`${baseUrl}/books/isbn/?id=${isbn}`);
        return await res.json();
    }

    const books: IBookResponse = await searchFunc(query);

    //TODO: page size dialogue isn't closing!
    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            <Grid sx={{justifyItems: "center"}} container spacing={2} columns={9}>
                {books.entries.map((book: IBook) => (
                    <Grid key={book.isbn13} item xs={9} md={4.5} lg={3}>
                        <BookCard book={book}/>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{marginTop: "2vh"}} display={"flex"} alignItems={"center"}>
                <FormControl variant="standard" size="small">
                    <InputLabel id="page-size-label">Books per page</InputLabel>
                    <Select sx={{minWidth: "7em"}} labelId="page-size-label" id="page-size" value={pageSize} onChange={(e) => {setPageSize(e.target.value as number)}} >
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={36}>36</MenuItem>
                    </Select>
                </FormControl>
                <Pagination count={books.totalPages} page={page} onChange={(e, v) => {
                    setPage(v); //This has to be wrapped in curlybois or it doesn't work?????
                }}/>
            </Box>
        </Box>
    )
}

export enum searchTypes {
    all,
    author,
    isbn
}
