import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import Layout from '../components/Layout';
import MedalDisplay from '../components/MedalDisplay';
import { useApp } from '../context/AppContext';
import { MedalType } from '../types';
import { useQuizDataContext } from '../context/QuizDataContext';

interface LocationState {
  score: number;
  total: number;
  timeElapsedMs: number;
}


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2
        }}
    />
);

const ResultsPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { weeklyQuizzes, dailyChallenge} = useQuizDataContext();
  // const { clubId } = useParams<{ clubId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { updateQuizMedal, userProgress } = useApp();
  const [timeImprovementMs, settimeImprovementMs] = useState(0);

  const state = location.state as LocationState;
  const { score, total, timeElapsedMs } = state || { score: 0, total: 0, timeElapsed:10000 };
  

  // const percentage = Math.round((score / total) * 100);
  const wrongAnswers = total - score; // number of all wrong answers
  const perfectTime = total * 3 * 1000; // 3s for each question is perfect
  const timeWithPenalty = timeElapsedMs + ( wrongAnswers * 2 * 1000 );
  const percentage = Math.round( ( perfectTime / timeWithPenalty ) * 100);

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

      const key = quizId?.replace(/\W/g, '') || '';
      const currentMedalInfo = userProgress.medals?.[key] || { medal: 'none', clubId: '', timeElapsedMs: 0 };
      console.log("currentMedalInfo",currentMedalInfo, userProgress.medals?.[key])
      
      const previousElapedTimeMs = currentMedalInfo.timeElapsedMs;
      var improvementMs = previousElapedTimeMs - timeWithPenalty;
      // case when record is not yet set
      if(currentMedalInfo.timeElapsedMs == 0){
        improvementMs = timeWithPenalty;
      }
      // in case of improvement, save the result
      if (improvementMs != 0 ){
        settimeImprovementMs(improvementMs);
      }

      updateQuizMedal(quizId, medal, timeWithPenalty);
      const currentMedalInfo1 = userProgress.medals?.[key] || { medal: 'none', clubId: '', timeElapsedMs: 15000 };
      console.log("currentMedalInfo1", currentMedalInfo1) 
    }
  }, [quizId, medal, updateQuizMedal]);
  
  // Get quiz title
  const quizTitle = quizId === 'daily-challenge' 
    ? 'Daily Challenge' 
    : weeklyQuizzes.find(q => q.id === quizId)?.title || 'Quiz';
  
  const formatTimeMs = (msa: number): string => {
    const ms = Math.abs(msa)
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const msecs = Math.floor((ms % 1000) / 10); // for two digits
    return `${mins}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(2, '0')}`;
  };

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
            <span className="text-neutral-600">Time: </span>
            <span className="text-xl ">{formatTimeMs(timeElapsedMs)} s</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-600">Penalty: </span>
            <span className="text-xl ">{wrongAnswers} x 2s</span>
          </div>

          <ColoredLine color="gray" />

          <div className="flex justify-between items-center mb-4 mt-2">
            <span className="text-neutral-600">Final Score: </span>
            <span className="text-xl font-bold">{formatTimeMs(timeWithPenalty)} s</span>
          </div>
          
          <div className="flex justify-between items-center mb-4 mt-2">
            <span className="text-neutral-600"></span>
            {timeImprovementMs > 0 ?  <>
              <span className={timeImprovementMs > 0? 'text-success-600': 'text-error-600' + "text-xl font-bold" }>
                New record!
              </span>
            </> : <></>}
            { !(timeImprovementMs == timeWithPenalty) ? <>
            
              <span className={timeImprovementMs > 0? 'text-green-600': 'text-error-600' + " text-xl font-bold" }>
                {timeImprovementMs > 0? '-': '+'}
                {formatTimeMs(timeImprovementMs)} s
              </span>
            </>: <></>}
          </div>
          
          <div className="w-full bg-neutral-200 rounded-full h-3 mb-6">
            <div 
              className={`h-3 rounded-full ${
                percentage >= 90 ? 'bg-success-500' : 
                percentage >= 70 ? 'bg-primary-500' : 
                percentage >= 50 ? 'bg-warning-500' : 
                'bg-error-500'
              }`}
              style={{ width: `${percentage > 100? 100 : percentage}%` }}
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