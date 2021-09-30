import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import ScrollButton from './components/ScrollButton'


function App() {
  return (
    <Router>
      <ScrollButton />
      <Routes />
    </Router>
  )
}

export default App;
