// newpost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/NewPost.css';

function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('readingTime', readingTime);
    formData.append('published', published);
    formData.append('coverImage', coverImage);    
    formData.append('description', description);
  
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/posts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Post updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post', error);
      alert('Failed to create post');
    }
  };
  

  return (
    <div className="newPost">
      <h2>Create New Post</h2>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="entryArea">

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />            <label>Title:</label>
          </div>
          <div className="entryArea">
    
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />        <label>Category:</label>
          </div>
          <div className="entryArea">
 
            <input
              type="text"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              required
            />           <label>Reading Time:</label>
          </div>
            <div className="description">
            <label>Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              maxLength={300}
              required
            />  </div>         
          {/* <div className="entryArea"> */}
          <div className="coverImage">
            <label>Cover Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              
              required
            /></div>
          {/* </div> */}

            
            <div className="editorContainer"><label>Content:</label>
              <Editor
                apiKey={import.meta.env.VITE_EDITOR_API_KEY}
                initialValue=""
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                  width: '100%',
                }}
                value={content}
                onEditorChange={handleEditorChange}
              />
            </div>

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
