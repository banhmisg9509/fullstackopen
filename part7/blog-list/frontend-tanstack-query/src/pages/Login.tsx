import { LoginForm, Notification } from 'src/components'

export const Login = () => {
  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <h2 className="text-2xl font-bold">Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}
