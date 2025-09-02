import express from "express";
import PostController from "./post.controller.js";

import {upload} from "../../middlewares/fileupload.middleware.js";

const postRouter = express.Router();

const postController = new PostController();

postRouter.post("/new/", upload.single("image"), postController.createPost);

postRouter.post("/new/:postId", upload.single("image"), postController.createPost);

postRouter.get("/all", postController.getAllPosts);

postRouter.get("/myposts", postController.getUserPosts);

postRouter.get("/post/:postId", postController.getSinglePost);

postRouter.post("/post/:postId", upload.single("image"), postController.updatePost);

postRouter.post("/archive/:postId", postController.togglePostArchive);

postRouter.post("/post/bookmark/:postId", postController.togglePostBookmark);

postRouter.delete("/post/delete/:postId", postController.deletePost);

postRouter.get("/next", postController.nextPosts );

postRouter.get("/prev", postController.prevPosts);

export default postRouter;