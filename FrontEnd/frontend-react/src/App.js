import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

// pages
import Mainpage from './components/pages/mainpage';
import PageNotFound from './components/pages/pageNotFound';
import Loginpage from './components/pages/loginpage';



function App() {
  return (

      <Router>
          <Switch>
              <Route exact path={'/'} component={Mainpage}/>
              <Route exact path={'/login'} component={Loginpage}/>

              {/*KEEP AT THE END*/}
              <Route path={'/404'}component={PageNotFound}/>
              <Redirect to={'/404'}/>
          </Switch>
      </Router>

  );
}

export default App;
