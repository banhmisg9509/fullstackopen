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
  query Books {
    allBooks {
      title
      author
      published
    }
  }
`;
