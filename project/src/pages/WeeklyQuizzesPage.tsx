import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Train, Trees, Utensils, Briefcase } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { weeklyQuizzes } from '../data/quizData';
import { useApp } from '../context/AppContext';
import { ThemeType } from '../types';

const WeeklyQuizzesPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProgress } = useApp();
  
  const getThemeIcon = (theme: ThemeType) => {
    switch (theme) {
      case 'grocery': return <ShoppingCart size={24} />;
      case 'transport': return <Train size={24} />;
      case 'park': return <Trees size={24} />;
      case 'restaurant': return <Utensils size={24} />;
      case 'office': return <Briefcase size={24} />;
      default: return null;
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <Layout title="Weekly Quizzes" showBack>
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {weeklyQuizzes.map((quiz) => (
          <motion.div key={quiz.id} variants={item}>
            <Card
              title={quiz.title}
              description={quiz.description}
              icon={getThemeIcon(quiz.theme)}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              medal={userProgress.weeklyQuizzes[quiz.id] || 'none'}
            />
          </motion.div>
        ))}
      </motion.div>
    </Layout>
  );
};

export default WeeklyQuizzesPage;