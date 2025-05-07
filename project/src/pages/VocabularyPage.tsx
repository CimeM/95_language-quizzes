import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Search } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Mock data for vocabulary categories
const vocabularyCategories = [
  { id: 'basics', title: 'Basics', count: 20, progress: 15 },
  { id: 'travel', title: 'Travel & Transport', count: 30, progress: 8 },
  { id: 'food', title: 'Food & Dining', count: 25, progress: 25 },
  { id: 'shopping', title: 'Shopping', count: 15, progress: 3 },
  { id: 'social', title: 'Social Interactions', count: 18, progress: 0 },
];

const VocabularyPage: React.FC = () => {
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
    <Layout title="Vocabulary">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search vocabulary"
            className="w-full p-3 pl-10 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <Search size={20} />
          </div>
        </div>
      </div>
      
      {/* Categories */}
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      
      <motion.div 
        className="space-y-4 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {vocabularyCategories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Card
              title={category.title}
              description={`${category.count} words`}
              icon={<BookOpen size={24} />}
              onClick={() => {}}
            >
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">Progress</span>
                  <span className="font-medium">{Math.round((category.progress / category.count) * 100)}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full" 
                    style={{ width: `${(category.progress / category.count) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        
        <motion.div variants={item}>
          <button className="w-full p-4 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-600 flex items-center justify-center hover:border-primary-500 hover:text-primary-500 transition-colors duration-200">
            <Plus size={20} className="mr-2" />
            <span>Add Custom Category</span>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Recent Words */}
      <h2 className="text-xl font-bold mb-4">Recently Learned</h2>
      <div className="opacity-50">
        <Card
          title="Start learning vocabulary"
          description="Your recently learned words will appear here"
          icon={<BookOpen size={24} />}
        />
      </div>
    </Layout>
  );
};

export default VocabularyPage;