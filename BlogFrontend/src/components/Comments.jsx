import { useEffect, useState } from "react";
import { createCommentReply, createNewComment, fetchComments } from "../services/api";
import "../components/Comments.css"; // Assuming you have a CSS file for styling


const Comments = ({ blogId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [replyMessage, setReplyMessage] = useState('');
    const [replyToId, setReplyToId] = useState(null);
    const [replySubmitting, setReplySubmitting] = useState(false);


    let LoggedInUser = false;
    if(localStorage.getItem('token')){
        LoggedInUser = true
    }

    const refreshComments = async () => {
        const allComments = await fetchComments(blogId);
        setComments(allComments ?? []);
    } 

    const handleNewComment = async (e) => {
        e.preventDefault();
        const message = newMessage.trim();
        if(!message) return;

        setSubmitting(true);
        try {
            await createNewComment(blogId, newMessage);
            setNewMessage('');
            await refreshComments();
        } catch (error) {
            console.error("Error creating comment:", error);
            alert("Failed to create comment");
            return;
        } finally {
            setSubmitting(false);
        }

    }


    useEffect(() => {
        refreshComments();
    }, [blogId])



    const openReply = (comment) => {
        setReplyToId(comment.id);
        setReplyMessage('');
    }

    const cancelReply = () => {
        setReplyToId(null);
        setReplyMessage('');
    }


    const handleReplySubmit = async (e, parentId) => {
        e.preventDefault();
        const message = replyMessage.trim();
        if(!message) return;
        setReplySubmitting(true); 
        try {
            await createCommentReply(blogId, message, parentId)   
            cancelReply();
            await refreshComments();
        } catch (error) {
            console.error("Error creating reply:", error);
            alert("Failed to create reply");
            return;
        } finally {
            setReplySubmitting(false);
        }

    }





    return (
        <div className="comment-section">
            <hr />
            <h2>Comments Section</h2>

            {LoggedInUser ? (
                <form className="comment-form" onSubmit={handleNewComment}>
                <div>
                    <label htmlFor="comment">Add a comment</label>
                    <textarea
                    id="comment"
                    placeholder="Write your thoughts here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={submitting}
                    ></textarea>
                </div>
                <button type="submit">
                    {submitting ? 'Submitting...' : 'Comment'}
                </button>
                </form>
            ) : (
                <p>Please log in to add a comment.</p>
            )}

            {comments.length > 0 ? (
                <ul className="comments-list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <div className="comment-line">
                            <strong>{comment.user.userName}:</strong> {comment.message}
                        </div>


                        {LoggedInUser && (
                            <>
                                {replyToId === comment.id ? (
                                    <form 
                                        className="reply-form"
                                        onSubmit={(e) => handleReplySubmit(e, comment.id)}
                                    >

                                        <textarea
                                            placeholder={`Reply to ${comment.user.userName}...`}
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            disabled={replySubmitting}
                                        />
                                        <div className="reply-actions">
                                            <button
                                                type="submit"
                                                onClick={cancelReply}
                                                disabled={replySubmitting}>
                                                    Cancel
                                            </button>
                                            <button 
                                                type="submit"
                                                disabled={replySubmitting || !replyMessage.trim()}>
                                                {replySubmitting ? 'Replying...' : 'Reply'}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <button 
                                        className="reply-button"
                                        onClick={() => openReply(comment)}>
                                        Reply
                                    </button>
                                )}
                            </>
                        )}

                        {comment.replies?.length > 0 && (
                            <ul className="replies-list">
                                {comment.replies.map((reply) => (
                                    <li key={reply.id} className="reply-item">
                                        <strong>{reply.user.userName}:</strong> {reply.message}
                                    </li>
                                ))}
                            </ul>
                        )}
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