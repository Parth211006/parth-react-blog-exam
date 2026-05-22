import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/posts'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL)
  return response.data
})

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
  const response = await axios.post(API_URL, post)
  return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post)
  return response.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`${API_URL}/${id}`)
  return id
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload)
      })
  },
})

export default postsSlice.reducer
