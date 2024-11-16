import { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import FeedbackList from '../components/FeedbackList';
import ChatBot from '../components/ChatBot';


function FeedBack() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Ruangan 1');
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Fetch all feedbacks from the API
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://673577925995834c8a92dcb6.mockapi.io/Feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  // Submit form handler for both creating and editing feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      name,
      room,
      temperature,
      description,
      timestamp: new Date(),
    };

    try {
      if (editingId) {
        // Update existing feedback (PUT)
        await axios.put(`https://673577925995834c8a92dcb6.mockapi.io/Feedback/${editingId}`, newFeedback);
        setEditingId(null); // Clear editing state
      } else {
        // Create new feedback (POST)
        await axios.post('https://673577925995834c8a92dcb6.mockapi.io/Feedback', newFeedback);
      }
      fetchFeedbacks();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }

    // Clear form
    setName('');
    setRoom('Ruangan 1');
    setTemperature('');
    setDescription('');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Edit feedback handler
  const handleEdit = (feedback) => {
    setName(feedback.name);
    setRoom(feedback.room);
    setTemperature(feedback.temperature);
    setDescription(feedback.description);
    setEditingId(feedback.id); // Set editingId to the feedback being edited
  };

  // Check if the feedback is still editable within 1 minute
  const isEditable = (timestamp) => {
    const currentTime = new Date();
    const feedbackTime = new Date(timestamp);
    const timeDiff = (currentTime - feedbackTime) / 1000; // Difference in seconds
    return timeDiff < 60; // Editable if less than 60 seconds
  };

  // Interval to refresh time-based UI elements (e.g., Edit button state)
  useEffect(() => {
    const interval = setInterval(() => {
      // This will force re-render every 1 second to update button states
      setFeedbacks((feedbacks) => [...feedbacks]);
    }, 1000); // Re-render every second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {showAlert && (
          <div className="mb-4 text-center">
            <div className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
              {editingId ? "Feedback berhasil diperbarui!" : "Feedback berhasil dikirim!"}
            </div>
          </div>
        )}

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Feedback Suhu Ruangan</h1>
          <p className="mt-2 text-gray-600">
            Berikan umpan balik mengenai suhu ruangan yang Anda rasakan agar dapat dipantau secara real-time.
          </p>
        </header>

        {/* Form for creating or editing feedback */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Nama"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Ruangan</label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Ruangan 1">Ruangan 1</option>
                <option value="Ruangan 2">Ruangan 2</option>
                <option value="Ruangan 3">Ruangan 3</option>
              </select>
            </div>

            <InputField
              label="Suhu (°C)"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Masukkan suhu ruangan"
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi (misal: 'terlalu panas')"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {editingId ? "Perbarui Umpan Balik" : "Kirim Umpan Balik"}
          </button>
        </form>

        {/* Table displaying feedbacks */}
        <FeedbackList 
          feedbacks={feedbacks} 
          handleEdit={handleEdit} 
          isEditable={isEditable} 
        />

        <ChatBot/>

      </div>
    </div>
  );
}

export default FeedBack;