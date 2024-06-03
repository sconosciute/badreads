"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {IBook} from "@/Common";

export default function BookDetails({params}:{params:{isbn:string}}) {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleDelete(title : string) {
        const deleteBook = async () => {

            try {
                const response = await fetch(`http://localhost:4000/books/title/${title}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                } else if (response.status === 404) {
                    alert("Book not found.");
                } else {
                    alert("Server error - contact support.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server error - contact support.");
            }

            handleClose();
        };

        deleteBook();
        window.location.reload();
    }

    const [books, setBooks] = useState<IBook[]>(
        []
    );
    const [error, setError] = useState<string | null>(null);
    let returningComp;

    useEffect(() => {
        // Getting the ISBN from URL
        const params = new URLSearchParams(window.location.search);
        const bookID = params.get('id');

        const fetchBook = async () => {
            const response = await fetch(`http://localhost:4000/books/isbn?id=${bookID}`);

            if (!response.ok) {
                setError('Failed to fetch movie');
            }

            const book = await response.json();
            setBooks(book.entries);

            console.dir(book);
        };

        fetchBook();

    }, []);


    if (error) {
        return (
            <Container maxWidth="lg" sx={{ display: 'flex', flexFlow: "row", marginTop: "1em", gap: "2em", justifyContent:"center" }}>
                <Box sx={{ padding: "0.5em", minWidth: 600, borderRadius: "5px", display: "flex", backgroundColor: '#E0DFD5',  flex: '0 0 70%'}}>
                    <Typography>No books found with the given ISBN.</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Box>
            {books.map((book, index) => (
                <Container maxWidth="lg" sx={{ display: 'flex', flexFlow: "row", marginTop: "1em", gap: "2em", justifyContent:"center" }}>
                    <Box sx={{ padding: "0.5em", minWidth: 600, borderRadius: "5px", display: "flex", backgroundColor: '#E0DFD5',  flex: '0 0 70%'}}>
                        {/* Book image */}
                        <Box
                            component="img"
                            margin={"1em"}
                            sx={{
                                height: 400,
                                width: 270,
                                maxHeight: { xs: 800, md: 1000 },
                                maxWidth: { xs: 540, md: 675 },
                            }}
                            alt={book.title}
                            src={book.icons.large}
                        />

                        {/* Main information */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#313638' }}>
                            <Typography variant="h4">
                                {book.title}
                            </Typography>
                            <Typography sx={{ fontSize: "1.6em" }}>
                                {book.authors}
                            </Typography>
                            <Typography>
                                {book.publication}
                            </Typography>
                            <Typography sx={{ marginTop: "1em" }}>
                                ISBN-13: {book.isbn13}
                            </Typography>

                            <Box>
                                <Box sx={{ marginTop: "1em" }}>
                                    <Typography>Average Rating: {book.ratings.average}</Typography>
                                    <Rating size={"medium"} value={book.ratings.average} readOnly />
                                </Box>

                                <Typography sx={{ marginTop: "1em" }}>
                                    <Rating size={"medium"} value={1} readOnly />
                                    {book.ratings.rating_1} <br />
                                    <Rating size={"medium"} value={2} readOnly />
                                    {book.ratings.rating_2} <br />
                                    <Rating size={"medium"} value={3} readOnly />
                                    {book.ratings.rating_3} <br />
                                    <Rating size={"medium"} value={4} readOnly />
                                    {book.ratings.rating_4} <br />
                                    <Rating size={"medium"} value={5} readOnly />
                                    {book.ratings.rating_5} <br />
                                </Typography>
                            </Box>

                            <Box sx={{ justifyContent: 'space-around' }}>
                                <Button variant="contained" sx={{ margin: 2 }}>Update</Button>
                                <Button variant="contained" sx={{ margin: 2 }} onClick={() => handleDelete(book.title)}>Delete</Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            ))}
        </Box>
    );
}