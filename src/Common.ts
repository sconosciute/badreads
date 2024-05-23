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

export const testBook :IBook = {
    isbn13: 0,
    authors: "An Author",
    publication: 2024,
    original_title: "An old book",
    title: "A new book",
    ratings: {
        average: 5,
        count: 5,
        rating_1: 0,
        rating_2: 0,
        rating_3: 0,
        rating_4: 0,
        rating_5: 5,
    },
    icons: {
        large: "https://http.cat/200",
        small: "https://http.cat/200"
    }
}