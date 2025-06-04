import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, Trophy } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProgress } = useApp();
  
  const clubId = "default";
  const totalMedals = userProgress.medals == null ? 0 : Object.values(userProgress.medals).length;
  // const goldMedals = Object.values(userProgress.medals)
  //   .filter(medalInfo => medalInfo.medal === "gold" && medalInfo.clubId === clubId)
  //   .length;
  const goldMedals = Object.values(userProgress.medals)
    .filter(medalInfo => medalInfo.medal === "gold")
    .length;
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
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Fluent95</h1>
        <p className="text-neutral-600">Continue your language learning journey</p>
      </div>
      
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="card bg-primary-500 text-white">
          <p className="text-sm font-medium">Daily Streak</p>
          <div className="flex items-center mt-2">
            <Calendar size={20} />
            <span className="text-2xl font-bold ml-2">{userProgress.streak || 0} days</span>
          </div>
        </motion.div>
        
        <motion.div variants={item} className="card bg-accent-500 text-neutral-800">
          <p className="text-sm font-medium">Medals Earned</p>
          <div className="flex items-center mt-2">
            <Trophy size={20} />
            <span className="text-2xl font-bold ml-2">{totalMedals}</span>
            {goldMedals > 0 && (
              <span className="ml-2 text-sm">({goldMedals} gold)</span>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Main Menu Options */}
      <h2 className="text-xl font-bold mb-4">Game Modes</h2>
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card
            title="Adventure Mode"
            description="Themed challenges to build your language skills"
            icon={<Trophy size={24} />}
            onClick={() => navigate('/campaign')}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <Card
            title="Vocabulary Builder"
            description="Practice and expand your vocabulary"
            icon={<BookOpen size={24} />}
            onClick={() => navigate('/vocabulary')}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <Card
            title="Daily Challenge"
            description="Complete today's challenge to maintain your streak"
            icon={<Calendar size={24} />}
            onClick={() => navigate('/quiz/daily-challenge')}
            className={userProgress.lastCompletedDaily === new Date().toDateString() ? 'bg-neutral-100' : 'bg-success-50 border border-success-100'}
          >
            {userProgress.lastCompletedDaily === new Date().toDateString() ? (
              <div className="flex items-center text-success-600">
                <Award size={18} />
                <span className="ml-2 text-sm font-medium">Completed for today!</span>
              </div>
            ) : null}
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default HomePage;