import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store'
import { API } from '../../api/api'

export type AlbumType = {
  userId: number,
  id: number,
  title: string
}

export type PhotoType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

type StateType = {
  albums: Array<AlbumType>
  photos: Array<PhotoType>
}

const initialState: StateType = {
  albums: [],
  photos: []
}

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Array<AlbumType>>) => {
      state.albums = action.payload
    },

    setPhotos: (state, action: PayloadAction<Array<PhotoType>>) => {
      state.photos = action.payload
    }
  }
})

const { setAlbums, setPhotos } = albumSlice.actions

export const getAlbums = (): AppThunk => async dispatch => {
  try {
    const response = await API.getAlbums()
    dispatch(setAlbums(response.data))
  } catch (e) {
    console.log(e.message)
  }
}

export const getPhotos = (id: number): AppThunk => async dispatch => {
  try {
    const response = await API.getPhotos(id)
    dispatch(setPhotos(response.data))
  } catch (e) {
    console.log(e.message)
  }
}

export const selectAlbums = (state: RootState) => state.albums.albums
export const selectPhotos = (state: RootState) => state.albums.photos

export default albumSlice.reducer
