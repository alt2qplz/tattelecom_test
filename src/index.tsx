import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
)
