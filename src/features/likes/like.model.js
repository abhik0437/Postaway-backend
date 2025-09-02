var likes = [];

import PostModel from "../posts/post.model.js";


import {v4 as uuidv4} from "uuid";

export default class LikeModel{

    constructor(postId, userId){
        this.id= uuidv4();
        this.postId=postId;
        this.userId=userId
    }

    static addLike(postId, userId){
        const posts = PostModel.getAll();
        const postIndex = posts.findIndex(p=> p.id==postId);
        if(postIndex>-1){
            const newLike = new LikeModel(postId, userId);
            likes.push(newLike);
            return newLike;

        }else{
            return null;
        }
        
    }

    static remove(likeId){
         const likeIndex = likes.findIndex(like=> like.id==likeId);
         if(likeIndex>=0){
            likes.splice(likeIndex, 1);
            return true;

         }else{
            return false;
         }
         
         
    }

    static getAll(postId){
        const allLikes = likes.filter(like=> like.postId==postId);
        return allLikes;
    }

}