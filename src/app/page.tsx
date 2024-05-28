import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import ProTip from "@/components/ProTips";
import Informational from "@/components/Informational";
import BookCard from "@/components/BookCard";
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
