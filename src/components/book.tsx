import {IBook} from "@/Common";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export default function Book({book}: { book: IBook }) {
    return (
        <Container maxWidth="lg">
            <Paper sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <Box
                    id="cover-image"
                    component="img"
                    margin={"1em"}
                    sx={{
                        height: 400,
                        width: 270,
                        maxHeight: {xs: 800, md: 1000},
                        maxWidth: {xs: 540, md: 675},
                    }}
                    alt={book.title}
                    src={book.icons.large}
                />
                <Box id={"info-pane"} sx={{margin: "1.5em"}}>
                    <Box id="main-info"
                         sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Typography variant="h2" sx={{fontSize: "2em"}}>
                            {book.title}
                        </Typography>
                        <Typography sx={{fontSize: "1.6em", fontFamily: "'Inter', sans-serif"}}>
                            {book.authors}
                        </Typography>
                        <Typography>
                            Published: {book.publication}
                        </Typography>
                        <Typography sx={{marginTop: "1em"}}>
                            ISBN-13: {book.isbn13}
                        </Typography>
                    </Box>
                    <Box id="ratings" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginTop: "1em"
                    }}>
                        <Typography variant={"h3"} sx={{fontSize: "1.6em"}}>
                            Ratings
                        </Typography>
                        <Typography sx={{paddingLeft: 2}}>
                            <strong>Average Rating:</strong> {book.ratings.average} stars
                        </Typography>
                        <TableContainer component={Paper} sx={{maxWidth: "20em", marginTop: "1em"}}>
                            <Table aria-label="Rating counts" size="small">
                                <TableHead >
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "700"}}>Rating</TableCell>
                                        <TableCell sx={{fontWeight: "700"}}>Num Ratings</TableCell>
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}