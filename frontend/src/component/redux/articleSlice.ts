import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload
    },
    clearArticles: (state) => {
      state.articles = []
      state.status = 'idle'
      state.error = null
    },
  },
});

export const { setArticles, clearArticles } = articleSlice.actions

export default articleSlice.reducer
