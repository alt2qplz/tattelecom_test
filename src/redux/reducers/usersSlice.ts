import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store'
import { API } from '../../api/api'

export type UserType = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

type StateType = {
  users: Array<UserType>
}

const initialState: StateType = {
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<UserType>>) => {
      state.users = action.payload
    }
  }
})

const { setUsers } = usersSlice.actions

export const getUsers = (): AppThunk => async dispatch => {
  try {
    const response = await API.getUsers()
    dispatch(setUsers(response.data))
  } catch (e) {
    console.log(e.message)
  }
}

export const selectUsers = (state: RootState) => state.users.users

export default usersSlice.reducer
