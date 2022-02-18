import React, { useState } from 'react';
import Page from './Page'
import Axios from 'axios'


function HomeGuest() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
     await Axios.post('http://localhost:8080/register', { username, email, password })
      console.log('New user created')
    } catch(e) {
      console.log(e.response.data)
   }
  }


  return (
    <Page title='ditto' wide={true}>
    <div className="row align-items-center">
      <div className="col-lg-7 py-3 py-md-5 main-title">
        <h1 className="display-3">Connect The World</h1>
        <p className="lead">We believe the importance of social media stems from the ability to connect people from all different places and backgrounds. At ditto, we want people to connect based on similar interests, not by who they know.</p>
      </div>
      <div id='banner' className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username-register" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="email-register" className="text-muted mb-1">
              <small>Email</small>
            </label>
            <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
          </div>
          <div className="form-group">
            <label htmlFor="password-register" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
          </div>
          <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
            Sign up for <img src='../images/dittotext.png' width={50}></img>
          </button>
        </form>
      </div>
    </div>
  </Page>
  )
}

export default HomeGuest;