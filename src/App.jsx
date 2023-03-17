import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage/Homepage'
import { User } from './pages/User/User'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
