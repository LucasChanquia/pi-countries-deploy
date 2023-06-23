import { Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import Nav from './components/Nav/Nav'
import Detail from '../src/components/Detail/Detail'
import Form from './components/Form/Form'
import SearchBar from './components/SearchBar/SearchBar'
import { Navigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect } from 'react';
import * as actions from './Redux/actions'
import { useDispatch } from 'react-redux';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001/" 

import './App.css'

function App() {

  const dispatch = useDispatch()

  
  //  const allCountries = useSelector((state) => state.allCountries)
  //  const allActivitiesFilter = useSelector((state) => state.allActivitiesFilter)
 
  useEffect(()=>{
    dispatch(actions.getCountries())
    dispatch(actions.getActivities())
},[])

   
 const location = useLocation();

  return (
    
      <div>
        {location.pathname !== '/' && <Nav/>  }
        {location.pathname === '/home' && <SearchBar />}

              

        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/home' element={<Home 
          // allCountries={allCountries} allActivitiesFilter={allActivitiesFilter}
          />}/>
          <Route path='/detail/:id' element={<Detail />}/>
          <Route path='/activities' element={<Form/>}/>
          <Route path='*' element={<Navigate to='/home'/>}/>
        </Routes>
        
      </div>
    
  )
}

export default App
