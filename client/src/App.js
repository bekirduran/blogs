import React, { useEffect, useState } from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import axios from 'axios';

export default function App() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <PostCreate onPostCreated={fetchPosts} />
      <hr />
      <h1>Posts Below Here:</h1>
      <PostList posts={posts} onPostCreated={fetchPosts} />
    </div>
  );
}
