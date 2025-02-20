import React from 'react'
// import './blog.css'
// import BlogForm from '../components/BlogForm'
import { useNavigate } from 'react-router-dom'

function Blog() {
    const navigate = useNavigate()
    // const [showForm, setShowForm] = useState(false)



  return (
    <div>
        <h1>Hi Tariqueeeeeeeeee.....</h1>
        <button 
            onClick={()=>
                navigate('/blog/blogForm')
            } 
        >+++</button>
        {/* {
            showForm && <BlogForm />
        } */}
    </div>
  )
}

export default Blog