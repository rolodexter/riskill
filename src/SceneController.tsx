import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScene from './scenes/onboarding/WelcomeScene';
import AgentOnboardingScene from './scenes/onboarding/AgentOnboardingScene';
import DashboardReveal from './scenes/dashboard/DashboardReveal';
import { AgentPersona } from './scenes/onboarding/AgentOnboardingScene';

// Scene navigation types
type SceneType = 'welcome' | 'onboarding' | 'dashboard';

const SceneController: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<SceneType>('welcome');
  // Initialize with default persona data that will be used in the dashboard
  const [_, setAgentPersona] = useState<AgentPersona>({
    name: "Sarah Chen",
    title: "Senior Financial Analyst, CFA",
    email: "sarah.chen@riskill.ai",
    industry: "Banking & Financial Services",
    expertise: [
      "Regulatory Compliance", 
      "Risk Management", 
      "Financial Performance Metrics"
    ]
  });
  
  // Navigation controls
  const navigateToScene = (scene: SceneType) => {
    setCurrentScene(scene);
  };
  
  // Handle onboarding completion
  const handleOnboardingComplete = (persona: AgentPersona) => {
    setAgentPersona(persona);
    navigateToScene('dashboard');
  };
  
  // Navigation controls UI
  const NavigationControls = () => (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '1rem',
      padding: '0.5rem 1rem',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '100px',
      zIndex: 1000
    }}>
      <div style={{
        marginRight: '1rem',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        opacity: 0.7
      }}>
        <span style={{ marginRight: '0.5rem' }}>📊</span>
        Riskill Demo
      </div>
      
      {['welcome', 'onboarding', 'dashboard'].map((scene) => (
        <motion.button
          key={scene}
          onClick={() => navigateToScene(scene as SceneType)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: currentScene === scene 
              ? 'linear-gradient(90deg, #50A0FF, #9B7AFF)' 
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {scene === 'welcome' ? 'Intro' : 
           scene === 'onboarding' ? 'Onboarding' : 'Dashboard'}
        </motion.button>
      ))}
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Scene transition container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          {currentScene === 'welcome' && (
            <WelcomeScene 
              onStartDemo={() => navigateToScene('dashboard')}
              onStartOnboarding={() => navigateToScene('onboarding')}
            />
          )}
          
          {currentScene === 'onboarding' && (
            <AgentOnboardingScene 
              onComplete={handleOnboardingComplete}
              onSkip={() => navigateToScene('dashboard')}
            />
          )}
          
          {currentScene === 'dashboard' && (
            <DashboardReveal />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Always visible navigation controls */}
      <NavigationControls />
    </div>
  );
};

export default SceneController;
