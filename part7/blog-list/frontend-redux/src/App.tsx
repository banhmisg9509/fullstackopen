import { Route, Routes } from 'react-router-dom'
import { PublicRoute, ProtectedRoute, Layout } from './components'
import { Login, Home, Users, UserDetail, BlogDetail } from './pages'

const App = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
