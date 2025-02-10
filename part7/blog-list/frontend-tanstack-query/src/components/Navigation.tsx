import { NavLink } from 'react-router'
import { UserStatus } from './UserStatus'

export const Navigation = () => {
  return (
    <nav className="bg-neutral-200">
      <div className="flex container gap-2 py-2 mx-auto">
        <NavLink to="/" className="underline">
          blogs
        </NavLink>
        <NavLink to="/users" className="underline">
          users
        </NavLink>
        <UserStatus />
      </div>
    </nav>
  )
}
