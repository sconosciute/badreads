import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import PublishIcon from '@mui/icons-material/Publish';
import ReplayIcon from '@mui/icons-material/Replay';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const fieldStyle = {
  pt: 0,
  pb: 2,
};

{
  /* Create a title for a input textfield */
}
const getPrimary = (text: string) => {
  return (
    <Typography variant="h5" fontSize="1.2rem">
      {text}
    </Typography>
  );
};

{
  /* Create a subtitle for a input textfield */
}
const getSecondary = (text: string) => {
  return (
    <Typography sx={{ mb: -1.5 }} variant="h6" fontSize="0.9rem" color={"gray"}>
      {text}
    </Typography>
  );
};

export default function AddBookDialog() {
  {
    /* Functons for setting input values */
  }
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [originalTitle, setOriginalTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [year, setYear] = React.useState("");
  const [isbn, setISBN] = React.useState("");
  const [star1, setStar1] = React.useState("");
  const [star2, setStar2] = React.useState("");
  const [star3, setStar3] = React.useState("");
  const [star4, setStar4] = React.useState("");
  const [star5, setStar5] = React.useState("");
  const [smallImage, setSmallImage] = React.useState("");
  const [largeImage, setLargeImage] = React.useState("");

  {
    /* Functions for validating input values */
  }
  const [validTitle, setValidTitle] = React.useState(true);
  const [validOriginalTitle, setValidOriginalTitle] = React.useState(true);
  const [validAuthor, setValidAuthor] = React.useState(true);
  const [validYear, setValidYear] = React.useState(true);
  const [validISBN, setValidISBN] = React.useState(true);
  const [validStar1, setValidStar1] = React.useState(true);
  const [validStar2, setValidStar2] = React.useState(true);
  const [validStar3, setValidStar3] = React.useState(true);
  const [validStar4, setValidStar4] = React.useState(true);
  const [validStar5, setValidStar5] = React.useState(true);
  const [validSmallImage, setValidSmallImage] = React.useState(true);
  const [validLargeImage, setValidLargeImage] = React.useState(true);

  {
    /* Open dialog */
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  {
    /* Close dialog*/
  }
  const handleClose = () => {
    setOpen(false);
  };

  {
    /* Reset validation state for all inputs (set all to true) */
  }
  const resetStates = () => {
    setValidTitle(true);
    setValidOriginalTitle(true);
    setValidAuthor(true);
    setValidYear(true);
    setValidISBN(true);
    setValidStar1(true);
    setValidStar2(true);
    setValidStar3(true);
    setValidStar4(true);
    setValidStar5(true);
    setValidSmallImage(true);
    setValidLargeImage(true);
  };

  {
    /* Validate all inputs when ADD button is clicked */
  }
  const handleSubmit = () => {
    setValidTitle(String(title).trim().length > 0);
    setValidOriginalTitle(String(originalTitle).trim().length > 0);
    setValidAuthor(String(author).trim().length > 0);
    setValidYear(() => {
      const y = Number(year);
      return Number.isInteger(y) && y > 0 && y <= new Date().getFullYear();
    });
    setValidISBN(
      Number.isInteger(Number(isbn)) && String(isbn).trim().length == 13
    );
    setValidStar1(Number.isInteger(Number(star1)) && Number(star1) > -1);
    setValidStar2(Number.isInteger(Number(star2)) && Number(star2) > -1);
    setValidStar3(Number.isInteger(Number(star3)) && Number(star3) > -1);
    setValidStar4(Number.isInteger(Number(star4)) && Number(star4) > -1);
    setValidStar5(Number.isInteger(Number(star5)) && Number(star5) > -1);
    setValidSmallImage(() => {
      const s = String(smallImage);
      return s.length == 0 || s.endsWith(".jpg") || s.endsWith(".png");
    });
    setValidLargeImage(() => {
      const l = String(largeImage);
      return l.length == 0 || l.endsWith(".jpg") || l.endsWith(".png");
    });
  };

  {
    /* Send a POST request if all inputs are valid */
  }
  const onSubmitAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validTitle &&
      validOriginalTitle &&
      validAuthor &&
      validYear &&
      validISBN &&
      validStar1 &&
      validStar2 &&
      validStar3 &&
      validStar4 &&
      validStar5 &&
      validSmallImage &&
      validLargeImage
    ) {
      // Get values from textfield
      const data = new FormData(e.currentTarget);
      const validateFields = {
        isbn13: data.get("isbn"),
        authors: data.get("author"),
        publication_year: data.get("year"),
        original_title: data.get("original-title"),
        title: data.get("title"),
        rating_1_star: data.get("star-1"),
        rating_2_star: data.get("star-2"),
        rating_3_star: data.get("star-3"),
        rating_4_star: data.get("star-4"),
        rating_5_star: data.get("star-5"),
        image_url: data.get("large-image"),
        image_small_url: data.get("small-image"),
      };
      // Send POST request
      fetch("http://localhost:4000/books/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validateFields),
      })
        .then((res) => {
          if (res.status == 201) {
            alert("Book added successfully!")
            resetStates();
            handleClose();
          }
          else {
            res.json().then((body) => {
              alert("Fail to add book due to: " + body.message);
            })
          }
        })
    } else {
      alert("You have entered invalid values. Please check again.");
    }
  };

  return (
    <React.Fragment>
      {/* Button in the nav bar, used to open a dialog to add book */}
      <Button variant="contained" sx={{ pl: 1.5 }} onClick={handleClickOpen}>
        <AddCircleIcon sx={{ mr: 0.5 }} />
        Add Book
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          component: "form",
          onSubmit: onSubmitAction,
        }}
      >
        <AppBar sx={{ position: "sticky" }}>
          {/* Header and a button to close dialog */}
          <Toolbar>
            {/* Close button */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>

            {/* Header for the dialog */}
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h4"
              fontSize="1.5rem"
              component="div"
            >
              Add a new book
            </Typography>

            {/* Add book button */}
            <Button
              style={{
                width: 100,
                marginRight: 10,
              }}
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              endIcon={<PublishIcon />}
            >
              Add
            </Button>

            {/* Reset button */}
            <Button
              style={{
                width: 100,
              }}
              type="reset"
              variant="contained"
              onClick={resetStates}
              endIcon={<ReplayIcon />}
            >
              Reset
            </Button>
          </Toolbar>
        </AppBar>

        {/* A list of required input */}
        <List>
          {/* Title */}
          <ListItem>
            <ListItemText primary={getPrimary("Title:")} />
          </ListItem>
          <ListItem sx={fieldStyle}>
            <TextField
              required
              fullWidth
              error={!validTitle}
              id="add-book-title"
              name="title"
              label={validTitle ? "Required" : "You have not enter the title"}
              variant="standard"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </ListItem>
          <Divider />

          {/* Original title */}
          <ListItem>
            <ListItemText primary={getPrimary("Original Title:")} />
          </ListItem>
          <ListItem sx={fieldStyle}>
            <TextField
              required
              fullWidth
              error={!validOriginalTitle}
              id="add-book-original-title"
              name="original-title"
              label={
                validOriginalTitle
                  ? "Required"
                  : "You have not enter the original title"
              }
              variant="standard"
              onChange={(e) => {
                setOriginalTitle(e.target.value);
              }}
            />
          </ListItem>
          <Divider />

          {/* Author */}
          <ListItem>
            <ListItemText
              primary={getPrimary("Author(s):")}
              secondary={getSecondary("Separate different authors by comma")}
            />
          </ListItem>
          <ListItem sx={fieldStyle}>
            <TextField
              required
              fullWidth
              error={!validAuthor}
              id="add-book-author"
              name="author"
              label={
                validAuthor ? "Required" : "You have not enter any author name"
              }
              variant="standard"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </ListItem>
          <Divider />

          {/* Publication year */}
          <ListItem>
            <ListItemText
              primary={getPrimary("Publication Year:")}
              secondary={getSecondary(
                "Numeric value between 1 and current year (inclusively)"
              )}
            />
          </ListItem>
          <ListItem sx={fieldStyle}>
            <TextField
              required
              fullWidth
              error={!validYear}
              id="add-book-year"
              name="year"
              label={
                validYear
                  ? "Required"
                  : "The number you entered is not a positive integer or is not in valid range"
              }
              variant="standard"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </ListItem>
          <Divider />

          {/* ISBN 13 */}
          <ListItem>
            <ListItemText
              primary={getPrimary("ISBN-13:")}
              secondary={getSecondary("13-digits ISBN number")}
            />
          </ListItem>
          <ListItem sx={fieldStyle}>
            <TextField
              required
              fullWidth
              error={!validISBN}
              id="add-book-isbn"
              name="isbn"
              label={
                validISBN
                  ? "Required"
                  : "The number you entered is not a positive integer or is not 13 digits long"
              }
              variant="standard"
              onChange={(e) => {
                setISBN(e.target.value);
              }}
            />
          </ListItem>
          <Divider />

          {/* Ratings */}
          <ListItem>
            <ListItemText
              primary={getPrimary("Ratings:")}
              secondary={getSecondary("Number of rating in each star")}
            />
          </ListItem>
          <ListItem sx={fieldStyle}>
            <Grid container spacing={2} columns={5}>
              {/* Star 1 Rating */}
              <Grid item xs={5} md={1}>
                <TextField
                  required
                  fullWidth
                  error={!validStar1}
                  id="add-book-star-1"
                  name="star-1"
                  label={
                    validStar1
                      ? "Star 1"
                      : "The number you entered is not a positive integer"
                  }
                  variant="standard"
                  onChange={(e) => {
                    setStar1(e.target.value);
                  }}
                />
              </Grid>

              {/* Star 2 Rating */}
              <Grid item xs={5} md={1}>
                <TextField
                  required
                  fullWidth
                  error={!validStar2}
                  id="add-book-star-2"
                  name="star-2"
                  label={
                    validStar2
                      ? "Star 2"
                      : "The number you entered is not a positive integer"
                  }
                  variant="standard"
                  onChange={(e) => {
                    setStar2(e.target.value);
                  }}
                />
              </Grid>

              {/* Star 3 Rating */}
              <Grid item xs={5} md={1}>
                <TextField
                  required
                  fullWidth
                  error={!validStar3}
                  id="add-book-star-3"
                  name="star-3"
                  label={
                    validStar3
                      ? "Star 3"
                      : "The number you entered is not a positive integer"
                  }
                  variant="standard"
                  onChange={(e) => {
                    setStar3(e.target.value);
                  }}
                />
              </Grid>

              {/* Star 4 Rating */}
              <Grid item xs={5} md={1}>
                <TextField
                  required
                  fullWidth
                  error={!validStar4}
                  id="add-book-star-4"
                  name="star-4"
                  label={
                    validStar4
                      ? "Star 4"
                      : "The number you entered is not a positive integer"
                  }
                  variant="standard"
                  onChange={(e) => {
                    setStar4(e.target.value);
                  }}
                />
              </Grid>

              {/* Star 5 Rating */}
              <Grid item xs={5} md={1}>
                <TextField
                  required
                  fullWidth
                  error={!validStar5}
                  id="add-book-star-5"
                  name="star-5"
                  label={
                    validStar5
                      ? "Star 5"
                      : "The number you entered is not a positive integer"
                  }
                  variant="standard"
                  onChange={(e) => {
                    setStar5(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider />

          {/* Image url */}
          <ListItem>
            <ListItemText primary={getPrimary("Image URLs (Optional):")} />
          </ListItem>

          {/* Small image url */}
          <ListItem sx={fieldStyle}>
            <TextField
              fullWidth
              error={!validSmallImage}
              id="add-book-small-image"
              name="small-image"
              label={
                validSmallImage
                  ? "Small Image"
                  : "This is an invalid image URL for small image"
              }
              variant="standard"
              onChange={(e) => {
                setSmallImage(e.target.value);
              }}
            />
          </ListItem>

          {/* Large image url */}
          <ListItem sx={fieldStyle}>
            <TextField
              fullWidth
              error={!validLargeImage}
              id="add-book-large-image"
              name="large-image"
              label={
                validLargeImage
                  ? "Large Image"
                  : "This is an invalid image URL for large image"
              }
              variant="standard"
              onChange={(e) => {
                setLargeImage(e.target.value);
              }}
            />
          </ListItem>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
