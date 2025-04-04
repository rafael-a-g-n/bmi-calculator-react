import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) {
      setError('Please enter both weight and height');
      setBmi(null);
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setError('Please enter valid numbers');
      setBmi(null);
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    
    setBmi({
      value: bmiValue.toFixed(1),
      category: getBMICategory(bmiValue)
    });
    setError('');
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
    if (bmi < 24.9) return { label: 'Normal weight', color: 'text-green-600' };
    if (bmi < 29.9) return { label: 'Overweight', color: 'text-yellow-600' };
    return { label: 'Obese', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          BMI Calculator
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateBMI}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Calculate BMI
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 text-center"
              >
                {error}
              </motion.div>
            )}

            {bmi && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Your BMI Result
                </h2>
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white p-6 rounded-lg shadow"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block text-4xl font-bold text-teal-600 mb-2"
                    >
                      {bmi.value}
                    </motion.span>
                    <span className={`text-xl font-semibold ${bmi.category.color}`}>
                      {bmi.category.label}
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-600"
                  >
                    <p>BMI Categories:</p>
                    <p>Underweight = Less than 18.5</p>
                    <p>Normal weight = 18.5–24.9</p>
                    <p>Overweight = 25–29.9</p>
                    <p>Obesity = BMI of 30 or greater</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default App;