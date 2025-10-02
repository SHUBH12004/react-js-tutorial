
import React, {useState, useEffect} from 'react'

const Card = () => {
  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
    const fetchPosts = async () => {
      try { 
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setPostList(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }
  , [])
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (postList.length === 0) {
    return <div>No posts available</div>
  }
  return (
    <div>
      {postList.map(post => (
        <div key={post.id} className="card">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
  // If you want to return a simple div without any content, you can do so:
}

export default Card