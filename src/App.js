
import './App.css';
import Landing from './pages/Landing';
import Navbar from './components/navbar';
import Auth from './pages/Auth';
// import Catagory from './components/catagory';
// import Blog from './pages/Blog';
// import Blog from './pages/Blog';
import Blog from './pages/Blog';
import BlogForm from './components/BlogForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div>
    //   <Navbar/>
    //   <Landing/>
    //   <Catagory />
    //   <Auth/>
    //   <Blog />
    // </div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/blog/blogForm" element={<BlogForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
