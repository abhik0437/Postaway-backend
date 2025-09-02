
import {v4 as uuidv4} from "uuid";

var comments = [];

var lastIndex = 0;
var currentIndex = 0;
var nextIndex = 0;

export default class CommentModel{

    constructor(userId, postId, content){
        this.id = uuidv4();
        this.userId=userId;
        this.postId = postId;
        this.content=content;

    }

    //adding a new comment

    static addComment(userId, postId, content){
        const newComment = new CommentModel(userId, postId, content);
        comments.push(newComment);
        return newComment;

    }

    //getting all comments on a specific post

    static getComments(postId){
        const allComments = comments.filter((comment)=> comment.postId==postId);
        return allComments;
    }

    //updating comment

    static update(userId, postId, commentId, updateText){
        const commentToUpdate = comments.find((comment)=> {
            
            return (comment.userId==userId && comment.postId==postId && comment.id==commentId);

        });
        if(commentToUpdate){
            commentToUpdate.content = updateText;
            return commentToUpdate;

        }else{
            return null;
        }
    }

    //delete comment

    static delete(userId, postId, commentId){
        const commentToDelete = comments.findIndex((comment)=> comment.userId==userId && comment.postId==postId && comment.id==commentId);
        if(commentToDelete){
            comments.splice(commentToDelete,1);
            return true;
        }else{
            return false;
        }
    }


}