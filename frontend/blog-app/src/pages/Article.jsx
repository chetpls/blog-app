import React, { useState, useEffect } from "react";
import axios from "../axios"; // Make sure you're using the correct axios instance
import { useParams } from "react-router-dom";
import "../styles/Article.css";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import Comment from "../components/Comment";

function Article() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="article">
      <div 
        className="articleCover" 
        style={{
          backgroundImage: `url(${post.coverImage})`,
        }}
        >      <h1 className="articleTitle">{post.title}</h1></div>

      <div className="articleContainer">

      <div className="articleContent">        
        <div className="articleDescription">
          <h3>Description</h3>
          <p>{post.description}</p>
        </div>
        <div className="articleBody">
        <div dangerouslySetInnerHTML={{ __html: post.content }} /></div>
      </div>
      <div className="articleInfo">
        {/* <div className="articleStats">
          <div className="stat">
            <FaRegHeart />
            <p>24.5k</p>
          </div>
          <div className="stat">
            <FaRegComment />
            <p>50</p>
          </div>
        </div> */}
        <div className="articleMetas">
          <div className="articleMeta">
            <p className="articleMetaTitle">Publication Date</p>
            <p className="articleMetaData">{formatDate(post.createdAt)}</p>
          </div>
          <div className="articleMeta">
            <p className="articleMetaTitle">Category</p>
            <p className="articleMetaData">{post.category}</p>
          </div>
          <div className="articleMeta">
            <p className="articleMetaTitle">Reading Time</p>
            <p className="articleMetaData">{post.readingTime}</p>
          </div>
          <div className="articleMeta">
            <p className="articleMetaTitle">Author Name</p>
            <p className="articleMetaData">{post.author.username}</p>
          </div>
        </div>
        <div className="articleComments">
          <Comment postId={id} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Article;
