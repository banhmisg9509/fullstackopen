import { gql } from "@apollo/client";

export const ADDED_BOOK = gql`
  subscription BookAdded {
    bookAdded {
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
