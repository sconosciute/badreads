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

interface Book {
    isbn13: number;
    authors: string;
    publication_year: number;
    original_title: string;
    title: string;
    rating_1_star: number;
    rating_2_star: number;
    rating_3_star: number;
    rating_4_star: number;
    rating_5_star: number;
    avg_rating: number;
    image_url: string;
    image_small_url: string;
}

export default function BookDetails() {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {

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

    const [book, setBook] = useState(
        {
            isbn13: null,
            authors: "",
            publication_year: null,
            original_title: "",
            title: "",
            rating_1_star: null,
            rating_2_star: null,
            rating_3_star: null,
            rating_4_star: null,
            rating_5_star: null,
            avg_rating: null,
            image_url: "",
            image_small_url: ""
        }
    );

    useEffect(() => {
        const fetchBook = async () => {
            // Must change id to a dependency later
            const response = await fetch(`http://localhost:4000/books/isbn?id=9780345503820`);
            const book = await response.json();setBook(book.entries);
            console.dir(book);
        };

        fetchBook();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexFlow: "row", marginTop: "1em", gap: "2em" }}>
            <Box sx={{ minWidth: 600, borderRadius: "5px", display: "flex", backgroundColor: '#E0DFD5', flex: '0 0 70%' }}>
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
                    src={book.image_url}
                />

                {/* Main information */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#313638' }}>
                    <Typography variant="h3">
                        {book.title}
                    </Typography>
                    <Typography sx={{ fontSize: "1.8em" }}>
                        {book.authors}
                    </Typography>
                    <Typography>
                        {book.publication_year}
                    </Typography>
                    <Typography sx={{ marginTop: "1em" }}>
                        ISBN-13: {book.isbn13}
                    </Typography>

                    <Box>
                        <Box>
                            {/*Used to be avg rating*/}
                        </Box>

                        <Typography sx={{ marginTop: "1em" }}>
                            <Rating size={"medium"} value={1} readOnly />
                            {book.rating_1_star} <br />
                            <Rating size={"medium"} value={2} readOnly />
                            {book.rating_2_star} <br />
                            <Rating size={"medium"} value={3} readOnly />
                            {book.rating_3_star} <br />
                            <Rating size={"medium"} value={4} readOnly />
                            {book.rating_4_star} <br />
                            <Rating size={"medium"} value={5} readOnly />
                            {book.rating_5_star} <br />
                        </Typography>
                    </Box>

                    <Box sx={{ justifyContent: 'space-around' }}>
                        <Button variant="contained" sx={{ margin: 2 }}>Update</Button>
                        <Button variant="contained" sx={{ margin: 2 }} onClick={handleOpen}>Delete</Button>
                    </Box>
                </Box>
            </Box>

            {/* Recommendation sidebar */}
            <Box sx={{ width: 50, display: "flex", flexDirection: "column", flex: '0 0 30%' }}>
                (Other books would go here)
            </Box>

            {/* Confirmation Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Confirm Delete
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Please type the title of the book to confirm deletion:
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Book Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
}

