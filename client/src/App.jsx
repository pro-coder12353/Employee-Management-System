import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Login from './login';
import Employees from './Employees';
import Departments from './Departments';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Signup from './Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to ="/login" />} />
        <Route path ='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/employees' element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path='/departments' element={<ProtectedRoute><Departments/></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;