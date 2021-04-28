import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as UserPost from'./pages/components/UserPost';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Feed from './pages/Feed';
import {BrowserRouter , Route,Switch} from 'react-router-dom';
import Profile from './pages/Profile';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    	<Switch>
    
    		<Route exact path='/signup' component={SignUp}/>
    		<Route exact path='/login' component={LogIn}/>
        <Route exact path='/' component={Feed}/>
        <Route exact path='/profile/:uid' component={Profile}/>
       
    	</Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

