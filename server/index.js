import { ApolloServer } from "apollo-server-express";
import express from "express";
const app = express();
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import * as cookieParser from "cookie-parser";
import fs from "fs";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

let typeDefs, resolvers;
const schemas = [];
const folders = fs.readdirSync("./modules");
folders.forEach(folder => {
  resolvers = require(`./modules/${folder}/resolvers`);
  typeDefs = importSchema(`./modules/${folder}/schema.graphql`);

  schemas.push(makeExecutableSchema({ typeDefs, resolvers }));
});

const server = new ApolloServer({
  schema: mergeSchemas({ schemas })
});

//app.use(cookieParser());

server.applyMiddleware({ app }); // app is from an existing express app

app.use(cors);
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
