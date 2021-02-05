import React, { lazy, Suspense } from 'react'
import Preloader from './components/common/Preloader'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Navigation } from './components/common/Navbar'
import { Col } from 'antd'

const Users = lazy(() => import('./components/Users'))
const Posts = lazy(() => import('./components/Posts'))
const Albums = lazy(() => import('./components/Albums'))
const Photos = lazy(() => import('./components/Photos'))

function App() {
  return (
    <>
      <Col span={12} offset={6}>
      <Navigation/>
      <Suspense fallback={<Preloader/>}>
        <Switch>
          <Route path='/users' render={() => <Users/>}/>
          <Route path='/posts' render={() => <Posts/>}/>
          <Route path='/albums/:id' render={() => <Photos/>}/>
          <Route path='/albums' render={() => <Albums/>}/>
          <Route path='*' render={() => <Users/>}/>
        </Switch>
      </Suspense>
        </Col>
    </>
  )
}

export default withRouter(App)
