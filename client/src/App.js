import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register'
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
            <Route path='/register' component={Register} />
            <Route exact path='/' component={Main} />
            <Route component={NoMatch} />
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
