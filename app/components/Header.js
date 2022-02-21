import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderLoggedOut from './HeaderLoggedOut'
import HeaderLoggedIn from './HeaderLoggedIn';
import StateContext from '../StateContext'


function Header() {
    const appState = useContext(StateContext)


    return (
      <header className="header-bar">
      <div className="container d-flex flex-column flex-md-row align-items-center p-1">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            <img src='../images/logo.png' width={75}></img>
          </Link>
        </h4>
          {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
    )
}

export default Header;