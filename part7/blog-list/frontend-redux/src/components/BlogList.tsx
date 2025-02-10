import { skipToken } from '@reduxjs/toolkit/query/react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'src/stores'
import { useBlogsQuery } from 'src/stores/blog'

export const BlogList = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const { data: blogs } = useBlogsQuery(user ?? skipToken)

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
