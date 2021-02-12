import { Postresolver } from './resolvers/post';
import "reflect-metadata";
import { HelloResolver } from './resolvers/hello';
// import { Post } from './entities/Post';
import { __prod__ } from './constants';
import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {buildSchema} from "type-graphql";

const main = async() => {
   const orm = await MikroORM.init(microConfig);
   await orm.getMigrator().up(); 
   
   const app = express();

   const apolloServer = new ApolloServer({
       schema : await buildSchema({
           resolvers: [HelloResolver, Postresolver],
           validate : false,
       }),
       //context contains something that is accessible to all graphql resolvers
       context : () => ({ em: orm.em })
   });

   apolloServer.applyMiddleware({ app });

   app.listen(4000, () => {
       console.log("Server up and running on localhost:4000");
   })
};

main().catch((err) => {
    console.error(err);
});