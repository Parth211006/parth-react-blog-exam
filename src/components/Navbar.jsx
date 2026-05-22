import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { signIn, signOut } from '../features/auth/authSlice'

function Navbar() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <nav className="navbar navbar-expand-lg bg-info border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          React Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#blogNavbar"
          aria-controls="blogNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="blogNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new">
                Create Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated && (
              <span className="small text-secondary">{user?.name}</span>
            )}
            <button
              className={`btn btn-sm ${isAuthenticated ? 'btn-outline-danger' : 'btn-primary'}`}
              type="button"
              onClick={() => dispatch(isAuthenticated ? signOut() : signIn())}
            >
              {isAuthenticated ? 'Sign out' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
