import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import '../styles/AllArticles.css';

function AllArticles() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                const publishedPosts = response.data.filter(post => post.pubblished);
                setPosts(publishedPosts);
            }   catch (error) {
                console.error('Error fetching posts', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="allArticles">
            <h2>All Articles</h2>
            <div className="articles">
                {posts.map(post => (
                    <div key={post.id} className="article">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p><strong>Author:</strong> {post.author.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllArticles;