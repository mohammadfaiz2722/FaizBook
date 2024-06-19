// src/components/SocialMediaPage.js
import React, { useState, useEffect } from 'react';
import './SocialMediaPage.css';
import post1 from './post1.jpeg'
import post3 from './post3.jpeg'
const SocialMediaPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch posts from the API when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Replace with API call to fetch posts
    const fetchedPosts = [
      { id: 1, content: 'This is a sample post!', image: post1, likes: 5, liked: false, comments: ['Great post!', 'Nice!'] },
      { id: 2, content: 'Hello world!', image: post3, likes: 3, liked: false, comments: [] },
    ];
    setPosts(fetchedPosts);
  };

  const handleCreatePost = async () => {
    // Replace with API call to create a new post
    const newPostObject = { id: Date.now(), content: newPost, image: post1, likes: 0, liked: false, comments: [] };
    setPosts([newPostObject, ...posts]);
    setNewPost('');
  };

  const handleLikePost = (id) => {
    // Replace with API call to like/unlike a post
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = (id, comment) => {
    // Replace with API call to add a comment
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, comments: [...post.comments, comment] } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="social-media-page container">
      <div className="create-post">
        <textarea 
          className="form-control" 
          rows="3" 
          placeholder="What's on your mind?" 
          value={newPost} 
          onChange={(e) => setNewPost(e.target.value)} 
        />
        <button className="btn btn-primary mt-2" onClick={handleCreatePost}>Post</button>
      </div>
      <div className="posts mt-4">
        {posts.map(post => (
          <div key={post.id} className="card mb-3">
            <img src={post.image} className="card-img-top" alt="Post" width={200} height={400}/>
            <div className="card-body">
              <p className="card-text">{post.content}</p>
              <button className="btn btn-light" onClick={() => handleLikePost(post.id)}>
                {post.liked ? 'Unlike' : 'Like'} ({post.likes})
              </button>
              <div className="comments mt-3">
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment">{comment}</div>
                ))}
                <input 
                  type="text" 
                  className="form-control mt-2" 
                  placeholder="Add a comment..." 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaPage;
