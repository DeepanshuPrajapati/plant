import * as tf from '@tensorflow/tfjs';

const PLANT_CLASSES = [
  'Tulsi (Holy Basil)',
  'Neem',
  'Aloe Vera',
  'Turmeric',
  'Mint',
  'Moringa'
];

const MEDICINAL_PROPERTIES = {
  'Tulsi (Holy Basil)': {
    properties: ['Anti-inflammatory', 'Adaptogenic', 'Immunomodulator'],
    description: 'A sacred plant in Ayurveda known for its healing properties in respiratory ailments and stress relief.'
  },
  'Neem': {
    properties: ['Antibacterial', 'Antifungal', 'Blood purifier'],
    description: 'A powerful medicinal plant used for skin conditions, dental care, and as a natural pesticide.'
  },
  'Aloe Vera': {
    properties: ['Wound healing', 'Anti-inflammatory', 'Moisturizing'],
    description: 'Known for its healing properties in skin care, burns, and digestive health.'
  },
  'Turmeric': {
    properties: ['Anti-inflammatory', 'Antioxidant', 'Joint health'],
    description: 'A powerful medicinal root with anti-inflammatory and antioxidant properties.'
  },
  'Mint': {
    properties: ['Digestive aid', 'Cooling effect', 'Antimicrobial'],
    description: 'Used for digestive issues, respiratory health, and as a natural cooling agent.'
  },
  'Moringa': {
    properties: ['Nutrient-rich', 'Anti-inflammatory', 'Antioxidant'],
    description: 'Known as a miracle tree, rich in nutrients and used for various health benefits.'
  }
};

export async function loadModel() {
  try {
    const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/mobilenetv2/model.json');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load MobileNetV2 model');
  }
}

export async function classifyImage(model: tf.LayersModel, imageElement: HTMLImageElement): Promise<{
  className: string;
  confidence: number;
  properties: string[];
  description: string;
}> {
  // Preprocess the image
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224]) // MobileNetV2 input size
    .toFloat()
    .expandDims();

  // Normalize the image
  const normalized = tensor.div(255.0);

  // Get prediction
  const predictions = await model.predict(normalized) as tf.Tensor;
  const scores = await predictions.data();

  // Cleanup tensors
  tensor.dispose();
  normalized.dispose();
  predictions.dispose();

  // Get the highest confidence prediction
  const maxScore = Math.max(...scores);
  const predictedClass = PLANT_CLASSES[scores.indexOf(maxScore)];
  
  return {
    className: predictedClass,
    confidence: maxScore * 100,
    properties: MEDICINAL_PROPERTIES[predictedClass].properties,
    description: MEDICINAL_PROPERTIES[predictedClass].description
  };
}