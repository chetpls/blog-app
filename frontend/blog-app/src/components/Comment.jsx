import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import "../styles/Comment.css"
import { AuthContext } from "../AuthContext";


function Comment({postId}){
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const {user} = useContext(AuthContext);


    useEffect(() => {
        const fetchComents = async () => {
            try {
                const response = await axios.get(`/api/comments/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };
        fetchComents();
    }, [postId]);


    const handleComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/comments/${postId}`, { content });
            const newCommentResponse = await axios.get(`/api/comments/${postId}`);
            setComments(newCommentResponse.data);
            setContent("");
        } catch (error) {
            console.error("Error creating comment", error);
        }
    };

    return (
        <div className="comment">               
            <div className="commentsListContainer">
                    <h2>Comments</h2>
                    <ul className="commentsList">
                        {comments.map((comment) => (
                        <li key={comment._id} className="commentItem">
                            <p className="commentContent">{comment.author.username}: <span>{comment.content}</span></p>
                            <p className="commentDate">{new Date(comment.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                    </ul>
                </div>
                {user ? (
            <div className="formContainer">
                <form onSubmit={handleComment}>
                    <div className="entryArea">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                        <label>Comment:</label>
                    </div>
                    <button type="submit">Comment</button>
                </form>

            </div>) : (
                <div className="loginPrompt">
                    <p>Please log in to comment.</p>
                </div>
            )}
        </div>
    );

}

export default Comment;