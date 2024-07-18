import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../styles/AllArticles.css';
import { FaRegUser, FaRegHeart, FaRegComment  } from "react-icons/fa";
import { MdArrowOutward } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function AllArticles() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts/published');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleReadMore = (id) => {
    navigate(`/posts/${id}`);
  };


  return (
    <div className="all-articles">
      <h2>Discover the World of Headlines</h2>
      <div className="articleCards">
        {posts.map(post => (
          <div key={post._id} className="articleCard">
            <div className="articleLeft">
              <FaRegUser size={30} />
              <div className="articleLeftText">
                <p className="author">{post.author.username}</p>
                <p className="category">{post.category}</p>
              </div>
              
            </div>
            <div className="articleMiddle">
              <p className="articleDate">{formatDate(post.createdAt)}</p>
              <div className="articleCardInfo">
                <h3>{post.title}</h3>
                <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              <div className="articleCardStats">
                <div className="articleCardStat">
                  <FaRegHeart />
                  <p>24.5k</p>
                </div>
                <div className="articleCardStat">
                  <FaRegComment />
                  <p>50</p>
                </div>
              </div>
              
            </div>
              <div className="articleRight">
                <button className="readMoreButton" 
                  onClick={() => handleReadMore(post._id)}>Read More <MdArrowOutward size={25} color='#FFD11A'/>
                </button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllArticles;
