import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {  fetchSingleBlogPostContent, fetchSingleBlogInfo } from '../services/api';
import Comments from '../components/Comments';


const BlogPostPage = () => {

  const {id} = useParams();
  const [content, setContent] = useState('');
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogPost = async () => {
      const data = await fetchSingleBlogInfo(id);
      if(data) {
        setBlog(data);
        await fetchSingleBlogPostContent(data.filePath)
          .then((content) => {
            setContent(content);
          
          })
          .catch((err) => {
            setError(err.message || 'Failed to fetch blog post content');
            console.error('Error fetching blog post content:', err);
          })
      }
    }
    fetchBlogPost()
  }, [id]);
  if(error) {
    return <div>Error: {error}</div>;
  }
  if(!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "80%", margin: "2rem auto" }}>
      <h1>{blog ? blog.title : 'Loading...'}</h1>
      <p>{blog ? blog.description : 'Loading description...'}</p>
      <p><strong>Author:</strong> <strong>{blog ? blog.author.userName : 'Loading author'}</strong></p>
      <Markdown>{content}</Markdown>
      <Comments blogId={blog.id} />
  </div>)

}

export default BlogPostPage
