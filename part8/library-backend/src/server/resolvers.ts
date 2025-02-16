import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { Author, Book, User } from "../models";
import { authorLoader, bookCountLoader } from "./dataloader";
const pubsub = new PubSub();

export const resolvers = {
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
    allGenres: async () => await Book.distinct("genres"),
    me: async (_, __, context) => {
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

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },

  Book: {
    author: async (root) => await authorLoader.load(root.author),
  },

  Author: {
    bookCount: async (root) => await bookCountLoader.load(root._id),
  },
};
