import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Editor from '../pages/Editor';
import Homepage from '../pages/homepage/Homepage';
import Navbar from '../Components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-transparent rounded-full" />
  </div>
);      

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editor" element={<Editor />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;