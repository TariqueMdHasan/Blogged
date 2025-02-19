
import './App.css';
// import Landing from './pages/Landing';
import Navbar from './components/navbar';
import Auth from './pages/Auth';
// import Catagory from './components/catagory';

function App() {
  return (
    <div>
      <Navbar/>
      {/* <Landing/> */}
      {/* <Catagory /> */}
      <Auth/>
    </div>
  );
}

export default App;
