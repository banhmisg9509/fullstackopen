import { GraphQLError } from "graphql";

export const authMiddleware = async (resolve, parent, args, context, info) => {
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

export const errorMiddleware = async (resolve, parent, args, context, info) => {
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
