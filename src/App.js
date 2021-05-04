import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { useEffect, useContext } from 'react'
import { AppContext } from './context/appContext';
import Login from './pages/Login';
import Activity from './pages/Activity';
import Banking from './pages/Banking';
import MakePayment from './pages/MakePayment';

function App() {
  const { userState, fetchUser } = useContext(AppContext)
  const [user, setUser] = userState
  useEffect(fetchUser, [])
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/signup" render={() =>
          user.id ? <Redirect to="/activity" /> : <Signup />
        } />
        <Route path="/login" render={() =>
          user.id ? <Redirect to="/activity" /> : <Login />} />
        <Route path="/activity" render={() =>
          user.id ? <Activity /> : <Redirect to="/login" />
        } />
        <Route path="/addCash" render={() =>
          user.id ? <Banking /> : <Redirect to="/login" />
        } />
        <Route path="/payment" render={() =>
          user.id ? <MakePayment /> : <Redirect to="/login" />
        } />
      </Switch>
    </div>
  );
}

export default App;