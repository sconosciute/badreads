import * as React from "react";
import Container from "@mui/material/Container";
import {testBook} from "@/Common";
import * as test from "node:test";
import SearchResults from "@/components/SearchResults";

const books = [testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{alignItems: "center"}}>
        <SearchResults books={books} />
    </Container>
  );
}
