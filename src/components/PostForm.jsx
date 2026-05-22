import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addPost } from '../features/posts/postsSlice'

const initialForm = {
  title: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
  image: '',
  category: '',
}

function PostForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.')
      return
    }

    setError('')
    setIsSaving(true)

    await dispatch(
      addPost({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim() || 'General',
        image:
          form.image.trim() ||
          'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
        popularity: 0,
        authorId: user.id,
        authorName: user.name,
      }),
    )

    setIsSaving(false)
    navigate('/')
  }

  return (
    <main className="container py-4">
      <div className="page-panel">
        <p className="text-uppercase text-primary fw-semibold mb-1">Create</p>
        <h1 className="h3 fw-bold mb-4">Add a New Post</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-8">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="date">
              Date
            </label>
            <input
              className="form-control"
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <input
              className="form-control"
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="image">
              Image URL
            </label>
            <input
              className="form-control"
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="6"
              value={form.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add Post'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default PostForm
