import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '../styles/NewPost.css';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState('');
  const [currentCoverImage, setCurrentCoverImage] = useState('');
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
        setCategory(post.category);
        setReadingTime(post.readingTime);
        setPublished(post.published);
        setCurrentCoverImage(post.coverImage);
        setDescription(post.description);
        
      } catch (error) {
        console.error('Error fetching post', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleEditorChange = (content) => {
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
    formData.append('description', description);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
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
      console.error('Error updating post', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="newPost">
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
          <div className="entryArea">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <label>Category:</label>
          </div>
          <div className="entryArea">
            <input
              type="text"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              required
            />
            <label>ReadingTime:</label>
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
          <div className="coverImage">
            <label>Cover Image:</label>
            {currentCoverImage && (
              <img src={currentCoverImage} alt="Current cover" style={{maxWidth: '200px'}} />
            )}
            <input
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <label>Content:</label>
          <Editor
            apiKey={import.meta.env.VITE_EDITOR_API_KEY}
            initialValue=""
            init={{
              height: 500,
              menubar: true,
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
