import * as React from "react";
import Container from "@mui/material/Container";
import {testBook} from "@/Common";
import SearchResults, {getAllBooks} from "@/components/SearchResults";

const books = [testBook, testBook, testBook, testBook, testBook, testBook, testBook, testBook];



export default function Home() {
  return (
    <Container maxWidth="xl" sx={{alignItems: "center"}}>
        <SearchResults  query={""} searchFunc={getAllBooks}/>
    </Container>
  );
}
