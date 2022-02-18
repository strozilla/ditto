import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderLoggedOut from './HeaderLoggedOut'
import HeaderLoggedIn from './HeaderLoggedIn';

function Header() {
  const [ loggedIn, setLoggedIn] = useState()


    return (
      <header className="header-bar">
      <div className="container d-flex flex-column flex-md-row align-items-center p-1">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            <img src='../images/logo.png' width={75}></img>
          </Link>
        </h4>
          {loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut setLoggedIn={setLoggedIn}/>}
      </div>
    </header>
    )
}

export default Header;