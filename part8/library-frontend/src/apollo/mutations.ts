import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String
    $author: String
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String, $born: Int) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
