import React, {useState} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService'
import Dashboard from '../Dashboard/Dashboard';
import CarDetails from '../CarDetails/CarDetails';
import ProfilePage from '../ProfilePage/ProfilePage';
import CarBuilds from '../CarBuilds/CarBuilds';


function App() {

  const [user, setUser] = useState(userService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like 
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin(){
    setUser(userService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout(){
    userService.logout();
    setUser({user: null})
  }

  return (
    <div className="App">
      <Switch>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          {userService.getUser() ? 
            <> 
             <Switch>
                <Route exact path="/">
                    <Dashboard handleLogout={handleLogout} user={user}/>
                </Route>
                <Route exact path="/cars/builds">
                  <CarBuilds handleLogout={handleLogout} user={user}/>
                </Route>
                <Route path="/cars/:id">
                  <CarDetails handleLogout={handleLogout} user={user}/>
                </Route>
                <Route path="/:username">
                  <ProfilePage handleLogout={handleLogout} user={user}/>
                </Route>
            </Switch>
            </>
            :
            <Redirect to='/login'/>
          }
  
      </Switch>
    </div>
  );
}

export default App;
