import './App.css'
import Navbar from './components/navbar/Navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Home from './containers/homeContainer/HomeContainer'
import FishFarmRegistration from './containers/fishFarmRegistration/FishFarmRegistration'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FishFarmDetails from './containers/fishFarmDetails/FishFarmDetails'

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='fishfarm/:id' element={<FishFarmDetails />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
