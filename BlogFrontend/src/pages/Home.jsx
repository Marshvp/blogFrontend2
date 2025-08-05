import { Link } from "react-router-dom"
import { fetchBlogPosts } from "../services/api";
import { useEffect, useState } from "react";



const Home = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadblogs = async () => {
    const data = await fetchBlogPosts();
    console.log("Fetched blogs:", data);
    setBlogs(data);

    }
    loadblogs();
  }, []); // Fetch blog posts on component mount
 


  
  const posts = [
    { id: "first-post", title: "My first Post"},
    { id: "second-post", title: "Another One" },
  ]

  return (
    <div style={{ padding: "2rem" }}>
      <h1> Blog Home </h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
        {/* Example static posts */}
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/blogs/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Home
