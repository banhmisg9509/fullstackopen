import { useNavigate, useParams } from 'react-router'
import { Button, CreateCommentForm } from 'src/components'
import { useAppSelector } from 'src/stores'
import {
  useBlogQuery,
  useDeleteMutation,
  useLikeMutation,
} from 'src/stores/blog'

const ownBlog = (user, blog) => user.username === blog.user.username

export const BlogDetail = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const { id } = useParams()
  const { data: blog, isLoading } = useBlogQuery(id)

  const [likeBlog] = useLikeMutation()
  const [deleteBlog] = useDeleteMutation()

  const handleOnLike = (blog) => likeBlog(blog)
  const handleOnRemove = async (blog) => {
    const answer = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (answer) {
      await deleteBlog(blog).unwrap()
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
