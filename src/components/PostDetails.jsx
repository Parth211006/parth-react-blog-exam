import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deletePost, updatePost } from '../features/posts/postsSlice'

function PostDetails({ post }) {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const canManage = isAuthenticated && user?.id === post.authorId
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(post)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
  }

  const handleSave = () => {
    if (!draft.title.trim() || !draft.description.trim()) {
      setError('Title and description are required.')
      return
    }

    dispatch(
      updatePost({
        ...draft,
        title: draft.title.trim(),
        description: draft.description.trim(),
        category: draft.category.trim() || 'General',
      }),
    )
    setError('')
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(post)
    setError('')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <article className="post-card">
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          className="form-control mb-2"
          name="title"
          value={draft.title}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          rows="4"
          value={draft.description}
          onChange={handleChange}
        ></textarea>
        <div className="row g-2 mb-3">
          <div className="col-6">
            <input
              className="form-control"
              name="date"
              type="date"
              value={draft.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="category"
              value={draft.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              name="image"
              value={draft.image}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" type="button" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </article>
    )
  }

  return (
    <article className="post-card">
      <img className="post-image" src={post.image} alt={post.title} />
      <div className="post-body">
        <div className="d-flex justify-content-between gap-2 mb-2">
          <span className="badge text-bg-primary">{post.category}</span>
          <span className="small text-secondary">{post.popularity} views</span>
        </div>
        <h2 className="h5 fw-bold">{post.title}</h2>
        <p className="text-secondary">{post.description}</p>
        <div className="post-meta">
          <span>{post.authorName}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        {canManage && (
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              type="button"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default PostDetails
