import React from 'react'
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPages from './pages/PostPages'
import UserProfile from './pages/userProfile'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sign-in' element={<Signin />}/>
            <Route path='/sign-up' element={<Signup />}/>
            <Route path='/search' element={<Search />} />
            <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard />}/>
            </Route>
            <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:postId' element={<UpdatePost/>}/>
            </Route>
            <Route path='/post/:postSlug' element={<PostPages />}/>
            <Route path='/user/:id' element={<UserProfile />}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}  