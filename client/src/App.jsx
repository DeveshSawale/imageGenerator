import React from 'react'
import {BrowserRouter,Link,Route,Router,Routes} from 'react-router-dom'
import {logo} from './assets' 
import {Home, CreatePost} from './page'

const App = () => {
  return (
    <BrowserRouter>
      <navbar className = "w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src = {logo} alt = "logo" className= "w-28" />
        </Link>

        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>

      </navbar>

      <body>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/create-post' element = {<CreatePost/>}/>
        </Routes>
      </body>

    </BrowserRouter>
  )
}

export default App