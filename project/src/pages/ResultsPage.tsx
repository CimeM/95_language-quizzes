import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import Layout from '../components/Layout';
import MedalDisplay from '../components/MedalDisplay';
import { weeklyQuizzes } from '../data/quizData';
import { useApp } from '../context/AppContext';
import { MedalType } from '../types';

interface LocationState {
  score: number;
  total: number;
}

const ResultsPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { updateQuizMedal } = useApp();
  
  const state = location.state as LocationState;
  const { score, total } = state || { score: 0, total: 0 };
  
  const percentage = Math.round((score / total) * 100);
  
  // Determine medal based on score percentage
  const determineMedal = (): MedalType => {
    if (percentage >= 90) return 'gold';
    if (percentage >= 70) return 'silver';
    if (percentage >= 50) return 'bronze';
    return 'none';
  };
  
  const medal = determineMedal();
  
  // Save medal to user progress
  useEffect(() => {
    if (quizId && quizId !== 'daily-challenge') {
      updateQuizMedal(quizId, medal);
    }
  }, [quizId, medal, updateQuizMedal]);
  
  // Get quiz title
  const quizTitle = quizId === 'daily-challenge' 
    ? 'Daily Challenge' 
    : weeklyQuizzes.find(q => q.id === quizId)?.title || 'Quiz';
  
  return (
    <Layout showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 260,
            damping: 20 
          }}
          className="mb-8"
        >
          <Trophy 
            size={80} 
            className={medal !== 'none' 
              ? medal === 'gold' 
                ? 'text-accent-500' 
                : medal === 'silver' 
                  ? 'text-neutral-400' 
                  : 'text-amber-600'
              : 'text-neutral-400'
            } 
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2 text-center"
        >
          {medal !== 'none' ? 'Congratulations!' : 'Good try!'}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-600 mb-6 text-center"
        >
          You completed the {quizTitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-card p-6 mb-8 w-full max-w-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-600">Your score</span>
            <span className="text-xl font-bold">{score}/{total}</span>
          </div>
          
          <div className="w-full bg-neutral-200 rounded-full h-3 mb-6">
            <div 
              className={`h-3 rounded-full ${
                percentage >= 90 ? 'bg-success-500' : 
                percentage >= 70 ? 'bg-primary-500' : 
                percentage >= 50 ? 'bg-warning-500' : 
                'bg-error-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          {medal !== 'none' && (
            <div className="flex items-center justify-center">
              <MedalDisplay medal={medal} size="lg" animate />
              <span className="ml-4 font-bold text-lg capitalize">
                {medal} Medal
              </span>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
        >
          <button 
            onClick={() => navigate(`/quiz/${quizId}`)} 
            className="btn btn-secondary flex-1"
          >
            <RotateCcw size={18} className="mr-2" />
            Try Again
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary flex-1"
          >
            <Home size={18} className="mr-2" />
            Home
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ResultsPage;