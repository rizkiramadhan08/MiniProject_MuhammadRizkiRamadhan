import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-green-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        <div className="text-lg font-bold">
          EcoTemp
        </div>

        
        <div className="flex space-x-6"> 
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaFacebookF className="text-xl" /> 
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter className="text-xl" /> 
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram className="text-xl" /> 
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;