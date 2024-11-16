import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FeedbackAdmin from '../components/FeedbackAdmin';

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL`/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

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

        <FeedbackAdmin feedbacks={feedbacks} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminPage;
