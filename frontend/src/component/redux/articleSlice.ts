import { createSlice } from '@reduxjs/toolkit'
import { Article } from '../../interface'


interface State {
  articles: Article[]
  isPersonalize: boolean
}
const initialState: State = {
  articles: [],
  isPersonalize: false,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload
    },
    setPersonalize: (state, action) => {
      state.isPersonalize = action.payload
    }
  },
});

export const { setArticles, setPersonalize } = articleSlice.actions

export default articleSlice.reducer
