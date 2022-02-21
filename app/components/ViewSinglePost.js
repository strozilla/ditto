import React, { useContext } from 'react'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'
import Page from './Page'

const ViewSinglePost = () => {
  const current = new Date()
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  
  return (
    <Page title="Test Title">
      <div className="d-flex justify-content-between">
        <h2>{appDispatch({type: "title"})}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit"><i className="fas fa-edit"></i></a>
          <a className="delete-post-button text-danger" title="Delete"><i className="fas fa-trash"></i></a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href="#">
          <img className="avatar-tiny" src={localStorage.getItem("dittoappAvatar")} />
        </a>
        Posted by <a href="#">{localStorage.getItem("dittoappUsername")}</a> on {date}
      </p>

      <div className="body-content">
        <p>{appDispatch.title}</p>
        
      </div>
    </Page>
  )
}

export default ViewSinglePost