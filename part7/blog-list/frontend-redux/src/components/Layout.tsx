import { Outlet } from 'react-router'
import { Navigation } from './Navigation'
import { Notification } from './Notification'

export const Layout = () => {
  return (
    <>
      <Navigation />
      <main className="flex flex-col gap-4 container mx-auto">
        <h1 className="text-2xl font-bold">Blog App</h1>
        <Notification />
        <Outlet />
      </main>
    </>
  )
}
