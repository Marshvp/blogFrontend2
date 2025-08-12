import { deleteBlogPost, fetchBlogPosts } from "../services/api";
import { useEffect, useState } from "react";




const AdminManagePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    const loadBlogs = async () => {
        const fetchedBlogs = await fetchBlogPosts();
        setBlogs(fetchedBlogs);
    }
    


    useEffect(() => {
        loadBlogs()
    }, [])

    const deleteBlog = (blogId) => async (e) => {
        e.preventDefault();
        try {
            await deleteBlogPost(blogId);
            await loadBlogs();
        } catch (error) {
            console.error("Error deleting blog post:", error);
            setError("Failed to delete blog post");
            return;
        }
    }
    return (
        <div>
        <h1>Admin Manage Page</h1>
        <p>This page is for admin management tasks.</p>
        {/* Add your admin management components here */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <h2>Blog Posts</h2>
        {blogs.length > 0 ? (
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.description}</p>
                        <p><strong>Author:</strong> {blog.author.userName}</p>
                        <p><strong>Date:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                        <button onClick={deleteBlog(blog.id)}>Delete</button>

                    </li>
                ))}
            </ul>
        ) : (
            <p>No blog posts available.</p>
        )}
        </div>
    );
}

export default AdminManagePage;