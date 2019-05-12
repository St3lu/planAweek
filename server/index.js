import { ApolloServer } from "apollo-server-express";
import express from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import cookieParser from "cookie-parser";
import fs from "fs";
import mongoose from "mongoose";
import cors from "cors";
import { createTokens } from "./auth";
import { User } from "./models/User";
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
//Create executable schema from modules/[folder]/schema.graphql & modules/[folder]/resolvers.js
let typeDefs, resolvers;
const schemas = [];
const folders = fs.readdirSync("./modules");
folders.forEach(folder => {
  resolvers = require(`./modules/${folder}/resolvers`);
  typeDefs = importSchema(`./modules/${folder}/schema.graphql`);

  schemas.push(makeExecutableSchema({ typeDefs, resolvers }));
});

const server = new ApolloServer({
  schema: mergeSchemas({ schemas }),
  context: ({ req, res }) => ({ req, res })
});

app.use(cookieParser());

app.use(async (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken && !accessToken) {
    return next();
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_JWT);
    req.userId = data.userId;
    return next();
  } catch (err) {}

  if (!refreshToken) {
    return next();
  }
  let data;
  try {
    data = jwt.verify(refreshToken, process.env.REFRESH_JWT);
  } catch (err) {
    return next();
  }
  const user = await User.findById(data.userId);
  //invalid token
  if (!user || user.count !== data.count) {
    return next();
  }
  const tokens = createTokens(user);
  res.cookie("refresh-token", tokens.refreshToken);
  res.cookie("access-token", tokens.accessToken);
  req.userId = user.id;
  next();
});

server.applyMiddleware({ app, cors: false }); // app is from an existing express app

const password = process.env.DBPSSWD;
mongoose
  .connect(`mongodb://St3lu:${password}@ds153556.mlab.com:53556/plantheweek`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to DB");

    app.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
