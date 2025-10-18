import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { RegisterForm } from './pages/register-form';
import { Dashboard } from './pages/dashboard';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<RegisterForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
