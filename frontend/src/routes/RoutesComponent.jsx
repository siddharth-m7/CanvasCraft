import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Editor from '../pages/Editor';
import Homepage from '../pages/homepage/Homepage';
import Navbar from '../components/comman/Navbar';
import UploadImage from '../pages/UploadImage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import ImageGeneratorComponent from '../pages/ImageGeneratorComponent';

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
        <Route path="/profile" element={ <ProfilePage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/upload" element={< UploadImage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/generate" element={<ImageGeneratorComponent />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesComponent;