import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom'

import './css/app.css';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div id="main-content">
        <BrowserRouter>
          <Switch>
            <Route path='/signin' component={SignIn} />
            <Route exact path='/'>
              <Main />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </React.Fragment>
  );
}

const NoMatch = (props)=>{
  let location = useLocation();

  return <div >404 - Path to {location.pathname} Not Found</div>
}

export default App;
