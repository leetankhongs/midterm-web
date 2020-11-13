import './App.css';
import routes from './routes';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {



  const showContentMenus = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index}
          path={route.path}
          exact={route.exact}
          component={route.main} />
      })
    }
    return result
  }

  return (
    <Router>
      <Switch>
        {showContentMenus(routes)}
      </Switch>
    </Router>

  );
}

export default App;
