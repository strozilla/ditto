import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'

const HeaderLoggedIn = () => {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)


function handleLogout() {
  appDispatch({type: "logout"})
}

  return (
    <div className=" container d-flex justify-content-end">
   <div className="row my-3 my-md-0">
          <a href="#" className="text-white mr-2 header-search-icon">
            <i className="fas fa-search"></i>
          </a>
          <span className="mr-2 header-chat-icon text-white">
            <i className="fas fa-comment"></i>
            <span className="chat-count-badge text-white"> </span>
          </span>
          <a href="#" className="mr-3">
            <img className="small-header-avatar" style={{border:'2px solid #ffff'}} src={appState.user.avatar} />
          </a>
          <Link className="btn btn-sm btn-success mr-2" style={{border:'1px solid #ffff'}} to="/create-post">
            Create Post
          </Link>
          <button onClick={handleLogout} className="btn btn-sm btn-secondary" style={{border:'1px solid #ffff', color: '#ffc06e'}}>
            Sign Out
          </button>
      </div>
      </div>
  )
}

export default HeaderLoggedIn