import { createSlice } from '@reduxjs/toolkit'

const demoUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@blog.dev',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: demoUser,
    isAuthenticated: true,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload || demoUser
      state.isAuthenticated = true
    },
    signOut: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { signIn, signOut } = authSlice.actions
export default authSlice.reducer
