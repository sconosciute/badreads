import { searchTypes } from "@/Common";
import SearchResults, {getBookAuthor, getBookIsbn, getBookTitle} from "@/components/SearchResults";
import Container from "@mui/material/Container";
import * as React from "react";

export default function Search({params, searchParams} : {params: {type: string}, searchParams: { [key: string]: string | string[] | undefined}}) {

    const searchFunc = (() => {
        switch (params.type) {
            case searchTypes.title: return getBookTitle;
            case searchTypes.author: return getBookAuthor;
            case searchTypes.isbn: return getBookIsbn;
            default: throw new Error("Invalid search param in route");
        }
    })();

    const query = searchParams["q"];

    return (
        <Container maxWidth="xl" sx={{alignItems: "center"}}>
            <SearchResults  query={query as string} searchFunc={searchFunc}/>
        </Container>
    );
}