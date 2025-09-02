Postaway Backend

A RESTful backend service for the Postaway App, built with Node.js and Express.
This service provides APIs for user authentication, posts, likes, comments, and bookmarks with JWT-based authentication.

🚀 Features

User signup & login with JWT authentication

Create, edit, delete, and fetch posts

Like/unlike posts

Bookmark/unbookmark posts

Comment on posts (add, update, delete, view)

Secure routes using bearerAuth (JWT)

Image upload support (multipart/form-data)

📦 Installation
# Clone the repository
git clone https://github.com/your-username/postaway-backend.git
cd postaway-backend

# Install dependencies
npm install

# Create an .env file for environment variables
touch .env


Add required environment variables (example):

PORT=3200
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key


Start the server:

npm start


By default, the API runs on:

http://localhost:3200

🔑 Authentication

Most routes are protected and require a JWT token in the request header:

Authorization: Bearer <your_token_here>


Tokens are returned upon successful login.

📖 API Endpoints
👤 User Routes

POST /api/user/signup → Register a new user

POST /api/user/signin → Login user (returns JWT)

GET /api/user/all → Get all users

📝 Post Routes

POST /api/posts/new → Create new post (upload caption + image)

POST /api/posts/new/{postId} → Edit a draft post

GET /api/posts/all → Get all posts (all users)

GET /api/posts/myposts → Get posts of logged-in user

GET /api/posts/post/{postId} → Get a single post

POST /api/posts/post/{postId} → Update a post

POST /api/posts/archive/{postId} → Archive/unarchive a post

POST /api/posts/post/bookmark/{postId} → Bookmark/unbookmark a post

DELETE /api/posts/post/delete/{postId} → Delete a post

GET /api/posts/next → Get next 5 posts

GET /api/posts/prev → Get previous 5 posts

❤️ Like Routes

POST /api/likes/like/{postId} → Like a post

GET /api/likes/like/{postId} → Get all likes on a post

DELETE /api/likes/like/{likeId} → Unlike a post

💬 Comment Routes

POST /api/comments/{postId}/new → Add a comment

GET /api/comments/{postId}/all → Get all comments for a post

POST /api/comments/{postId}/{commentId} → Update a comment

DELETE /api/comments/{postId}/{commentId} → Delete a comment

🛠 Tech Stack

Node.js

Express.js

MongoDB (via Mongoose)

JWT Authentication

Multer (file uploads)

📜 License

This project is licensed under the MIT License.
