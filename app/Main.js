import React, { useState, useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useImmerReducer } from 'use-immer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'


// My Components
import Header from './components/Header'
import HomeGuest from './components/HomeGuest'
import Footer from './components/Footer'
import About from './components/About'
import Terms from './components/Terms'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'
import Profile from './components/Profile'
import EditPost from './components/EditPost'
import NotFound from './components/NotFound'


function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("dittoappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("dittoappToken"),
      username: localStorage.getItem("dittoappUsername"),
      avatar: localStorage.getItem("dittoappAvatar"),
    },
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "title":
        draft.setTitle
        return
      case "body":
        draft.setBody
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  
  useEffect(() => {
    if (state.loggedIn) {
        localStorage.setItem("dittoappToken", state.user.token)
        localStorage.setItem("dittoappUsername", state.user.username)
        localStorage.setItem("dittoappAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("dittoappToken")
        localStorage.removeItem("dittoappUsername")
        localStorage.removeItem("dittoappAvatar")
    }
  }, [state.loggedIn])
 


  return (
    <StateContext.Provider value={state}>
    <DispatchContext.Provider value={dispatch}>
      <BrowserRouter>
      <FlashMessages messages={state.flashMessages} />
      <Header />
          <Routes>
        <Route path="/profile/:username/*" element={<Profile />} />
        <Route path="/" exact element={state.loggedIn ? <Home /> : <HomeGuest />} />
        <Route path='/post/:id/edit' element={<EditPost />} />    
        <Route path="/post/:id" element={<ViewSinglePost />} />
        <Route path="/create-post" element={<CreatePost />}/>
        <Route path="/about-us" element={<About />}/>
        <Route path="/terms" element={<Terms />} />
        <Route path='*' element={<NotFound />} />    
    </Routes>
    <Footer />
        </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
    module.hot.accept()
}