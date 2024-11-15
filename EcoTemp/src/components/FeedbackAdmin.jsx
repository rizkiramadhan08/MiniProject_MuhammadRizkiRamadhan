import React from 'react';

const FeedbackAdmin = ({ feedbacks, handleDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Daftar Feedback Pengguna</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">Ruangan</th>
              <th className="py-2 px-4 border-b">Suhu (°C)</th>
              <th className="py-2 px-4 border-b">Deskripsi</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada feedback yang tersedia.
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{feedback.name}</td>
                  <td className="py-2 px-4 border-b">{feedback.room}</td>
                  <td className="py-2 px-4 border-b">{feedback.temperature}</td>
                  <td className="py-2 px-4 border-b">{feedback.description}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackAdmin;
