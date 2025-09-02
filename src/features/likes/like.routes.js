import express from "express";

import LikeController from "./like.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();


//route to add like
likeRouter.post("/like/:postId", likeController.likePost);

//route to remove like from a post

likeRouter.delete("/like/:likeId", likeController.removeLike);

//route to get all likes made to a specific post

likeRouter.get("/like/:postId", likeController.getAllLikes);

export default likeRouter;