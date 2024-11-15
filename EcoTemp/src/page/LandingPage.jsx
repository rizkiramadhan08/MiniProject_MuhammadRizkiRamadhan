import { Link } from 'react-router-dom';
import home from '../assets/img/home.png';
import Footer from '../components/Footer';


function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50">
      {/* Header Section */}
      <header className="bg-green-700 py-8 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white">EcoTemp</h1>
          <p className="mt-4 text-lg text-gray-200">
            Solusi Pemantauan Suhu Ruangan Berkelanjutan dan Real-Time
          </p>
        </div>
      </header>

      {/* Main Section */}
      <section className="flex flex-col md:flex-row justify-center items-center py-12 px-4">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-semibold text-green-700 mb-4">
            Kirim Umpan Balik dan Pantau Suhu Ruangan
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Bantu kami menjaga kualitas udara dengan mengirimkan umpan balik suhu ruangan. Sebagai admin, pantau suhu secara real-time untuk tindakan yang lebih cepat.
          </p>

          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center space-y-4 md:space-x-4 md:space-y-0">
            <Link to="/FeedBack" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-transform transform hover:scale-105">
              Kirim Umpan Balik Suhu
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img src={home} alt="Monitoring Suhu Ruangan" className="w-full h-auto" />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
