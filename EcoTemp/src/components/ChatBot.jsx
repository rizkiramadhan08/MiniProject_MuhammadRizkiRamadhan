import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ChatBot = () => {
  const [inputUser, setInputUser] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: "model", 
      text: "Halo Apa yang bisa dibantu tentang keadaan ruangan?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.7,
  };

  const handleChange = (e) => {
    setInputUser(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUser.trim()) return;

    try {
      setIsLoading(true);
      // Add user message immediately
      setMessages(prev => [...prev, { role: "user", text: inputUser }]);
      
      const promptDefault = "Jawab pertanyaan seputar keadaan dalam ruangan seperti suhu dengan singkat dan berikan sedikit tips lalu arahkan untuk menggunakan form yg sudah tersedia. Gunakan bahasa yang formal.";
      const combinedPrompt = `${promptDefault}\n${inputUser}`;
      
      const chatSession = model.startChat({ generationConfig });
      const result = await chatSession.sendMessage(combinedPrompt);
      const responseText = await result.response.text();
      
      // Add bot response
      setMessages(prev => [...prev, { role: "model", text: responseText }]);
      setInputUser("");
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { 
        role: "model", 
        text: "Maaf, terjadi kesalahan dalam memproses pertanyaan Anda." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle the chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Floating button for the chat */}
      <button
        className="fixed bottom-5 right-5 bg-green-500 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center hover:bg-green-600 transition"
        onClick={toggleChat}
      >
        <i className="fas fa-comments text-xl"></i>
      </button>

      {/* Chat window */}
        {isChatOpen && (
        <div 
            className="fixed bottom-24 right-5 w-96 bg-white shadow-lg rounded-lg overflow-hidden" // Changed w-80 to w-96
        >
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <h5 className="font-bold">Chat Temp</h5>
            {/* Close button */}
            <button
                onClick={toggleChat}
                className="text-white"
            >
                &#10005;
            </button>
            </div>
            
            {/* Chat messages area */}
            <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
                <div
                key={index}
                className={`mb-3 ${message.role === "user" ? "text-right" : "text-left"}`}
                >
                <div
                    className={`inline-block p-3 rounded-lg ${
                    message.role === "user"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    style={{ maxWidth: "75%" }}
                >
                    {message.text}
                </div>
                </div>
            ))}
            {isLoading && (
                <div className="text-left mb-3">
                <div className="inline-block bg-gray-200 p-3 rounded-lg">
                    Sedang menyiapkan jawaban...
                </div>
                </div>
            )}
            </div>
            
            {/* Input area */}
            <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex">
                <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={inputUser }
                onChange={handleChange}
                placeholder="Tanya Pertanyaan..."
                disabled={isLoading}
                />
                <button 
                className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 transition"
                type="submit"
                disabled={isLoading}
                >
                Kirim
                </button>
            </form>
            </div>
        </div>
        )}

    </>
  );
};

export default ChatBot;
