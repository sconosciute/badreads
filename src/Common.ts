export interface IRatings {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
}

export interface IUrlIcon {
    large: string;
    small: string;
}

export interface IBook {
    isbn13: number;
    authors: string;
    publication: number;
    original_title: string;
    title: string;
    ratings: IRatings;
    icons: IUrlIcon;
}

export interface IBookResponse extends Response {
    entries: IBook[],
    currentPage: number,
    pageSize: number,
    totalPages: number,
    totalBooks: number
}

export const testBook: IBook = {
    isbn13: 0,
    authors: "An Author",
    publication: 2024,
    original_title: "An old book",
    title: "A new book",
    ratings: {
        average: 4.5,
        count: 5,
        rating_1: 0,
        rating_2: 0,
        rating_3: 0,
        rating_4: 1,
        rating_5: 4,
    },
    icons: {
        large: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
        small: "https://images.gr-assets.com/books/1447303603s/2767052.jpg"
    }
}

export enum searchTypes {
    author = "author",
    isbn = "isbn",
    title = "title"
}

export const baseUrl = "http://localhost:4000"