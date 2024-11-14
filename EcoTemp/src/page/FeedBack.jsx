import { useState } from 'react';
import InputField from '../components/InputField'; // Impor InputField

function FeedBack() {
  // State untuk menyimpan input form
  const [name, setName] = useState('');
  const [room, setRoom] = useState('Ruangan 1'); // Default value untuk select
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      name,
      room,
      temperature,
      description,
    };
    setFeedbacks([...feedbacks, newFeedback]);

    // Reset form setelah submit
    setName('');
    setRoom('Ruangan 1'); // Kembalikan ke default room
    setTemperature('');
    setDescription('');

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ALERT */}
        {showAlert && (
          <div className="mb-4 text-center">
            <div className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
              Feedback berhasil dikirim!
            </div>
          </div>
        )}

        {/* Penjelasan */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Feedback Suhu Ruangan</h1>
          <p className="mt-2 text-gray-600">
            Berikan umpan balik mengenai suhu ruangan yang Anda rasakan agar dapat dipantau secara real-time.
          </p>
        </header>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Nama"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
            />
            
            {/* Dropdown Ruangan */}
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
            Kirim Umpan Balik
          </button>
        </form>

        {/* Tabel Hasil Feedback */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="py-2 px-4 text-left">no</th>
                <th className="py-2 px-4 text-left">Nama</th>
                <th className="py-2 px-4 text-left">Ruangan</th>
                <th className="py-2 px-4 text-left">Suhu (°C)</th>
                <th className="py-2 px-4 text-left">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Belum ada umpan balik.
                  </td>
                </tr>
              ) : (
                feedbacks.map((feedback, index) => (
                  <tr key={index} className="border-t">
                    <td>{index + 1}</td>
                    <td className="py-2 px-4">{feedback.name}</td>
                    <td className="py-2 px-4">{feedback.room}</td>
                    <td className="py-2 px-4">{feedback.temperature}</td>
                    <td className="py-2 px-4">{feedback.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedBack;
