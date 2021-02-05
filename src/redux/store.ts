import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersSlice'
import postsReducer from './reducers/postsSlice'
import albumsReducer from './reducers/albumsSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    albums: albumsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>
