import './App.css';
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() =>{
    store.dispatch(loadUser);
  },[]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar/>
          <Routes>
            <Route exact path='/' element={<Landing/>} />
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route exact path='/create-profile' element={<CreateProfile/>}/>
            <Route exact path='/edit-profile' element={<EditProfile/>}/>
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
