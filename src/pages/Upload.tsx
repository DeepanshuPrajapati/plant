import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, Image, Check, AlertCircle } from 'lucide-react';
import ModelComparison from '../components/ModelComparison';

interface AnalysisResult {
  name: string;
  confidence: number;
  properties: string[];
  description: string;
}

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
    handleAnalysis(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handleAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setResult({
        name: 'Tulsi (Holy Basil)',
        confidence: 95.8,
        properties: [
          'Anti-inflammatory',
          'Adaptogenic',
          'Immunomodulator',
          'Antioxidant',
        ],
        description: 'Tulsi is a sacred plant in traditional Indian medicine, known for its diverse healing properties including stress relief, immune system support, and respiratory health benefits.',
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">Plant Recognition</h1>
        <p className="text-gray-600">
          Upload an image of a medicinal plant to identify its properties and traditional uses.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            {!preview ? (
              <UploadIcon className="h-16 w-16 text-emerald-500" />
            ) : (
              <Image className="h-16 w-16 text-emerald-500" />
            )}
          </div>
          <div>
            {isDragActive ? (
              <p className="text-emerald-600 font-medium">Drop the image here...</p>
            ) : (
              <p className="text-gray-600">
                Drag and drop an image here, or click to select
              </p>
            )}
          </div>
          <p className="text-sm text-gray-500">Supports: JPG, PNG, WEBP</p>
        </div>
      </div>

      {preview && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">Uploaded Image</h3>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4">Model Comparison</h3>
                <ModelComparison imageUrl={preview} />
              </div>
            </div>
            <div>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Analyzing image...</p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Check className="h-6 w-6 text-emerald-500" />
                    <h3 className="text-xl font-bold text-emerald-800">{result.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Confidence: {result.confidence.toFixed(1)}%
                  </p>
                  <div>
                    <h4 className="font-semibold text-emerald-700 mb-2">Medicinal Properties:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {result.properties.map((prop) => (
                        <li key={prop}>{prop}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-gray-600">{result.description}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <AlertCircle className="h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">No analysis results yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;