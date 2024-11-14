import { useEffect, useState } from 'react';

function AdminPage() {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    // Simulasi data suhu
    setTemperatures([
      { id: 1, room: 'Ruang 101', temperature: 24 },
      { id: 2, room: 'Ruang 102', temperature: 22 },
      { id: 3, room: 'Ruang 103', temperature: 26 },
    ]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin - Pemantauan Suhu</h1>
      <table className="table-auto bg-white shadow-lg rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Ruangan</th>
            <th className="px-4 py-2">Suhu</th>
          </tr>
        </thead>
        <tbody>
          {temperatures.map((temp) => (
            <tr key={temp.id}>
              <td className="border px-4 py-2">{temp.room}</td>
              <td className="border px-4 py-2">{temp.temperature}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
