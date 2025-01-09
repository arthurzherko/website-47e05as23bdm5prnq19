import { useState } from 'react';
import { motion } from 'framer-motion';
import CoffeeForm from '@/components/CoffeeForm';
import CoffeeRecommendation from '@/components/CoffeeRecommendation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface CoffeePreferences {
  roastLevel: number;
  intensity: number;
  milkBased: boolean;
  origin: string;
}

const Home = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (preferences: CoffeePreferences) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'pk_zhorbenland_ai_v1_dev'
        },
        body: JSON.stringify({
          prompt: `Given these coffee preferences: Roast Level ${preferences.roastLevel}/100, Intensity ${preferences.intensity}/100, ${preferences.milkBased ? 'Milk-based' : 'Black'}, Origin preference: ${preferences.origin || 'None'}, recommend a specific coffee with a name, description, and characteristics.`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }
      
      const data = await response.json();
      setRecommendation({
        name: data.name,
        description: data.description,
        roastLevel: data.roastLevel,
        intensity: data.intensity,
        origin: data.origin
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get coffee recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetRecommendation = () => {
    setRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-amber-800 mb-2">AI Coffee Recommender</h1>
        <p className="text-amber-700">Discover your perfect brew with AI-powered recommendations</p>
      </motion.div>
      
      {!recommendation ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <CoffeeForm onSubmit={handleSubmit} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <CoffeeRecommendation coffee={recommendation} />
          <Button onClick={resetRecommendation} className="mt-4 w-full">Get Another Recommendation</Button>
        </motion.div>
      )}
      
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-amber-800"
        >
          Brewing your perfect recommendation...
        </motion.div>
      )}
    </div>
  );
};

export default Home;