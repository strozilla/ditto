import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const HeaderLoggedOut = (props) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post('http://localhost:8080/login', { username, password })
      if (response.data) {
        console.log(response.data)
        props.setLoggedIn(true)
      } else {
          console.log("Incorrect username/password")
      }
    } catch(e) {
        console.log("There was an error")
    }
  }


  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
          <div className="row align-items-center">
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
              <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-light" style={{color: '#309970'}} type="text" placeholder="Username" autoComplete="off" />
            </div>
            <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
              <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-light" style={{color: '#309970'}} type="password" placeholder="Password" />
            </div>
            <div className="col-md-auto">
              <button className="btn btn-success btn-sm">Sign In</button>
            </div>
          </div>
        </form>
  )
}

export default HeaderLoggedOut

