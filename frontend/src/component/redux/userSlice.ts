import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmin: false,
  isLogin: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.isAdmin = action.payload
    },
    setAuthStatus: (state, action) => {
      state.isLogin = action.payload
    }
  },
})

export const { setUserRole, setAuthStatus } = userSlice.actions
export default userSlice.reducer
