import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './redux/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* Provider is used to pass the store to the App component, now any component in app can access the store using provider */}
    <App />
    </Provider>
  </StrictMode>,
)
