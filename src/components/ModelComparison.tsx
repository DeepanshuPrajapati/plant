import React, { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface ModelResult {
  model: string;
  predictions: {
    class: string;
    confidence: number;
  }[];
  inferenceTime: number;
}

const PREDICTIONS = [
  // Tulsi predictions
  {
    mobilenet: {
      model: 'MobileNetV2',
      predictions: [
        { class: 'Tulsi (Holy Basil)', confidence: 95.8 },
        { class: 'Mint', confidence: 75.2 },
        { class: 'Moringa', confidence: 65.4 }
      ],
      inferenceTime: 120
    },
    efficientnet: {
      model: 'EfficientNetV2',
      predictions: [
        { class: 'Tulsi (Holy Basil)', confidence: 97.2 },
        { class: 'Mint', confidence: 78.5 },
        { class: 'Moringa', confidence: 68.9 }
      ],
      inferenceTime: 180
    }
  },
  // Neem predictions
  {
    mobilenet: {
      model: 'MobileNetV2',
      predictions: [
        { class: 'Neem', confidence: 94.2 },
        { class: 'Moringa', confidence: 72.8 },
        { class: 'Tulsi (Holy Basil)', confidence: 62.5 }
      ],
      inferenceTime: 125
    },
    efficientnet: {
      model: 'EfficientNetV2',
      predictions: [
        { class: 'Neem', confidence: 96.5 },
        { class: 'Moringa', confidence: 75.2 },
        { class: 'Tulsi (Holy Basil)', confidence: 65.8 }
      ],
      inferenceTime: 175
    }
  },
  // Aloe Vera predictions
  {
    mobilenet: {
      model: 'MobileNetV2',
      predictions: [
        { class: 'Aloe Vera', confidence: 96.5 },
        { class: 'Neem', confidence: 71.3 },
        { class: 'Moringa', confidence: 63.7 }
      ],
      inferenceTime: 118
    },
    efficientnet: {
      model: 'EfficientNetV2',
      predictions: [
        { class: 'Aloe Vera', confidence: 98.1 },
        { class: 'Neem', confidence: 73.9 },
        { class: 'Moringa', confidence: 66.2 }
      ],
      inferenceTime: 172
    }
  }
];

function ModelComparison({ imageUrl }: { imageUrl: string }) {
  const [results, setResults] = useState<ModelResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(0);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate API calls with different response times
    await new Promise(resolve => setTimeout(resolve, 1500));

    const currentPrediction = PREDICTIONS[predictionIndex];
    setResults([currentPrediction.mobilenet, currentPrediction.efficientnet]);
    setPredictionIndex((prevIndex) => (prevIndex + 1) % 3);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing...' : 'Compare Models'}
        </button>
      </div>

      {isAnalyzing && (
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-gray-600">Analyzing with multiple models...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {results.map((result) => (
            <div key={result.model} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-emerald-800">{result.model}</h3>
                <span className="text-sm text-gray-500">
                  {result.inferenceTime}ms
                </span>
              </div>
              
              <div className="space-y-3">
                {result.predictions.map((pred) => (
                  <div key={pred.class} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {pred.confidence > 90 && (
                        <Check className="h-4 w-4 text-emerald-500" />
                      )}
                      <span className="text-gray-700">{pred.class}</span>
                    </div>
                    <span className="font-medium text-emerald-600">
                      {pred.confidence.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isAnalyzing && results.length === 0 && (
        <div className="flex flex-col items-center space-y-2 text-gray-500">
          <AlertCircle className="h-12 w-12" />
          <p>Click Compare Models to start analysis</p>
        </div>
      )}
    </div>
  );
}

export default ModelComparison;