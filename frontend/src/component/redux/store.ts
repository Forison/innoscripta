import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import articleReducer from './articleSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articleReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
