import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './store'

import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

const DummyApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<DummyApp />, document.getElementById('root'))

serviceWorker.unregister()
