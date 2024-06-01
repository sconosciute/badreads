"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { baseUrl } from "@/Common";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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
                    alt="Hunger Games 1 cover"
                    src="https://images.gr-assets.com/books/1447303603s/2767052.jpg"
                />

                {/* Main information */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#313638' }}>
                    <Typography variant="h3">
                        {title}
                    </Typography>
                    <Typography sx={{ fontSize: "1.8em" }}>
                        Author
                    </Typography>
                    <Typography>
                        ISBN-13: [isbn]
                    </Typography>

                    <Box>
                        <Box>
                            <Rating precision={0.1} size={"large"} value={4.5} readOnly sx={{ marginTop: "1em" }} />
                            <Typography>
                                Average rating: [4.5] stars
                            </Typography>
                        </Box>

                        <Typography sx={{ marginTop: "1em" }}>
                            One star ratings: [number] <br />
                            Two star ratings: [number] <br />
                            Three star ratings: [number] <br />
                            Four star ratings: [number] <br />
                            Five star ratings: [number] <br />
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


