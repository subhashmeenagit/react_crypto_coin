import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Coins from './components/Coins'
import Exchanges from './components/Exchanges'
import CoinDeatil from './components/CoinDeatil'
import Footer from './components/Footer'

const App = () => {
  return (
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coins' element={<Coins />}/>
      <Route path='/exchanges' element={<Exchanges/>}/>
      <Route path='/coin/:id' element={<CoinDeatil/>}/>
    </Routes>
    <Footer/>
  </Router>
  )
}

export default App













