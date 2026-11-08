import React from 'react'
import { registerSW } from 'virtual:pwa-register'

import App from './views/App'
import ReactDOM from 'react-dom';
import './views/styles/reset.scss'
import './views/styles/common.scss'

registerSW({ immediate: true })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
