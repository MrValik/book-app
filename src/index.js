import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/index.css'
import App from './App'
import store from './app/store'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)