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

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:4000/books/title/${title}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // setBook(null);
            } else if (response.status === 404) {
                alert("Book not found.");
            } else {
                alert("Server error - contact support.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error - contact support.");
        }
    };


    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:4000/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData) // Send the entire updateData object
            });

            if (response.ok) {
                const data = await response.json();
                alert("Book updated successfully");
                setBooks(data); // Update book details with new data
            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Error updating book. Please try again later.");
        }

            handleClose();
        };


    const [updateData, setUpdateData] = useState({
        isbn13: "",
        rating_1_star: 0,
        rating_2_star: 0,
        rating_3_star: 0,
        rating_4_star: 0,
        rating_5_star: 0
    });


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
            setUpdateData({
                isbn13: book.entries.isbn13,
                rating_1_star: book.entries.rating_1_star,
                rating_2_star: book.entries.rating_2_star,
                rating_3_star: book.entries.rating_3_star,
                rating_4_star: book.entries.rating_4_star,
                rating_5_star: book.entries.rating_5_star
            });

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
        <Box marginBottom={"1em"}>
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
                                <Button variant="contained" sx={{ margin: 2 }} onClick={handleOpen}>Update</Button>
                                <Button variant="contained" sx={{ margin: 2 }} onClick={handleDelete}>Delete</Button>
                            </Box>
                        </Box>
                    </Box>

                    {/* Confirmation Modal */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography id="modal-title" component="h2">
                                Update Book Ratings
                            </Typography>
                            <Typography id="modal-title" variant="h6" component="h2">
                                Adding on to original number of reviews
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="1 Star Ratings"
                                type="number"
                                value={updateData.rating_1_star}
                                onChange={(e) => setUpdateData({ ...updateData, rating_1_star: parseInt(e.target.value) })}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="2 Star Ratings"
                                type="number"
                                value={updateData.rating_2_star}
                                onChange={(e) => setUpdateData({ ...updateData, rating_2_star: parseInt(e.target.value) })}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="3 Star Ratings"
                                type="number"
                                value={updateData.rating_3_star}
                                onChange={(e) => setUpdateData({ ...updateData, rating_3_star: parseInt(e.target.value) })}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="4 Star Ratings"
                                type="number"
                                value={updateData.rating_4_star}
                                onChange={(e) => setUpdateData({ ...updateData, rating_4_star: parseInt(e.target.value) })}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                label="5 Star Ratings"
                                type="number"
                                value={updateData.rating_5_star}
                                onChange={(e) => setUpdateData({ ...updateData, rating_5_star: parseInt(e.target.value) })}
                            />
                            <Button variant="contained" color="error" onClick={handleUpdate}>
                                Update
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    </Modal>
                </Container>
            ))}
        </Box>
    );
}