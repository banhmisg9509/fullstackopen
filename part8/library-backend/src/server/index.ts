import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { GraphQLError } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import jwt, { JwtPayload } from "jsonwebtoken";
import http from "node:http";
import { authMiddleware, errorMiddleware } from "../middleware";
import { User } from "../models";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { expressMiddleware } from "@apollo/server/express4";
import { useServer } from "graphql-ws/use/ws";
import { WebSocketServer } from "ws";

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    authMiddleware,
    errorMiddleware
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    formatError: (err) => {
      return {
        message: err.message || "An error occurred",
        extensions: {
          code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
        },
      };
    },
  });

  const context = async ({ req }) => {
    const token = req.headers.authorization || null;
    if (!token || !token.startsWith("Bearer ")) return {};
    try {
      const decoded = jwt.verify(
        token.slice(7),
        String(process.env.JWT_SECRET)
      );
      const user = await User.findById((decoded as JwtPayload).id);
      if (!user) {
        throw new GraphQLError("User not found");
      }
      return { user };
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new GraphQLError("JSON Web Token is invalid.", {
          extensions: {
            code: "UNAUTHORIZED_ERROR",
          },
        });
      } else if (error.name === "TokenExpiredError") {
        throw new GraphQLError("JSON Web Token is expired.", {
          extensions: {
            code: "UNAUTHORIZED_ERROR",
          },
        });
      }
    }
  };

  await server.start();

  app.use("/", cors(), express.json(), expressMiddleware(server, { context }));

  const port = 4000;

  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

export default start;
