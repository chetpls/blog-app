import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../frontend/blog-app/src/AuthContext';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

function Dashboard() {
  const { isAdmin } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter(post => post._id !== postToDelete));
      setIsModalOpen(false);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post', error);
      alert('Failed to delete post');
    }
  };

  const openModal = (id) => {
    setPostToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {isAdmin && (
        <button onClick={() => navigate('/new-post')}>Create New Post</button>
      )}
      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Author:</strong> {post.author.username}</p>
            <p><strong>Published:</strong> {post.published ? 'Yes' : 'No'}</p>
            {isAdmin && (
              <>
                <button onClick={() => handleEdit(post._id)}>Edit</button>
                <button onClick={() => openModal(post._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this post?"
      />
    </div>
  );
}

export default Dashboard;
