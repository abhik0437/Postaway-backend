import {v4 as uuidv4} from "uuid";
import User from "../user/user.model.js";

var posts =[];
var draftPosts= [];
var archivedPosts = [];

var lastIndex = 0;
var currentIndex = 0;
var nextIndex = 0;

class PostModel{
    constructor(userId, caption, imageUrl, postId, status){
        this.userId=userId,
        this.caption=caption,
        this.id = postId?postId:uuidv4(),
        this.imageUrl = imageUrl,
        this.status=status,
        this.isArchive = false;
    
    }

    //creating new post

    static newPost(userId, caption, imageUrl, postId, status){
        
        if(postId && status.includes("draft")){
            const post = draftPosts.find(p=> p.id==postId);
                if(caption){
                    post.caption=caption;

                }
                
                if(imageUrl){
                    post.imageUrl=imageUrl;
                }
                
                return post;
            
          
 
        }else if(postId && status.includes("publish")){
            const postIndex = draftPosts.findIndex(p=> p.id==postId);
            const post = draftPosts[postIndex];
                if(caption){
                    post.caption=caption;

                }
                
                if(imageUrl){
                    post.imageUrl=imageUrl;
                }
                post.status="published";

                draftPosts.splice(postIndex,1);
                posts.push(post);

                return post;


        }else if(status && status.includes("draft")){
            
            const newPost = new PostModel(userId, caption, imageUrl,null, "draft");
            draftPosts.push(newPost);
            return newPost;
        }
        const newPost = new PostModel(userId, caption, imageUrl,null, "published");
        posts.push(newPost);
        return newPost;
    }

    //retrieving all posts

    static getAll(){

        if(posts[nextIndex+5]){
            nextIndex+=5;
            currentIndex+=5;
            return posts.slice(lastIndex, nextIndex);
        }else{
            let tempNext = posts.length-1;
            return posts.slice(lastIndex, tempNext+1);
        }
        
    }

    //retrieve posts when next is clicked

    static getNext(){
        let to = this.getNavIndex("next");
        
        return posts.slice(lastIndex,to);
        
    }

    //retrieve posts when previous is clicked
    static getPrev(){
        this.getNavIndex("prev");
        return posts.slice(lastIndex, nextIndex);
        
    }

    // returning navigation index

    static getNavIndex(action){
        const areSame = (lastIndex==nextIndex);
        switch(action.toLowerCase()){
            case "next":
                if(!areSame){
                    if(posts[nextIndex+5]){
                        nextIndex+=5;
                        lastIndex+=5;
                        currentIndex=nextIndex;
                        return nextIndex;
                    }else{
                        currentIndex=posts.length-1;
                        lastIndex=nextIndex;
                        return currentIndex+1;

                    }
                }else{
                    if(posts[nextIndex+5]){
                        if(currentIndex=posts.length-1){
                             currentIndex = lastIndex = nextIndex +=5;
                             return currentIndex+1;
                        }
                        nextIndex+=5;
                        currentIndex=nextIndex;
                        return nextIndex;
                    }else{
                        currentIndex=posts.length-1;
                        return currentIndex+1;
                    }
                }

            case "prev":
                if(posts[lastIndex-5]){
                    if(lastIndex==nextIndex){
                        lastIndex-=5;
                        currentIndex = nextIndex;
                    }else{
                        lastIndex -=5;
                        nextIndex = currentIndex -=5;

                    }
            
            
        }else{
            lastIndex=0;
            nextIndex = currentIndex = 5;
            
        }
        
        return;
            default:
                return nextIndex;    
        }
    }

    //retreiving user posts

    static getPostsByUser(userId){
        const userPosts = posts.filter(p=> p.userId==userId);
        return userPosts;
    }

    // retreive post by id

    static getPostById(postId){
        const post = posts.find(p=> p.id==postId);
        return post;
    }

    //update post 

    static updatePost(postId, caption){
        const post = posts.find(p=> p.id==postId);

        if(post){
            post.caption=caption;
            return true;
        }else{
            return false;
        }
    }


    //filter post by caption

    static filterPostsByCaption(caption){

        const filteredPosts = posts.find(p=> p.caption==caption);
        return filteredPosts;

    }

    //toggle archive post

    static toggleArchive(userId, postId){
        console.log(postId);
        let postIndex = posts.findIndex(p=> p.id==postId && p.userId==userId);
        console.log(postIndex);
        if(postIndex>-1){
            const post = posts[postIndex];
            post.isArchive = !post.isArchive;
            posts.splice(postIndex,1);
            archivedPosts.push(post);
            return {code: 201, msg: "post archived successfully"};

        }else{
            postIndex = archivedPosts.findIndex(p=> p.id==postId && p.userId==userId);
            if(postIndex>-1){
                const post = archivedPosts[postIndex];
            post.isArchive = !post.isArchive;
            archivedPosts.splice(postIndex,1);
            posts.push(post);
            return {code:201, msg:"post unarchived successfully"};

            }else{
                return {code:400, msg:"no posts found"};
            }
        }

        
        
        

    }

    //bookmark a post

    static bookmarkToggle(userId, postId){
        const users = User.getAllUsers();
        const user = users.find(u=> u.id==userId);
    
            const postIndex = user.bookmarks.findIndex(post=> post==postId);
            if(postIndex>-1){
                user.bookmarks.splice(postIndex,1);

            }else{
                user.bookmarks.push(postId);

            }
            
            return postIndex>-1;

        
        
        

    }

    //deletion of a post

    static deletePost(postId){
        const postIndex = posts.findIndex(p=> p.id==postId);

        if(postIndex>-1){
            posts.splice(postIndex,1);
            return true;
        }else{
            return false;
        }
    }

    static getPublishedPosts(){
        return posts.filter(p=> p.status=="published");
    }
}

export default PostModel;