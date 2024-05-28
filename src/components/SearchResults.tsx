import * as React from "react";
import {useTheme} from "@mui/system";
import {IBook} from "@/Common";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";

export default function SearchResults({books}: {books: IBook[]}) {
    return (
        <Box sx={{padding: "1vw", flexWrap: 'wrap'}} display="flex" alignItems="center">
            {books.map((book) => (
                <BookCard book={book} />
            ))}
        </Box>
    )
}
