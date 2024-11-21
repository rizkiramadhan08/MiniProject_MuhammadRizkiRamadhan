import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import FeedBack from './page/FeedBack'; 
import AdminPage from './page/AdminPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './page/Login'; // Mengimpor halaman Login
import ProtectedRoute from './Routes/ProtectedRoute'; // Mengimpor komponen ProtectedRoute

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/login" element={<Login />} /> {/* Menambahkan rute login */}
          
          {/* Rute admin yang dilindungi, hanya bisa diakses setelah login */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
