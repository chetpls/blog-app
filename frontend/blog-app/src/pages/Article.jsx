import React, {useState, useEffect} from 'react';
import axios from '../axios'; // Make sure you're using the correct axios instance
import { useParams } from 'react-router-dom';
// import '../styles/Article.css';

function Article(){
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`/api/posts/${id}`);
            setPost(response.data);
          } catch (error) {
            console.error('Error fetching post', error);
          }
        };
    
        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="article-container">
            <h1>{post.title}</h1>
            <p>By: {post.author.username}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}

export default Article;