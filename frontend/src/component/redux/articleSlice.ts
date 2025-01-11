import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [], // an array to hold the search results
  status: 'idle', // to track loading, success, or error state
  error: null, // to store any potential error messages
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
})

export const { setArticles, clearArticles } = articleSlice.actions

export default articleSlice.reducer
