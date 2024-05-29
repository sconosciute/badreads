import * as React from "react";
import Container from "@mui/material/Container";
import {baseUrl, IBookResponse, testBook} from "@/Common";
import * as test from "node:test";
import SearchResults from "@/components/SearchResults";
import {Suspense} from "react";
import {CircularProgress} from "@mui/material";

const books = [testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook];



export default function Home() {
  return (
    <Container maxWidth="lg" sx={{alignItems: "center"}}>
        <Suspense fallback={<CircularProgress />}>
            <SearchResults  query={"nah"}/>
        </Suspense>
    </Container>
  );
}
