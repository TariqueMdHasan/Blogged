
import './App.css';
import Landing from './pages/Landing';
import Navbar from './components/navbar';
import Auth from './pages/Auth';
import BlogForm from './components/BlogForm';
import Feed from './pages/Feed';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyProfile from './components/MyProfile';
import BlogPage from '../src/components/BlogPage/BlogPage'

function App() {



  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/blogForm" element={<BlogForm/>} />
        <Route path="/myProfile" element={<MyProfile/>} />
        <Route path="/blogPage/:id" element={<BlogPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
