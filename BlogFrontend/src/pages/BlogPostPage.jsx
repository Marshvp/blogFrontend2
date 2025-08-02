import Markdown from 'react-markdown'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const BlogPostPage = () => {

  const {id} = useParams();
  const [content, setContent] = useState('');
  

  useEffect(() => {
    fetch(`/posts/${id}.md`)
      .then(res => res.text())
      .then(setContent)
      .catch(err => setContent(`Error loading post: ${err.message}`));
  },[id])

  console.log(content)

  return (
    <div style={{ padding: "2rem", maxWidth: "80%", margin: "2rem auto" }}>
      <Markdown>{content}</Markdown>
  </div>)

}

export default BlogPostPage
