import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import { Register } from './UI/register'
import { Login } from './UI/login'
import { Compare } from './UI/compare'
import { Threshold } from './UI/threshold'
import { ProtectedRoutes } from './Security/ProtectedRoutes'
import { FixerAPIController } from './Application/FixerAPIController'
 
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/' render={() => ( <Compare /> )}/>
          <Route exact path = '/register' render={() => (<Register />) }/>
          <Route exact path = '/login' render={() => ( <Login /> )}/>
          <ProtectedRoutes exact path = '/subscribe' component={Threshold}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
