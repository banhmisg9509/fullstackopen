import { useNavigate, useParams } from 'react-router'
import { Button, CreateCommentForm } from 'src/components'
import {
  useBlogQuery,
  useDeleteMutation,
  useLikeMutation,
} from 'src/stores/blog-tanstack-query'
import { useUser } from 'src/stores/user-jotai'

const ownBlog = (user, blog) => user.username === blog.user.username

export const BlogDetail = () => {
  const navigate = useNavigate()
  const user = useUser()
  const { id } = useParams()
  const { data: blog, isLoading } = useBlogQuery(id)

  const { mutate: likeBlog } = useLikeMutation()
  const { mutateAsync: deleteBlog } = useDeleteMutation()

  const handleOnLike = (blog) => likeBlog(blog)
  const handleOnRemove = async (blog) => {
    const answer = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (answer) {
      await deleteBlog(blog)
      navigate('/')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!blog) return <div>Not found</div>

  return (
    <>
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <a data-testid="url" href={blog.url}>
        {blog.url}
      </a>
      <p>
        <span data-testid="likes">likes {blog.likes} </span>
        <Button data-testid="like" onClick={() => handleOnLike(blog)}>
          like
        </Button>
      </p>
      <p>{blog.user.name}</p>
      {ownBlog(user, blog) && (
        <div className="mt-1">
          <Button
            data-testid="remove"
            onClick={() => handleOnRemove(blog)}
            className="bg-red-500 active:bg-red-700 text-white"
          >
            remove
          </Button>
        </div>
      )}
      <h2 className="text-xl font-bold">Comments</h2>
      <CreateCommentForm />
      <ul className="list-disc list-inside">
        {blog.comments?.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  )
}
