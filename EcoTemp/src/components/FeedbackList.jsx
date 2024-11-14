import React from 'react';

// FeedbackList component receives props: feedbacks, handleEdit, and isEditable
function FeedbackList({ feedbacks, handleEdit, isEditable }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Ruangan</th>
            <th className="py-2 px-4 text-left">Suhu (°C)</th>
            <th className="py-2 px-4 text-left">Deskripsi</th>
            <th className="py-2 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Belum ada umpan balik.
              </td>
            </tr>
          ) : (
            feedbacks.map((feedback, index) => (
              <tr key={feedback.id} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{feedback.name}</td>
                <td className="py-2 px-4">{feedback.room}</td>
                <td className="py-2 px-4">{feedback.temperature}</td>
                <td className="py-2 px-4">{feedback.description}</td>
                <td className="py-2 px-4">
                  {isEditable(feedback.timestamp) ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                      onClick={() => handleEdit(feedback)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 text-white px-4 py-1 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Waktu habis
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackList;
