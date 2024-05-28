"use client"

import * as React from "react";
import {padding, useTheme} from "@mui/system";
import {useState} from "react";
import {IBook} from "@/Common";
import {useSearchParams} from "next/navigation";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";

// const params = useSearchParams();
// const [page, setPage] = useState(params.get("page") || 1)
// const [pageSize, setPageSize] = useState(params.get("pageSize") || 10)
//
// const baseRoute = "http://localhost:4000"
// const allQuery = fetch(`${baseRoute}/book?page=${page}&pageSize=${pageSize}`)

export default function SearchResults({books}: {books: IBook[]}) {
    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            {books.map((book) => (
                <BookCard book={book} />
            ))}
        </Box>
    )
}
