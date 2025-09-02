import CommentModel from "./comment.model.js";

export default class CommentController{

    //create comment

    createComment(req,res){
        const userId  = req.userId;
        const {postId} = req.params;
        const {content} = req.body;

        const newComment = CommentModel.addComment(userId, postId, content);
        return res.status(201).send(newComment);
    }

    //get all comments on a specific post

    getAllComments(req, res){
        const {postId} = req.params;
        const allComments = CommentModel.getComments(postId);
        if(allComments.length>-1){
return res.status(200).send(allComments);
        }else{
            return res.status(400).send("No comments made on this post yet");
        }
        

    }

    //update comment made by a specific user

    updateComment(req,res){
        const userId  = req.userId;
        const {postId, commentId} = req.params;
        const {content} = req.body;
        
       
        const updatedComment = CommentModel.update(userId,postId,commentId,content);
        if(updatedComment){
            return res.status(201).send(updatedComment);
        }else{
            return res.status(400).send("Sorry, no comment found to update");
        }

    }

    //delete comment made by user

    deleteComment(req, res){
        const userId  = req.userId;
        const {postId, commentId} = req.params;

        const isCommentDeleted = CommentModel.delete(userId, postId, commentId);

        if(isCommentDeleted){
            return res.status(201).send("Comment deleted successfully");
        }else{
            return res.status(400).send("Sorry, no comment found to delete");
        }

    }

    
}