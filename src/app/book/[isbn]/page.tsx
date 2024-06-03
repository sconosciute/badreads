"use client"

import {useEffect, useState} from "react";
import {baseUrl, compStates, IBook} from "@/Common";
import {getBookIsbn} from "@/components/SearchResults";
import Book from "@/components/book";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function book({params}:{params:{isbn:string}}){
    const [pageState, setPageState] = useState(compStates.loading)
    const [book, setBook] = useState<IBook>();

    useEffect(() => {
        getBookIsbn(params.isbn, "1", "1")
            .then((res)=>{
                if (res.status === 200) {
                    setBook(res.body.entries[0]);
                    setPageState(compStates.ready)
                } else {
                    setPageState(compStates.noData);
                }
            })
    }, [setBook, setPageState]);

    return (
        <>
            {(pageState == compStates.ready) && <Book book={book as IBook} />}
            {(pageState == compStates.loading) && <CircularProgress />}
            {(pageState == compStates.noData) && <Typography>No book found.</Typography>}
        </>

    )
}