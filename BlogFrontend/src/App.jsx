import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import BlogPostPage from "./pages/BlogPostPage";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
};


export default App;
