import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/NewPost.css';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/posts/create',
        { title, content, published },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Post created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="new-post">
      <h2>Create New Post</h2>
      <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="entryArea">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />          <label>Title:</label>
        </div>
        {/* <div className="entryArea"> */}
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
        {/* </div> */}
        <div className="publish">
          <label>Publish:</label>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
    </div>
  );
}

export default NewPost;
