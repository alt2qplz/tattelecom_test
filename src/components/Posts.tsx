import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PostType, getPosts, selectPosts, sendPost } from '../redux/reducers/postsSlice'
import { UserType, getUsers, selectUsers } from '../redux/reducers/usersSlice'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import { Card, Typography } from 'antd'
import { Input } from 'formik-antd'
import Preloader from './common/Preloader'
import cn from 'classnames'
import style from './posts.module.scss'

const { Text } = Typography

export type SendPostType = Omit<PostType, 'id'>

const PostSchema = Yup.object().shape({
  userId: Yup.number().required(),
  title: Yup.string().required('Enter title'),
  body: Yup.string().required('Enter post text')
})

export const Posts: React.FC = () => {
  const posts: Array<PostType> = useSelector(selectPosts)
  const users: Array<UserType> = useSelector(selectUsers)
  const dispatch = useDispatch()
  const initialValues: SendPostType = {
    title: '',
    body: '',
    userId: 0
  }

  useEffect(() => {
    if (!users.length) dispatch(getUsers())
    dispatch(getPosts())
  }, [dispatch, users.length])

  const addNewPost = (post: SendPostType) => {
    dispatch(sendPost(post))
  }

  if (!posts.length || !users.length) return <Preloader/>

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PostSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          addNewPost(values)
          setSubmitting(false)
          resetForm()
        }}
      >
        {({ isValid, dirty, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit} className={cn(style.addPostForm)}>

              <div className={cn(style.addPostFieldWrap)}>
                <Input name="title" placeholder='Post title'/>
                <div className={cn(style.errorWrap)}><Text type="danger"><ErrorMessage name="title"/></Text></div>
              </div>

              <div className={cn(style.addPostFieldWrap)}>
                <Input.TextArea name="body" placeholder='Type your text here...'/>
                <div className={cn(style.errorWrap)}><Text type="danger"><ErrorMessage name="body"/></Text></div>
              </div>

              <button
                className="ant-btn ant-btn-primary"
                type="submit"
                disabled={!(dirty && isValid)}
              >
                Add new post
              </button>
            </Form>
          )
        }
        }
      </Formik>
      {posts.map(post => {
        const postAuthor = users.find(user => user.id === post.userId)
        return (
          <Card key={post.id} title={post.title.toUpperCase()} style={{ marginBottom: '1rem' }}>
            <Text>{post.body}</Text><br/><br/>
            <Text type="secondary">Post author: </Text><Text>{postAuthor ? postAuthor.name : 'Anonym'}</Text>
          </Card>
        )
      })}
    </>
  )
}

export default Posts
