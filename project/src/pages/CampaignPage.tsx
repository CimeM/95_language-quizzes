import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Award, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

const CampaignPage: React.FC = () => {
  const navigate = useNavigate();
  
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
    <Layout title="Adventure Mode" showBack>
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card
            title="Weekly Quizzes"
            description="Scenario-based quizzes updated every week"
            icon={<CalendarDays size={24} />}
            onClick={() => navigate('/campaign/weekly')}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <Card
            title="Daily Challenge"
            description="Quick daily exercises to maintain your streak"
            icon={<Award size={24} />}
            onClick={() => navigate('/quiz/daily-challenge')}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <Card
            title="Skill Mastery"
            description="Advanced challenges to perfect your language skills"
            icon={<GraduationCap size={24} />}
            onClick={() => {}} // Would navigate to skill mastery section
            className="opacity-50"
          >
            <div className="inline-flex items-center bg-neutral-100 rounded-full px-3 py-1 text-xs text-neutral-600">
              <span>Coming soon</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default CampaignPage;