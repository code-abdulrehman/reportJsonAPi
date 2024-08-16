import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <App />
    </Provider>
  </StrictMode>,
)
