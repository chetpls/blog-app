import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/NewPost.css';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setPublished(post.published);
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/posts/${id}/edit`,
        { title, content, published },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Post updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating post', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="new-post">
      <h2>Edit Post</h2>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="entryArea">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Title:</label>
          </div>
          <label>Content:</label>
          <Editor
            apiKey={import.meta.env.VITE_EDITOR_API_KEY}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            value={content}
            onEditorChange={handleEditorChange}
          />
          <div className="publish">
            <label>Publish:</label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
          </div>
          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
