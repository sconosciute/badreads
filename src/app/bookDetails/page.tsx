"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {baseUrl, IBook} from "@/Common";

export default function BookInfo() {
    const [open, setOpen] = useState(false);
    const [isbn, setIsbn] = useState("");
    const [book, setBook] = useState<IBook | null>(null);
    const [updateData, setUpdateData] = useState({
        isbn13: "",
        rating_1_star: 0,
        rating_2_star: 0,
        rating_3_star: 0,
        rating_4_star: 0,
        rating_5_star: 0,
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFetchBook = async () => {
        try {
            const response = await fetch(`http://localhost:4000/books/isbn?id=${isbn}`);

            if (response.ok) {
                const data = await response.json();
                if (data.entries && data.entries.length > 0) {
                    setBook(data.entries[0]);
                } else {
                    alert("No book data found.");
                }
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





    const handleDelete = async () => {
        if (!book) return;
        try {
            const response = await fetch(`http://localhost:4000/books/title/${book.title}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setBook(null);
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
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const data = await response.json();
                alert("Book updated successfully");
                setBook(data); // Optionally, update the book details display with the new data
            } else {
                alert("Server error - contact support.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error - contact support.");
        }

        handleClose();
    };

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexFlow: "row", marginTop: "1em", gap: "2em" }}>
            <Box sx={{ width: 50, height: 100, borderRadius: "5px", display: "flex", backgroundColor: '#E0DFD5', flex: '0 0 35%', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#313638', padding: '1em' }}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        sx={{ marginBottom: '1em' }}
                    />
                    <Button variant="contained" size="small" onClick={handleFetchBook}>Fetch Book</Button>
                </Box>
            </Box>


            {book && (
                <Box sx={{ minWidth: 300, borderRadius: "5px", display: "flex", backgroundColor: '#E0DFD5', flex: '0 0 70%' }}>
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

                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#313638' }}>
                        <Typography component="div" variant={"h5"}>
                            {book.title}
                        </Typography>
                        <Typography component="div" variant={"h6"}>
                            {book.authors}
                        </Typography>
                        <Typography component="div" variant={"h6"}>
                            {book.isbn13}
                        </Typography>
                        <Typography component="div" variant={"h6"}>
                            {book.original_title}
                        </Typography>
                        <Typography component="div" variant={"h6"}>
                            {book.publication}
                        </Typography>

                        <Box>
                            {/*<Rating precision={0.1} size={"large"} value={4.5} readOnly sx={{ marginTop: "1em" }} />*/}
                            {/*<Typography>*/}
                            {/*    Average rating: [4.5] stars*/}
                            {/*</Typography>*/}
                        </Box>

                        <Typography sx={{ marginTop: "1em" }}>
                            One star ratings: {book.ratings.rating_1} <br />
                            Two star ratings: {book.ratings.rating_2} <br />
                            Three star ratings: {book.ratings.rating_3} <br />
                            Four star ratings: {book.ratings.rating_4} <br />
                            Five star ratings: {book.ratings.rating_5} <br />
                        </Typography>

                        <Box sx={{ justifyContent: 'space-around' }}>
                            <Button variant="contained" sx={{ margin: 2 }} onClick={handleOpen}>Update</Button>
                            <Button variant="contained" sx={{ margin: 2 }} onClick={handleDelete}>Delete</Button>
                        </Box>
                    </Box>
                </Box>
            )}

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
                        Update Book Info
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="1 Star Ratings"
                        type="number"
                        value={updateData.rating_1_star}
                        onChange={(e) => setUpdateData({ ...updateData, rating_1_star: parseInt(e.target.value)})}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="2 Star Ratings"
                        type="number"
                        value={updateData.rating_2_star}
                        onChange={(e) => setUpdateData({ ...updateData, rating_2_star: parseInt(e.target.value)})}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="3 Star Ratings"
                        type="number"
                        value={updateData.rating_3_star}
                        onChange={(e) => setUpdateData({ ...updateData, rating_3_star: parseInt(e.target.value)})}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="4 Star Ratings"
                        type="number"
                        value={updateData.rating_4_star}
                        onChange={(e) => setUpdateData({ ...updateData, rating_4_star: parseInt(e.target.value)})}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        label="5 Star Ratings"
                        type="number"
                        value={updateData.rating_5_star}
                        onChange={(e) => setUpdateData({ ...updateData, rating_5_star: parseInt(e.target.value)})}
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
    );
}



