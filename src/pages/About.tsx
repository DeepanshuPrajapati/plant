import React from 'react';
import { Leaf, Brain, TestTube, Heart } from 'lucide-react';

function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">About AyurLeaf AI</h1>
        <p className="text-xl text-gray-600">
          Bridging ancient wisdom with modern technology to make traditional medicine more accessible.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Brain className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-800">Our Mission</h2>
          </div>
          <p className="text-gray-600">
            We're dedicated to preserving and promoting traditional medicinal knowledge through
            cutting-edge artificial intelligence. Our goal is to make this ancient wisdom
            accessible to everyone while ensuring its accuracy and authenticity.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <TestTube className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-800">Technology</h2>
          </div>
          <p className="text-gray-600">
            Our AI system combines advanced computer vision with deep learning models trained
            on extensive datasets of medicinal plants. This allows for accurate identification
            and detailed information about traditional uses and properties.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg text-emerald-800 mb-2">Upload</h3>
            <p className="text-gray-600">
              Simply upload a photo of any medicinal plant or leaf you want to identify.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg text-emerald-800 mb-2">Analyze</h3>
            <p className="text-gray-600">
              Our AI analyzes the image and matches it with our extensive database.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-lg text-emerald-800 mb-2">Learn</h3>
            <p className="text-gray-600">
              Get detailed information about the plant's medicinal properties and uses.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">Our Commitment</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          We're committed to maintaining the highest standards of accuracy and reliability
          in our plant identification system. Our team works closely with experts in
          traditional medicine to ensure the information we provide is both authentic
          and scientifically validated.
        </p>
      </section>
    </div>
  );
}

export default About;