import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import Notfound from './components/Notfound'
import './App.css'
import './components/Home/index.css'

// write your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>
)

export default App
