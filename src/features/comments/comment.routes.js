import express from "express";
import CommentController from "./comment.controller.js";

const commentRouter = express.Router();

const commentController = new CommentController();

//create comment route

commentRouter.post("/:postId/new", express.urlencoded({extended: true}), commentController.createComment);

//get all comments

commentRouter.get("/:postId/all", commentController.getAllComments);

//update comment

commentRouter.post("/:postId/:commentId", express.urlencoded({extended: true}), commentController.updateComment);

//delete comment

commentRouter.delete("/:postId/:commentId", commentController.deleteComment);


export default commentRouter;