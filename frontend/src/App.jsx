import RoutesComponent from './routes/RoutesComponent';
import { BrowserRouter } from 'react-router-dom';


const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-transparent rounded-full" />
  </div>
);

const App = () => {
  return (
    <RoutesComponent />
  );
};

export default App;
