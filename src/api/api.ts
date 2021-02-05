import axios from 'axios'
import { UserType } from '../redux/reducers/usersSlice'
import { PostType } from '../redux/reducers/postsSlice'
import { SendPostType } from '../components/Posts'
import { AlbumType, PhotoType } from '../redux/reducers/albumsSlice'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {}
})

export const API = {
  getUsers() {
    return instance.get<Array<UserType>>(`users`)
  },

  getPosts() {
    return instance.get<Array<PostType>>('posts')
  },

  sendNewPost(post: SendPostType) {
    return instance.post<PostType>(
      'posts',
      post,
      {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
  },

  getAlbums() {
    return instance.get<Array<AlbumType>>('albums')
  },

  getPhotos(id: number) {
    return instance.get<Array<PhotoType>>(`albums/${id}/photos`)
  }
}
