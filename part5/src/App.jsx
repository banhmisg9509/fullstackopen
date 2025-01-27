import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserStatus from './components/UserStatus'
import blogService from './services/blogs'
import { sortBlogs, ownBlog } from './services/common'
import localStore, { USER } from './services/store'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    content: '',
    type: '',
  })

  useEffect(() => {
    if (!user) return
    fetchBlogs()
  }, [user])

  useEffect(() => {
    const loggedUser = localStore.get(USER)
    if (!loggedUser) {
      localStore.remove(USER)
      setUser(null)
      return
    }

    setUser(JSON.parse(loggedUser))
  }, [])

  const handleOnLike = async (blog) => {
    const updatedBlog = await blogService.updateBlog({
      id: blog.id,
      likes: blog.likes + 1,
    })

    setBlogs((oldBlogs) =>
      sortBlogs(
        oldBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      )
    )
  }

  const handleOnRemove = async (blog) => {
    const answer = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (answer) {
      await blogService.removeBlog(blog)
      setBlogs((oldBlogs) =>
        sortBlogs(oldBlogs.filter((b) => b.id !== blog.id))
      )
    }
  }

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(sortBlogs(blogs))
    } catch (error) {
      if (error.response.status === 401) {
        localStore.remove(USER)
        setUser(null)
      }
    }
  }

  const showNotification = (content, type = '') => {
    setMessage({
      content,
      type,
    })

    setTimeout(() => setMessage({ content: '', type: '' }), 3500)
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-4">Log in to application</h2>
        <Notification message={message} />
        <LoginForm setUser={setUser} showNotification={showNotification} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">blogs</h2>
      <Notification message={message} />
      <UserStatus user={user} setUser={setUser} />
      <CreateBlogForm setBlogs={setBlogs} showNotification={showNotification} />
      <div className="flex flex-col gap-2">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={handleOnLike}
            onRemove={handleOnRemove}
            showRemoveButton={ownBlog(user, blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
