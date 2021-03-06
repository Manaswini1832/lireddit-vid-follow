import { MyContext } from "src/types";
import { Resolver, Query, Ctx } from "type-graphql";
import {Post} from "../entities/Post";

@Resolver()
export class Postresolver {
    @Query(() => [Post])
    posts(
        @Ctx() {em} : MyContext
    ) : Promise<Post[]>{
        return em.find(Post, {});
    }
} 