import { NavLink } from 'react-router'
import { useUsersQuery } from 'src/stores/users'

export const UserList = () => {
  const { data: users } = useUsersQuery()

  return (
    <div className="flex flex-col max-w-xs">
      <div className="flex font-bold">
        <div className="flex-1"></div>
        <div className="flex-1">Blogs Created</div>
      </div>
      {users?.map((user) => (
        <div key={user.id} className="flex">
          <div className="flex-1">
            <NavLink to={user.id}>{user.name}</NavLink>
          </div>
          <div className="flex-1">{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )
}
