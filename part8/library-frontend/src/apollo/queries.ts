import { gql } from "@apollo/client";

export const AUTHORS = gql`
  query Authors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const BOOKS = gql`
  query Books($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        born
      }
      genres
      published
    }
  }
`;

export const GENRES = gql`
  query Genres {
    allGenres
  }
`;

export const ME = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;
