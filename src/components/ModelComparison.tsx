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

const PLANT_CLASSES = [
  'Tulsi (Holy Basil)',
  'Neem',
  'Aloe Vera',
  'Turmeric',
  'Mint',
  'Ginger',
  'Lemongrass',
  'Moringa',
  'Ashwagandha',
  'Brahmi'
];

function ModelComparison({ imageUrl }: { imageUrl: string }) {
  const [results, setResults] = useState<ModelResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate API calls with different response times
    const mobilenetResult = await new Promise<ModelResult>((resolve) => 
      setTimeout(() => resolve({
        model: 'MobileNetV2',
        predictions: PLANT_CLASSES.slice(0, 3).map((className, i) => ({
          class: className,
          confidence: (0.9 - i * 0.2) * 100
        })),
        inferenceTime: 120
      }), 1000)
    );

    const efficientnetResult = await new Promise<ModelResult>((resolve) =>
      setTimeout(() => resolve({
        model: 'EfficientNetV2',
        predictions: PLANT_CLASSES.slice(0, 3).map((className, i) => ({
          class: className,
          confidence: (0.95 - i * 0.15) * 100
        })),
        inferenceTime: 180
      }), 1500)
    );

    setResults([mobilenetResult, efficientnetResult]);
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
                      {pred.confidence > 80 && (
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