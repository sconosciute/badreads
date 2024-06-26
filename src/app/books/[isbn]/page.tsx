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
import {getBookIsbn} from "@/components/SearchResults";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function books({params}:{params:{isbn:string}}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [books, setBooks] = useState<IBook[]>([]);
    const [error, setError] = useState<string | null>(null);


    // An object to hold different ratings counts
    const [newRatings, setNewRatings] = useState({
        rating_1_star: "",
        rating_2_star: "",
        rating_3_star: "",
        rating_4_star: "",
        rating_5_star: "",
    });

    // Get the new rating count
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewRatings((prevRatings) => ({
            ...prevRatings,
            [name]: Number(value), // Convert value to a number
        }));
    };

    // Function to update the book's rating counts
    function handleSubmit(isbn : number) {
        const submit = async () => {
            try {
                const response = await fetch(`http://localhost:4000/books`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isbn13: isbn,
                        rating_1_star: newRatings.rating_1_star,
                        rating_2_star: newRatings.rating_2_star,
                        rating_3_star: newRatings.rating_3_star,
                        rating_4_star: newRatings.rating_4_star,
                        rating_5_star: newRatings.rating_5_star
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Book updated.");
                    handleClose();
                    window.location.reload();
                } else {
                    throw new Error(data.message || "Failed to update ratings.");
                }

            } catch (error) {
                console.error("Error:", error);
                alert("Server error - contact support.");
            }
        };

        submit();
    }

    // Function to delete a book by title. Refreshes page.
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

    // Get book(s) from API
    useEffect(() => {
        getBookIsbn(params.isbn, "1", "1")
            .then((res)=> {
                const fetchBook = async () => {
                    const response = await fetch(`http://localhost:4000/books/isbn?id=${params.isbn}`);

                    if (!response.ok) {
                        setError('Failed to fetch book.');
                    }

                    const book = await response.json();
                    setBooks(book.entries);
                };
                fetchBook();
            })
    }, []);

    // Handle error (No books found)
    if (error) {
        return (
            <Container maxWidth="lg" sx={{ display: 'flex', flexFlow: "row", marginTop: "1em", gap: "2em", justifyContent:"center" }}>
                <Box sx={{ padding: "0.5em", minWidth: 600, borderRadius: "5px", display: "flex", backgroundColor: '#E0DFD5',  flex: '0 0 70%'}}>
                    <Typography>No books found with the given ISBN.</Typography>
                </Box>
            </Container>
        );
    }

    // Display book(s) details on page
    return (
        <Box marginBottom={"1em"}>
            {books.map((book, index) => (
                <Container key={index} maxWidth="lg" sx={{ display: 'flex', flexFlow: "row", marginTop: "1em", gap: "2em", justifyContent:"center" }}>
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
                            src={book.icons.large ? book.icons.large : 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'}
                        />

                        {/* Main information */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#313638' }}>
                            <Typography variant="h4">
                                {book.title}
                            </Typography>
                            <Typography variant="body1">
                                Original title: {book.original_title}
                            </Typography>
                            <Typography sx={{ fontSize: "1.6em", marginTop: "1em" }}>
                                {book.authors}
                            </Typography>
                            <Typography sx={{ marginTop: "1em" }}>
                                {book.publication}
                            </Typography>
                            <Typography sx={{ marginTop: "1em" }}>
                                ISBN-13: {book.isbn13}
                            </Typography>

                            {/* Ratings */}
                            <Box>
                                <Box sx={{ marginTop: "1em" }}>
                                    <Typography>Average Rating: {book.ratings.average.toFixed(2)}</Typography>
                                    <Rating size={"medium"} precision={0.1} value={book.ratings.average} readOnly />
                                </Box>

                                <TableContainer component={Paper} sx={{maxWidth: "20em", marginTop: "1em"}}>
                                    <Table aria-label="Rating counts" size="small">
                                        <TableHead >
                                            <TableRow>
                                                <TableCell sx={{fontWeight: "700"}}>Rating</TableCell>
                                                <TableCell sx={{fontWeight: "700"}}>No. of Ratings</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>1-star</TableCell>
                                                <TableCell>{book.ratings.rating_1}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>2-star</TableCell>
                                                <TableCell>{book.ratings.rating_2}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>3-star</TableCell>
                                                <TableCell>{book.ratings.rating_3}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>4-star</TableCell>
                                                <TableCell>{book.ratings.rating_4}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>5-star</TableCell>
                                                <TableCell>{book.ratings.rating_5}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Total</TableCell>
                                                <TableCell>{book.ratings.count}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>

                            {/* Buttons */}
                            <Box sx={{ justifyContent: 'space-around' }}>
                                <Button variant="contained" sx={{ margin: 2 }} onClick={handleOpen}>Update</Button>
                                <Button variant="contained" sx={{ margin: 2 }} onClick={() => handleDelete(book.title)}>Delete</Button>
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
                            <Typography id="modal-title" variant="h6" component="h2">
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
                                value={newRatings.rating_1_star}
                                onChange={handleChange}
                                name="rating_1_star"
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="2 Star Ratings"
                                type="number"
                                value={newRatings.rating_2_star}
                                onChange={handleChange}
                                name="rating_2_star"
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="3 Star Ratings"
                                type="number"
                                value={newRatings.rating_3_star}
                                onChange={handleChange}
                                name="rating_3_star"
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="4 Star Ratings"
                                type="number"
                                value={newRatings.rating_4_star}
                                onChange={handleChange}
                                name="rating_4_star"
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="5 Star Ratings"
                                type="number"
                                value={newRatings.rating_5_star}
                                onChange={handleChange}
                                name="rating_5_star"
                            />
                            <Button variant="contained" color="error" onClick={() => handleSubmit(book.isbn13)}>
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