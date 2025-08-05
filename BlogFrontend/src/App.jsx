import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import BlogPostPage from "./pages/BlogPostPage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";



const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<BlogPostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />}/>
      </Routes>
    </Router>
  );
};


export default App;
