import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmin: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.isAdmin = action.payload
    },
  },
})

export const { setUserRole } = userSlice.actions
export default userSlice.reducer
