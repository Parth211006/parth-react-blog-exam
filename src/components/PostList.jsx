import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts } from '../features/posts/postsSlice'
import PostDetails from './PostDetails'

function PostList() {
  const dispatch = useDispatch()
  const { items: posts, status, error } = useSelector((state) => state.posts)
  const [sortBy, setSortBy] = useState('date-desc')
  const [category, setCategory] = useState('all')
  const [author, setAuthor] = useState('all')

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const categories = useMemo(
    () => ['all', ...new Set(posts.map((post) => post.category).filter(Boolean))],
    [posts],
  )

  const authors = useMemo(
    () => ['all', ...new Set(posts.map((post) => post.authorName).filter(Boolean))],
    [posts],
  )

  const visiblePosts = useMemo(() => {
    return [...posts]
      .filter((post) => category === 'all' || post.category === category)
      .filter((post) => author === 'all' || post.authorName === author)
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return (b.popularity || 0) - (a.popularity || 0)
        }

        return new Date(b.date) - new Date(a.date)
      })
  }, [author, category, posts, sortBy])

  return (
    <main className="container py-4">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <p className="text-uppercase text-primary fw-semibold mb-1">Blog</p>
          <h1 className="display-6 fw-bold mb-2">Latest Posts</h1>
          <p className="text-secondary mb-0">
            Browse, sort, filter, and manage posts from the JSON Server backend.
          </p>
        </div>
        <div className="filters">
          <select
            className="form-select"
            aria-label="Sort posts"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="date-desc">Newest first</option>
            <option value="popular">Most popular</option>
          </select>
          <select
            className="form-select"
            aria-label="Filter by category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All categories' : item}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            aria-label="Filter by author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          >
            {authors.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All authors' : item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading posts...</div>}
      {status === 'failed' && (
        <div className="alert alert-danger">
          {error || 'Could not load posts. Start JSON Server and try again.'}
        </div>
      )}
      {status === 'succeeded' && visiblePosts.length === 0 && (
        <div className="alert alert-warning">No posts match the selected filters.</div>
      )}

      <div className="post-grid">
        {visiblePosts.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}

export default PostList
