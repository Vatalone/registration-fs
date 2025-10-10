import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element />
        <Route path='/dashboard' element />
      </Routes>
    </div>
  )
}

export default App
