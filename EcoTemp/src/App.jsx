import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import FeedBack from './page/FeedBack'; // Mengganti UserPage dengan FeedBack
import AdminPage from './page/AdminPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feedback" element={<FeedBack />} /> {/* Mengganti path dari /user menjadi /feedback */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;