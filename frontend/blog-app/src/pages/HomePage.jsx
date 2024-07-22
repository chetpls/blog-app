import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts/published");
        const lastFourPosts = response.data.slice(-4);
        setPosts(lastFourPosts);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/posts/${id}`);
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="featuredArticleContainer">
      {posts.length > 0 && (
        <div className="latestArticle">
          <div className="lastestArticleImg">
            <img src={posts[0].coverImage} alt="Article Cover Image" />
          </div>

          <div className="latestArticleInfo">
            <h2 className="latestArticleTitle">{posts[0].title}</h2>
            <p className="latestArticleDescription">{posts[0].description}</p>
            <div className="latestArticleMetas">
              <div className="latestArticleMeta">
                <p className="latestArticleMetaTitle">Publication Date</p>
                <p className="latestArticleMetaData">
                  {formatDate(posts[0].createdAt)}
                </p>
              </div>
              <div className="latestArticleMeta">
                <p className="latestArticleMetaTitle">Category</p>
                <p className="latestArticleMetaData">{posts[0].category}</p>
              </div>
              <div className="latestArticleMeta">
                <p className="latestArticleMetaTitle">Author Name</p>
                <p className="latestArticleMetaData">
                  {posts[0].author.username}
                </p>
              </div>
            </div>
            <button
              className="readMoreButton"
              onClick={() => handleReadMore(posts[0]._id)}
            >
              Read More <MdArrowOutward size={25} color="#FFD11A" />
            </button>
          </div>
        </div>
      )}
      <div className="featuredArticleCards">
        {posts.slice(1).map((post) => (
          <div key={post._id} className="featuredArticleCard">
            <img src={post.coverImage} alt="Article Cover Image" />
            <h3>{post.title}</h3>
            <p>{post.category}</p>
            <button
              className="readMoreButton"
              onClick={() => handleReadMore(post._id)}
            >
              Read More <MdArrowOutward size={25} color="#FFD11A" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
