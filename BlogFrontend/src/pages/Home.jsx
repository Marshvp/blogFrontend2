import { Link } from "react-router-dom"



const Home = () => {
  const posts = [
    { id: "first-post", title: "My first Post"},
    { id: "second-post", title: "Another One" },
  ]

  return (
    <div style={{ padding: "2rem" }}>
      <h1> Blog Home </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default Home
