import express from 'express';
import cors from 'cors';
// import apiDocs from './swagger.json' assert { type: 'json' };
import Swagger from "swagger-ui-express";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import ApplicationError from './src/error-handler/applicationError.js';
import jwtAuth from "./src/middlewares/jwt.middleware.js/";

import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/posts/post.routes.js';
import commentRouter from './src/features/comments/comment.routes.js';
import likeRouter from './src/features/likes/like.routes.js';

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDocs = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8"));



const server = express();

server.use(cors());

server.use(express.json());

server.use('/api-docs', Swagger.serve, Swagger.setup(apiDocs));

//logging request first

server.use(loggerMiddleware);

//Default request handler 
server.get("/", (req, res)=>{
    res.send("Welcome to Postaway! Connect your with Friends & Family from anywhere in the world");
})

//post routes handling

server.use("/api/posts", jwtAuth, postRouter);

//user routes handling

server.use("/api/user", userRouter  );

//comment routes handling

server.use("/api/comments", jwtAuth, commentRouter);

//likes routes handling

server.use("/api/likes", jwtAuth, likeRouter);

//error handler middleware

server.use((err, req, res, next)=>{
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }

    console.log(err);

    res.status(500).send("Something went wrong. Please try again later.")

})

//Middleware to handle 404 requests

server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs");
})

server.listen(3200, ()=>{
    console.log("Server is running at port 3200");
})
