"use client"

import * as React from "react";
import {baseUrl, IBook, IBookResponse} from "@/Common";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";
import Grid from "@mui/material/Grid";
import {CircularProgress, Pagination} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";



export async function getAllBooks(query: string, page: string, pageSize: string) {
    return await fetch(`${baseUrl}/books/all?page=${page}&pageSize=${pageSize}`).then((res) => res.json()) as IBookResponse;
}

export async function getBookAuthor(author: string, page: string, pageSize: string) {
    return await fetch(`${baseUrl}/books/author/?authorName=${author}`).then((res) => res.json()) as IBookResponse;
}

export async function getBookIsbn(isbn: string, page: string, pageSize: string): Promise<IBookResponse> {
    return await fetch(`${baseUrl}/books/isbn/?id=${isbn}`).then((res) => res.json()) as IBookResponse;
}


export default function SearchResults({query, searchFunc}: {
    query: string,
    searchFunc: (query: string, page: string, pageSize: string) => Promise<IBookResponse>
}) {
    const router = useRouter();
    const path = usePathname();

    const params = useSearchParams();
    const page = params.get('page') || "1";
    const pageSize = params.get('pageSize') || "12";

    //@ts-ignore I just absolutely am done dealing with state in React right now. Fuck it, we ball.
    const [books, setBooks] = useState<IBookResponse>({})
    useEffect(() => {
        searchFunc(query, page, pageSize)
            .then((res) => setBooks(res))
    }, [setBooks, params])
    // const books: IBookResponse = await searchFunc(query, page, pageSize);

    //TODO: page size dialogue isn't closing!
    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            <Grid sx={{justifyItems: "center"}} container spacing={2} columns={9}>
                {books.entries && books.entries.map((book: IBook) => (
                    <Grid key={book.isbn13} item xs={9} md={4.5} lg={3}>
                        <BookCard book={book}/>
                    </Grid>
                ))}
                {!books.entries && <CircularProgress/>}
            </Grid>
            <Box sx={{marginTop: "2vh"}} display={"flex"} alignItems={"center"}>
                <FormControl variant="standard" size="small">
                    <InputLabel id="page-size-label">Books per page</InputLabel>
                    <Select sx={{minWidth: "7em"}} labelId="page-size-label" id="page-size" value={pageSize}
                            onChange={(e) => pushPageParams(page, e.target.value.toString())}>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={36}>36</MenuItem>
                    </Select>
                </FormControl>
                <Pagination count={books.totalPages} page={Number(page)} siblingCount={2} boundaryCount={1} onChange={(e, v) => {
                    pushPageParams(v.toString(), pageSize); //This has to be wrapped in curlybois or it doesn't work?????
                }}/>
            </Box>
        </Box>
    )

    function pushPageParams(pg: string, pgSize: string) {
        const params = `?page=${pg}&pageSize=${pgSize}`;
        router.push(`${path}/${params}`);
    }
}

