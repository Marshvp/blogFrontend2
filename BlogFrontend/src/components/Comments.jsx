import { useEffect, useState } from "react";
import { fetchComments } from "../services/api";
import "../components/Comments.css"; // Assuming you have a CSS file for styling


const Comments = (blogId) => {
    const [newMessage, setNewMessage] = useState('');
    const [comments, setComments] = useState([]);
    const parsedBlogId = blogId.blogId; // Extract blogId from props

    let LoggedInUser = false;
    if(localStorage.getItem('token')){
        LoggedInUser = true
    }

    useEffect(() => {
        const beginFetchComments = async () => {
            const allComment = await fetchComments(parsedBlogId);
            if (allComment) {
                setComments(allComment);
            } else {
                setComments([])
            }
        }
        beginFetchComments();
    }, [])
    return (
        <div className="comment-section">
            <hr />
            <h2>Comments Section</h2>

            {LoggedInUser ? (
                <form className="comment-form">
                <div>
                    <label htmlFor="comment">Add a comment</label>
                    <textarea
                    id="comment"
                    placeholder="Write your thoughts here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                </div>
                </form>
            ) : (
                <p>Please log in to add a comment.</p>
            )}

            {comments.length > 0 ? (
                <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                    <strong>{comment.author.userName}:</strong> {comment.message}
                    </li>
                ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>

    )
}


export default Comments;