import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useBlogsQuery } from 'src/stores/blog-tanstack-query'
import { clearUser, useUser } from 'src/stores/user-jotai'

export const BlogList = () => {
  const navigate = useNavigate()
  const user = useUser()
  const { data: blogs, error } = useBlogsQuery(user)

  useEffect(() => {
    if (error && error.response.status === 401) {
      clearUser()
    }
  }, [error])

  return (
    <ul className="flex flex-col gap-2" data-testid="blog-list">
      {blogs?.map((blog) => (
        <li
          onClick={() => navigate(`/blogs/${blog.id}`)}
          key={blog.id}
          className="border border-black py-3 px-1 cursor-pointer"
          data-testid={`blog ${blog.title}`}
        >
          <span data-testid="title">{blog.title}</span>
        </li>
      ))}
    </ul>
  )
}
