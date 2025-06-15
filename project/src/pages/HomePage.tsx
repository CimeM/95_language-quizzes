import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, Info, Trophy } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { useApp } from '../context/AppContext';
import { ImpromptuTopic } from '../types';

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

  
  const impromptuTopics : ImpromptuTopic[] = [
      {
        topic: "Hobbies and Interests",
        questions: [
          "What hobbies do you enjoy in your free time?",
          "How did you get started with your favorite hobby?",
          "Would you like to try any new hobbies in the future?",
          "Do you prefer doing hobbies alone or with others? Why?",
          "How much time do you spend on your hobbies each week?",
          "Have your hobbies changed over time?"
        ]
      },
      {
        topic: "Favorite Foods",
        questions: [
          "What is your favorite food and why?",
          "Can you describe a memorable meal you have had?",
          "Are there any foods you would like to try or learn to cook?",
          "Do you prefer eating at home or in restaurants?",
          "Is there a traditional dish from your country you recommend?",
          "Have you ever tried cooking a dish from another culture?"
        ]
      },
      {
        topic: "Travel Experiences",
        questions: [
          "What is the most interesting place you have visited?",
          "Do you prefer traveling alone or with others? Why?",
          "Where would you like to travel next and why?",
          "What is something surprising you learned while traveling?",
          "What is your favorite way to travel (car, plane, train, etc.)?",
          "Have you ever had a travel problem or funny story?"
        ]
      },
      {
        topic: "Family and Friends",
        questions: [
          "How do you usually spend time with your family or friends?",
          "Who is someone in your family or friend group you admire?",
          "What is a fun memory you have with your family or friends?",
          "How do you stay in touch with people who live far away?",
          "Do you have any family traditions?",
          "What qualities do you value most in a friend?"
        ]
      },
      {
        topic: "Current Events",
        questions: [
          "Is there a recent news story that caught your attention?",
          "How do you usually find out about current events?",
          "Do you think it’s important to stay informed about the news? Why or why not?",
          "How do you feel about the way news is reported in your country?",
          "Have you ever participated in a community or global event?",
          "What topics in the news interest you the most?"
        ]
      },
      {
        topic: "Education and Career Goals",
        questions: [
          "What are you studying or what would you like to study?",
          "What is your dream job and why?",
          "Do you have any plans or goals for your future career?",
          "Who has influenced your education or career choices?",
          "What skills would you like to learn for your future?",
          "Would you like to study or work abroad? Why or why not?"
        ]
      },
      {
        topic: "Cultural Differences",
        questions: [
          "Have you ever experienced a cultural difference that surprised you?",
          "What is a tradition from your culture that you are proud of?",
          "How can learning about other cultures be helpful?",
          "Have you ever celebrated a holiday from another culture?",
          "What do you think is the biggest difference between your culture and others?",
          "How do you feel when you meet people from different backgrounds?"
        ]
      },
      {
        topic: "Movies, Music, and Books",
        questions: [
          "What is your favorite movie, song, or book?",
          "Is there a movie or book that changed the way you think?",
          "Do you prefer watching movies, listening to music, or reading? Why?",
          "Who is your favorite actor, musician, or author?",
          "How do you discover new movies, music, or books?",
          "Have you ever recommended a movie, song, or book to someone?"
        ]
      },
      {
        topic: "Technology and Social Media",
        questions: [
          "How does technology make your life easier or more difficult?",
          "What social media platforms do you use the most?",
          "Do you think people spend too much time on their phones? Why or why not?",
          "How do you protect your privacy online?",
          "What is your favorite app or website and why?",
          "How has technology changed the way you communicate?"
        ]
      },
      {
        topic: "Environmental Issues",
        questions: [
          "What environmental issues are important to you?",
          "What can individuals do to help the environment?",
          "Have you made any changes in your life to be more environmentally friendly?",
          "Do you think governments are doing enough to protect the environment?",
          "How do you feel about recycling and reducing waste?",
          "What is one small change everyone could make to help the planet?"
        ]
      },
      {
        topic: "Dreams and Ambitions",
        questions: [
          "What is a dream you have for your future?",
          "What steps are you taking to achieve your ambitions?",
          "Who inspires you to follow your dreams?",
          "Have your dreams changed as you’ve grown older?",
          "What would you do if you knew you could not fail?",
          "How do you stay motivated when working toward a goal?"
        ]
      },
      {
        topic: "Sports and Fitness",
        questions: [
          "What sports do you enjoy playing or watching?",
          "How often do you exercise, and what activities do you do?",
          "Do you prefer team sports or individual sports? Why?",
          "Have you ever participated in a sports competition?",
          "Who is your favorite athlete and why?",
          "How do sports or exercise affect your mood?"
        ]
      },
      {
        topic: "Celebrations and Holidays",
        questions: [
          "What is your favorite holiday and how do you celebrate it?",
          "Are there any unique celebrations in your culture?",
          "What was the most memorable celebration you attended?",
          "Do you prefer big parties or small gatherings?",
          "Have you ever celebrated a holiday in another country?",
          "How do you prepare for special occasions?"
        ]
      },
      {
        topic: "Pets and Animals",
        questions: [
          "Do you have any pets? Tell us about them.",
          "What animal would you like to have as a pet and why?",
          "Have you ever visited a zoo or animal sanctuary?",
          "What is your favorite wild animal?",
          "How do animals make people’s lives better?",
          "Would you like to work with animals in the future?"
        ]
      },
      {
        topic: "Fashion and Style",
        questions: [
          "How would you describe your personal style?",
          "Do you follow fashion trends or prefer classic looks?",
          "Who is your fashion icon?",
          "What is your favorite item of clothing?",
          "How important is fashion in your culture?",
          "Have you ever designed or made your own clothes?"
        ]
      },
      {
        topic: "Learning New Skills",
        questions: [
          "What is a new skill you have learned recently?",
          "Is there a skill you wish you could master?",
          "How do you usually learn something new?",
          "Do you prefer learning alone or with others?",
          "What challenges have you faced while learning a new skill?",
          "How do you stay motivated to keep practicing?"
        ]
      },
      {
        topic: "Volunteering and Helping Others",
        questions: [
          "Have you ever volunteered for a cause? What did you do?",
          "Why do you think volunteering is important?",
          "What kind of volunteer work would you like to try?",
          "How can small acts of kindness make a difference?",
          "Who do you know that inspires you to help others?",
          "What skills can you gain from volunteering?"
        ]
      },
      {
        topic: "Childhood Memories",
        questions: [
          "What is your happiest childhood memory?",
          "Did you have a favorite toy or game as a child?",
          "Who was your best friend when you were young?",
          "What did you want to be when you grew up?",
          "How is your life now different from your childhood?",
          "Have you ever revisited a place from your childhood?"
        ]
      },
      {
        topic: "Future Technology",
        questions: [
          "What technological invention do you hope to see in the future?",
          "How do you think technology will change our lives in 20 years?",
          "Would you like to travel to space if it became possible?",
          "What are the risks of relying too much on technology?",
          "How do you imagine schools or workplaces in the future?",
          "What is one thing you wish technology could solve?"
        ]
      },
      {
        topic: "Art and Creativity",
        questions: [
          "Do you enjoy drawing, painting, or any other creative activities?",
          "Who is your favorite artist or creative person?",
          "What inspires you to be creative?",
          "Have you ever visited an art gallery or museum?",
          "How do you express your creativity in daily life?",
          "Do you think everyone can be creative? Why or why not?"
        ]
      }

  ];

  const [selectedTopic, setSelectedTopic] = React.useState<ImpromptuTopic | null>(null);

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
        
        <motion.div variants={item} className="card bg-accent-500 text-neutral-800 bg-trophy-pattern">
          <p className="text-sm font-medium">Medals Earned</p>
          <div className="flex items-center mt-2" onClick={() => navigate("/profile")}>
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
        className="space-y-4 mb-7 "
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

      {/* New tools for teachers */}
      <h2 className="text-xl font-bold mb-4">Tools</h2>
      
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >

        <motion.div>
          <div className="my-8">
            <button
              className="w-full px-4 py-3 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors font-semibold text-lg"
              onClick={() => {
                const random = impromptuTopics[Math.floor(Math.random() * impromptuTopics.length)];
                setSelectedTopic(random);
              }}
            >
              Get Random Impromptu Topic
            </button>
          </div>

          {/* Popup Modal */}
          {selectedTopic && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 text-3xl"
                  onClick={() => setSelectedTopic(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-2">{selectedTopic.topic}</h3>
                <div className="flex items-center text-neutral-500 mb-3 mt-2">
                  <Info className="mr-2" /> 
                  Find a listener and talk about this topic!
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedTopic.questions.map((q, idx) => (
                    <li key={idx} className="text-neutral-700">{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>

      </motion.div>
    </Layout>
  );
};

export default HomePage;