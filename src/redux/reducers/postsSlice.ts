import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store'
import { API } from '../../api/api'
import { SendPostType } from '../../components/Posts'

export type PostType = {
  id: number
  userId: number
  title: string
  body: string
}

type StateType = {
  posts: Array<PostType>
}

const initialState: StateType = {
  posts: []
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Array<PostType>>) => {
      state.posts = action.payload
    },
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts = [action.payload, ...state.posts]
    }
  }
})

const { setPosts, addPost } = postsSlice.actions

export const getPosts = (): AppThunk => async dispatch => {
  try {
    const response = await API.getPosts()
    dispatch(setPosts(response.data))
  } catch (e) {
    console.log(e.message)
  }
}

export const sendPost = (post: SendPostType): AppThunk => async dispatch => {
  try {
    const response = await API.sendNewPost(post)
    dispatch(addPost(response.data))
  } catch (e) {
    console.log(e.message)
  }
}

export const selectPosts = (state: RootState) => state.posts.posts

export default postsSlice.reducer
