import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';
import Layout from '../components/Layout';

const GlobalScorePage: React.FC = () => {
  // Mock data for demonstration
  const topPlayers = [
    { id: 1, name: 'Sarah J.', score: 2500, country: 'US', rank: 'grandmaster' },
    { id: 2, name: 'Mike R.', score: 2350, country: 'UK', rank: 'master' },
    { id: 3, name: 'Anna L.', score: 2200, country: 'DE', rank: 'master' },
    // Add more players...
  ];

  // Calculate time remaining until weekly reset
  const now = new Date();
  const nextSunday = new Date();
  nextSunday.setDate(now.getDate() + (7 - now.getDay()));
  nextSunday.setHours(23, 59, 59, 999);
  const timeRemaining = nextSunday.getTime() - now.getTime();
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <Layout title="Global Rankings">
      <div className="space-y-6">
        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-primary-500 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock size={24} className="mr-2" />
              <span className="font-bold">Weekly Reset In</span>
            </div>
            <div className="text-xl font-bold">
              {days}d {hours}h
            </div>
          </div>
        </motion.div>

        {/* Top Players */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center">
            <Trophy size={24} className="mr-2 text-accent-500" />
            Top Players
          </h2>

          {topPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card flex items-center"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <span className="font-bold text-primary-600">#{index + 1}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-bold">{player.name}</span>
                  <span className="ml-2 text-sm text-neutral-500">{player.country}</span>
                </div>
                <div className={`text-sm rank-${player.rank}`}>
                  {player.rank.charAt(0).toUpperCase() + player.rank.slice(1)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold">{player.score}</div>
                <div className="text-sm text-neutral-500">points</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rewards Info */}
        <div className="card bg-accent-50">
          <h3 className="font-bold mb-2">Weekly Rewards</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <Trophy size={16} className="text-accent-500 mr-2" />
              1st Place: 1000 bonus points
            </li>
            <li className="flex items-center">
              <Trophy size={16} className="text-neutral-400 mr-2" />
              2nd-5th Place: 500 bonus points
            </li>
            <li className="flex items-center">
              <Trophy size={16} className="text-amber-600 mr-2" />
              6th-10th Place: 250 bonus points
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default GlobalScorePage;