import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import "dotenv/config";
import { GraphQLError } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import Author from "./models/Author";
import Book from "./models/Book";
import User from "./models/User";
import connectDB from "./utils/connectDB";
import jwt, { JwtPayload } from "jsonwebtoken";

connectDB();

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    addBook(title: String, author: String, published: Int, genres: [String]): Book
    editAuthor(name: String, born: Int): Author
    createUser(username: String!, password: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (_, args) => {
      const { author, genre } = args;
      let query: Record<string, any> = {};

      const foundAuthor = await Author.findOne({ name: author });

      if (foundAuthor) {
        query.author = foundAuthor._id;
      }

      if (genre) {
        query.genres = { $in: [genre] };
      }

      return await Book.find(query);
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => {
      return context.user;
    },
  },

  Mutation: {
    addBook: async (_, args, context) => {
      const { title, author, published, genres } = args;

      let foundAuthor = await Author.findOne({ name: author });
      if (!foundAuthor) {
        const newAuthor = new Author({
          name: author,
          born: null,
        });
        foundAuthor = await newAuthor.save();
      }

      const newBook = new Book({
        title,
        author: foundAuthor._id,
        published,
        genres,
      });

      await newBook.save();

      return newBook;
    },
    editAuthor: async (_, args, context) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        {
          born: args.born || undefined,
        },
        { new: true }
      );
      return author;
    },
    createUser: async (_, args) => {
      const { username, password, favoriteGenre } = args;

      const user = new User({
        username,
        password,
        favoriteGenre: favoriteGenre ?? "",
      });

      await user.save();

      return user;
    },
    login: async (_, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username }).select("+password");

      if (!user || !(await user.comparePassword(password))) {
        throw new GraphQLError("Wrong username or password");
      }

      return { value: user.getJWTToken() };
    },
  },

  Book: {
    author: async (root) => await Author.findById(root.author),
  },

  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  },
};

const authMiddleware = async (resolve, parent, args, context, info) => {
  if (["me", "addBook", "editAuthor"].includes(info.fieldName)) {
    if (!context.user) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          code: "UNAUTHORIZED_ERROR",
        },
      });
    }
  }
  return await resolve(parent, args, context, info);
};

const errorMiddleware = async (resolve, parent, args, context, info) => {
  try {
    return await resolve(parent, args, context, info);
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new GraphQLError(error.message, {
        extensions: {
          code: "VALIDATION_ERROR",
        },
      });
    } else if (error.code === 11000) {
      throw new GraphQLError(
        `Duplicate ${Object.keys(error.keyValue)} entered`,
        {
          extensions: {
            code: "DUPLICATE_ERROR",
          },
        }
      );
    }
    throw error;
  }
};

const context = async ({ req }) => {
  const token = req.headers.authorization || null;
  if (!token || !token.startsWith("Bearer ")) return {};

  const decoded = jwt.verify(token.slice(7), String(process.env.JWT_SECRET));
  const user = await User.findById((decoded as JwtPayload).id);
  if (!user) {
    throw new GraphQLError("User not found");
  }

  return { user };
};

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    authMiddleware,
    errorMiddleware
  ),
  formatError: (err) => {
    return {
      message: err.message || "An error occurred",
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
    };
  },
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
