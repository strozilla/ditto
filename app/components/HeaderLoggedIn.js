import React from 'react'

const HeaderLoggedIn = () => {
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
            <img className="small-header-avatar" style={{border:'2px solid #ffff'}} src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" />
          </a>
          <a className="btn btn-sm btn-success mr-2" style={{border:'1px solid #ffff'}} href="/create-post">
            Create Post
          </a>
          <button className="btn btn-sm btn-secondary" style={{border:'1px solid #ffff', color: '#ffc06e'}}>
            Sign Out
          </button>
      </div>
      </div>
  )
}

export default HeaderLoggedIn