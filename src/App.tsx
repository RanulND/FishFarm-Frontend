import './App.css'
import Navbar from './components/navbar/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Home from './containers/homeContainer/HomeContainer'
import FishFarmRegistration from './containers/fishFarmRegistration/FishFarmRegistration'

function App() {

  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='fish-farm-registration' element={<FishFarmRegistration />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
