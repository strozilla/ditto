import React, { useState, useEffect } from 'react';
import Page from './Page'
import Axios from 'axios'
import { useImmer, useImmerReducer } from 'use-immer'
import { CSSTransition } from 'react-transition-group'


function HomeGuest() {
  const initialState = {
    username: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: "",
      hasErrors: false,
      message: "",
    },
    submitCount: 0
  }

  function myReducer(draft, action) {
    switch (action.type) {
      case "usernameImmediately":
        draft.username.hasErrors = false
        draft.username.value = action.value
        if (draft.username.value.length > 30) {
          draft.username.hasErrors = true
          draft.username.message = "Username can't exceed 30 characters"
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasErrors = true
          draft.username.message = "Username can only contain letters and numbers."
        }
        return
      case "usernameAfterDelay":
        if (draft.username.value.length < 3) {
          draft.username.hasErrors = true
          draft.username.message = "Username must be at least 3 characters."
        }
        if (!draft.hasErrors) {
          draft.username.checkCount++
        }
        return
      case "usernameIsUnique":
        if (action.value) {
          draft.username.hasErrors = true
          draft.username.isUnique = false 
          draft.username.message = "Username already exists"
        } else {
          draft.username.isUnique = true
        }
        return
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.value = action.value
        return
      case "emailAfterDelay":
          if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "Please provide a valid email address."
        }
        if (!draft.eamil.hasErrors) {
          draft.email.checkCount++
        }
        return
      case "emailIsUnique":
        if (action.value) {
          draft.email.hasErrors = true
          draft.email.isUnique = false
          draft.email.message = "Email already used. Please sign in"
        } else {
          draft.email.isUnique = true
        }
        return
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        return
      case "passwordAfterDelay":
        if (draft.password.value.length < 10) {
          draft.password.hasErrors = true
          draft.password.message = "Password must be at least 10 characters"
        }
        return
      case "submitForm":
        return
      }
  }
  
  const [state, dispatch] = useImmerReducer(myReducer, initialState)

  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => dispatch({type: "usernameAfterDelay"}), 800)
      return () => clearTimeout(delay)
    }
  }, [state.username.value])

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({type: "emailAfterDelay"}), 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({type: "passwordAfterDelay"}), 800)
      return () => clearTimeout(delay)
    }
  }, [state.password.value])

  useEffect(() => {
    if (state.username.checkCount) {
      const myRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesUsernameExist", { username: state.username.value }, { cancelToken: myRequest.token})
          dispatch({type: "usernameIsUnique", value: response.data})
        } catch (e) {
          console.log(e)
        }
      }
      fetchResults()
    }
  }, [state.username.checkCount])

useEffect(() => {
    if (state.email.checkCount) {
      const myRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesEmailExist", { email: state.email.value }, { cancelToken: myRequest.token})
          dispatch({type: "emailIsUnique", value: response.data})
        } catch (e) {
          console.log(e)
        }
      }
      fetchResults()
    }
  }, [state.email.checkCount])

  const handleSubmit = (e) => {
    e.preventDefault()
    
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
            <input onChange={e => dispatch({type: "usernameImmediately", value: e.target.value})} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
              <CSSTransition in={state.username.hasErrors} timeout={330} classNames='liveValidateMessage' unmountOnExit>
                <div className='alert alert-danger small liveValidateMessage'>{state.username.message}</div>
            </CSSTransition> 
           </div>
          <div className="form-group">
            <label htmlFor="email-register" className="text-muted mb-1">
              <small>Email</small>
            </label>
            <input onChange={e => dispatch({type: "emailImmediately", value: e.target.value})} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
              <CSSTransition in={state.email.hasErrors} timeout={330} classNames='liveValidateMessage' unmountOnExit>
                <div className='alert alert-danger small liveValidateMessage'>{state.email.message}</div>
            </CSSTransition>    
         </div>
          <div className="form-group">
            <label htmlFor="password-register" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input onChange={e => dispatch({type: "passwordImmediately", value: e.target.value})} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
            <CSSTransition in={state.password.hasErrors} timeout={330} classNames='liveValidateMessage' unmountOnExit>
                <div className='alert alert-danger small liveValidateMessage'>{state.password.message}</div>
            </CSSTransition> 
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