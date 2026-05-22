import { Navigate, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import PrivateRoute from './components/PrivateRoute'

function Profile() {
  return (
    <section className="container py-4">
      <div className="page-panel">
        <p className="text-uppercase text-secondary fw-semibold mb-2">Profile</p>
        <h1 className="h3 mb-3">Demo User</h1>
        <p className="mb-0 text-secondary">
          Signed in as demo@blog.dev. You can create, edit, and delete posts
          authored by this account.
        </p>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
