import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MessageSquare, Upload, Brain } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-5xl font-bold text-emerald-800 mb-6">
          Discover the Power of Traditional Medicine
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Using cutting-edge AI technology to identify medicinal plants and unlock their healing potential.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Plant Recognition</h3>
          <p className="text-gray-600 mb-4">
            Upload images of plants and leaves for instant identification and medicinal properties.
          </p>
          <Link
            to="/upload"
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Try Now
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-800 mb-2">AI Chatbot</h3>
          <p className="text-gray-600 mb-4">
            Get instant answers about medicinal plants and their traditional uses.
          </p>
          <Link
            to="/chatbot"
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Chat Now
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-emerald-800 mb-2">Smart Analysis</h3>
          <p className="text-gray-600 mb-4">
            Advanced AI algorithms provide detailed insights about plant properties.
          </p>
          <Link
            to="/about"
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 mt-16">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">
          Featured Medicinal Plants
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Tulsi (Holy Basil)',
              image: 'https://media.istockphoto.com/id/1212980146/photo/selective-focus-of-holy-basil-tree.jpg?s=612x612&w=0&k=20&c=vbU0gjGUysp9S1l3RI_LY3TOC5Ts_BaxEfsmaeHwpZ4=',
              properties: 'Antioxidant, Anti-inflammatory',
            },
            {
              name: 'Neem',
              image: 'https://media.gettyimages.com/id/1448358871/photo/neem-leaves-close-up.jpg?s=612x612&w=0&k=20&c=NNASsW9VarBrrF9jsl7v4q34Kub8AgDlT0oAv19lHjk=',
              properties: 'Antibacterial, Immune booster',
            },
            {
              name: 'Aloe Vera',
              image: 'https://imgs.search.brave.com/uvxfMvalQHEbXh7Ph1eV08jyOkZ_cqtXZCe156YrtGo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/OC8xMS8xNS80Ny9h/bG9lLXZlcmEtMjYz/MTg1M182NDAuanBn',
              properties: 'Healing, Skin care',
            },
          ].map((plant) => (
            <div key={plant.name} className="rounded-lg overflow-hidden shadow-md">
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-emerald-800">{plant.name}</h3>
                <p className="text-gray-600">{plant.properties}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home;