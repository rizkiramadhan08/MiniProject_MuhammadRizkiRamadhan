import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeedbackAdmin from '../components/FeedbackAdmin';

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  const baseulr = import.meta.env.VITE_BASE_URL;
  
  // Fetching feedback data
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(baseulr);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Deleting a feedback with confirmation alert
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feedback?');
    if (confirmDelete) {
      try {
        await axios.delete(`${baseulr}/${id}`);
        setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  // Handling admin logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        {/* Pass feedbacks and delete handler to FeedbackAdmin */}
        <FeedbackAdmin feedbacks={feedbacks} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminPage;
