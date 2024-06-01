import * as React from "react";
import Container from "@mui/material/Container";
import {baseUrl, IBookResponse, testBook} from "@/Common";
import * as test from "node:test";
import SearchResults, {getAllBooks} from "@/components/SearchResults";
import {Suspense} from "react";
import {CircularProgress} from "@mui/material";

const books = [testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook];



export default function Home() {
  return (
    <Container maxWidth="xl" sx={{alignItems: "center"}}>
        <Suspense fallback={<CircularProgress />}>
            <SearchResults/>
        </Suspense>
    </Container>
  );
}
