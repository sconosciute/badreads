"use client"

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookCard from "@/components/BookCard";  // Ensure this component is imported correctly
import Button from "@mui/material/Button";

export default function BookDetails() {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleBookCardClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "80vh" }}>

                <Box sx={{ minWidth: 200, borderRadius: "5px", display: "flex", flexDirection: "column", backgroundColor: '#CBAC8F', marginBottom: 4 }}
                onClick={handleBookCardClick}
            >
                <BookCard
                    book={{
                        title: "Title",
                        authors: "Author",
                        ratings: { average: 4.5 },
                        icons: { large: "https://images.gr-assets.com/books/1447303603s/2767052.jpg" }
                    }}
                />

                {isExpanded && (
                    <Box sx={{ padding: 1 }}>
                        <Typography variant="h6" align= 'center'>Full Book Details</Typography>
                    </Box>
                )}

                <Button variant="contained" sx={{ backgroundColor: '#F06543', height: '50px', width: '150px', mt: 1, alignSelf: 'center' }}>
                    Update Book
                </Button>
            </Box>
        </Container>
    );
}
