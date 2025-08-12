import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import BlogPostPage from "./pages/BlogPostPage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UploadBlog from "./pages/UploadBlog";
import AdminManagePage from "./pages/AdminManagePage";



const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogPostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/upload" element={<UploadBlog />} />
        <Route path="/manage" element={<AdminManagePage />} />
      </Routes>
    </Router>
  );
};


export default App;
