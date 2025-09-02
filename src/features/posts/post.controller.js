import PostModel from "./post.model.js";

class PostController{

    //create new post

    createPost(req,res){
        const userId = req.userId;
        const {caption} = req.body;
        const imageUrl = req.file;
        const {postId} = req.params;
        const {status} = req.query;
        
        const newPost = PostModel.newPost(userId, caption, imageUrl, postId, status);
        res.status(201).send(newPost);
    }

    //retrieve all posts

    getAllPosts(req,res){
        const allPosts = PostModel.getAll();
        res.status(200).send(allPosts);
    }

    //retrieve user posts

    getUserPosts(req,res){
        const userId = req.userId;
        const postsByUser = PostModel.getPostsByUser(userId);
        res.status(200).send(postsByUser);
    }

    //get a post by its id

    getSinglePost(req, res){
        const {postId} = req.params;

        const post = PostModel.getPostById(postId);

        if(post){
            res.status(200).send(post);
        }else{
            res.status(400).send("No post found with given id");
        }
    }

    //update post by Id

    updatePost(req, res){
        const {postId} = req.params;
        const {caption} = req.body;

        const imageUrl= req.file;

        const isPostUpdated  = PostModel.updatePost(postId, caption, imageUrl);

        if(isPostUpdated){
            res.status(201).send("Post updated successfully!");
        }else{
            res.status(400).send("No post found with given id");
        }
    }

    //filter posts by caption

    filterByCaption(req,res){
        const {caption} = req.body;

        const result = PostModel.filterPostsByCaption(caption);

        if(result.length>0){
            return res.status(200).send(result);
        }else{
            return res.status(400).send("No posts found by given caption");

        }


    }

    //archive a post

    togglePostArchive(req,res){
        const {userId}= req;
        const {postId}= req.params;
        const response = PostModel.toggleArchive(userId, postId);

        return res.status(response.code).send(response.msg);


    }

    //bookmark a post

    togglePostBookmark(req,res){
        const {userId}= req;
        const {postId} =req.params;
        const result = PostModel.bookmarkToggle(userId,postId);
        if(result){
            return res.status(201).send("Post removed from bookmarks");
        }else{
            return res.status(201).send("Post added to bookmarks");
        }
    }

    //post deletion

    deletePost(req, res){
        const {postId} = req.params;

        const isPostDeleted = PostModel.deletePost(postId);

        if(isPostDeleted){
            res.status(201).send("Post deleted successfully");
        }else{
            res.status(400).send("Sorry, no post found with given id");
        }
    }

    //navigate posts - next

    nextPosts(req,res){
        const posts= PostModel.getNext();
        return res.status(200).send(posts);
    }

    //navigate posts - previous

    prevPosts(req,res){
        const posts = PostModel.getPrev();
        return res.status(200).send(posts);
    }
}

export default PostController;