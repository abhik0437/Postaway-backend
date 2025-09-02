import LikeModel from "./like.model.js";

export default class LikeController{

    //adding like to a post

    likePost(req,res){
        const {userId} = req;
        const {postId} = req.params;

        const newLike = LikeModel.addLike(postId, userId);
        if(newLike){
           return res.status(201).send(newLike);
        }else{
            return res.status(400).send("Sorry, post not found");
        }

    }

    //remove like from a post

    removeLike(req,res){
        const {likeId} = req.params;
        const isLikeRemoved = LikeModel.remove(likeId);
        if(isLikeRemoved){
            return res.status(200).send("Like removed successfully");
        }else{
            return res.status(400).send("No like on post to remove");
        }
    }

    //get all likes made to a specific post

    getAllLikes(req,res){
        const {postId} = req.params;
        const allLikes= LikeModel.getAll(postId);
        if(allLikes.length>0){
        res.status(200).send(allLikes);
        }else{
            res.status(400).send("no likes on this post yet");
        }
    }
}