import { useParams } from 'react-router'
import { useUser } from 'src/stores/users-tanstack-query'

export const UserDetail = () => {
  const { id } = useParams()
  const { data: user, isLoading } = useUser(id)

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="font-bold">added blogs</p>
      <ul className="list-disc list-inside ml-4">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
