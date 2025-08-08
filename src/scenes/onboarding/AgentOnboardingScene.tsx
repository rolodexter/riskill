import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import { gsap } from 'gsap';

interface AgentOnboardingSceneProps {
  onComplete?: (agentPersona: AgentPersona) => void;
  onSkip?: () => void;
}

export interface AgentPersona {
  name: string;
  title: string;
  email: string;
  industry: string;
  expertise: string[];
  avatarUrl?: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'agent' | 'user';
  isTyping?: boolean;
}

/**
 * Agent Onboarding Scene
 * 
 * Simulates the conversational onboarding process where a generic
 * Riskill AI Agent transforms into a personalized financial analyst
 * based on user context and requirements
 */
const AgentOnboardingScene: React.FC<AgentOnboardingSceneProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your new business intelligence analyst. I'll be helping you monitor your banking performance and identify strategic opportunities.",
      sender: 'agent'
    },
    {
      id: 2,
      text: "Before we dive into your dashboard, I'd like to understand your role and business context so I can provide the most relevant insights.",
      sender: 'agent'
    },
    {
      id: 3,
      text: "What's your primary role in the organization?",
      sender: 'agent'
    }
  ]);
  
  // Information collected during onboarding
  const [_, setRoleInfo] = useState('');
  const [industryFocus, setIndustryFocus] = useState('');
  const [__, setAnalyticsNeeds] = useState('');
  
  // Final persona that emerges from the conversation
  const [emergingPersona, setEmergingPersona] = useState<AgentPersona | null>(null);
  const [showFinalPersona, setShowFinalPersona] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const personaCardRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Simulated conversation flow
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Add user message
    const newUserMessageId = messages.length + 1;
    setMessages([...messages, {
      id: newUserMessageId,
      text: userInput,
      sender: 'user'
    }]);
    
    // Store user input based on current step
    if (currentStep === 0) {
      setRoleInfo(userInput);
    } else if (currentStep === 1) {
      setIndustryFocus(userInput);
    } else if (currentStep === 2) {
      setAnalyticsNeeds(userInput);
    }
    
    // Clear input and prepare for agent response
    setUserInput('');
    
    // Add typing indicator
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: newUserMessageId + 1,
        text: '',
        sender: 'agent',
        isTyping: true
      }]);
    }, 500);
    
    // Simulate agent response based on conversation step
    setTimeout(() => {
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      if (currentStep === 0) {
        setMessages(prev => [...prev, {
          id: newUserMessageId + 1,
          text: `Thank you for sharing that. Understanding your role as ${userInput.includes('VP') || userInput.includes('Chief') ? 'a senior executive' : 'a key decision maker'} helps me tailor insights to your strategic needs. What specific banking or financial services does your organization focus on?`,
          sender: 'agent'
        }]);
        setCurrentStep(1);
      } 
      else if (currentStep === 1) {
        setMessages(prev => [...prev, {
          id: newUserMessageId + 1,
          text: `Great. Focusing on ${userInput} requires specific regulatory awareness and performance metrics. What analytics or insights are most critical for your decision-making process?`,
          sender: 'agent'
        }]);
        setCurrentStep(2);
      }
      else if (currentStep === 2) {
        setMessages(prev => [...prev, {
          id: newUserMessageId + 1,
          text: `Based on our conversation, I understand you need focused analysis on ${userInput.toLowerCase()}. I'll customize your dashboard accordingly.`,
          sender: 'agent'
        }]);
        
        // Begin persona emergence
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: newUserMessageId + 2,
            text: "Now I'll configure a personalized analyst profile that aligns with your specific needs and business context.",
            sender: 'agent'
          }]);
          
          // Generate and reveal persona
          setTimeout(() => {
            const newPersona: AgentPersona = {
              name: "Sarah Chen",
              title: "Senior Financial Analyst, CFA",
              email: "sarah.chen@riskill.ai",
              industry: "Banking & Financial Services",
              expertise: [
                "Regulatory Compliance",
                "Risk Management",
                "Financial Performance Metrics"
              ]
            };
            
            setEmergingPersona(newPersona);
            setCurrentStep(3);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: newUserMessageId + 3,
                text: `I'm Sarah Chen, your dedicated Senior Financial Analyst specialized in ${industryFocus}. I've been configured with expertise in regulatory compliance, risk management, and performance analytics tailored to your needs.`,
                sender: 'agent'
              }]);
              
              setTimeout(() => {
                setShowFinalPersona(true);
                
                // Animation for final persona reveal
                if (personaCardRef.current) {
                  gsap.fromTo(
                    personaCardRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                  );
                }
              }, 1500);
            }, 1000);
          }, 2000);
        }, 1000);
      }
    }, 1500);
  };
  
  // Complete onboarding and proceed to dashboard
  const handleProceedToDashboard = () => {
    if (emergingPersona && onComplete) {
      onComplete(emergingPersona);
    }
  };

  return (
    <div
      ref={containerRef}
      className="agent-onboarding-scene"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(10,15,20,1) 0%, rgba(14,21,35,1) 100%)',
        color: 'white',
        padding: '2rem'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: '1.8rem',
        fontWeight: 600,
        background: 'linear-gradient(90deg, #50A0FF, #9B7AFF)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Riskill<span style={{
          fontSize: '1rem',
          verticalAlign: 'super',
          opacity: 0.8,
          marginLeft: '3px'
        }}>AI</span>
      </div>
      
      {/* Skip button */}
      <motion.button
        onClick={onSkip}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer'
        }}
      >
        Skip Demo
      </motion.button>
      
      <div style={{
        width: '100%',
        maxWidth: '900px',
        height: '80vh',
        display: 'flex',
        flexDirection: showFinalPersona ? 'row' : 'column',
        gap: '1.5rem'
      }}>
        {/* Chat container */}
        <GlassmorphicCard
          style={{
            flex: showFinalPersona ? '1 1 60%' : '1 1 auto',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: 0
          }}
        >
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Generic agent avatar or emerging persona avatar */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: emergingPersona ? 'linear-gradient(135deg, #4b6cb7, #182848)' : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {emergingPersona ? 'SC' : '🤖'}
              </div>
              
              <div>
                <div style={{
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}>
                  {emergingPersona ? emergingPersona.name : 'Riskill AI Agent'}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  opacity: 0.7
                }}>
                  {emergingPersona ? emergingPersona.title : 'Business Intelligence Analyst'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Messages area */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <AnimatePresence>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    wordBreak: 'break-word'
                  }}
                >
                  <div style={{
                    background: message.sender === 'user' 
                      ? 'linear-gradient(90deg, #50A0FF, #7B90FF)' 
                      : 'rgba(255, 255, 255, 0.07)',
                    padding: '0.8rem 1rem',
                    borderRadius: message.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    color: message.sender === 'user' ? 'white' : 'rgba(255, 255, 255, 0.9)'
                  }}>
                    {message.isTyping ? (
                      <div className="typing-indicator">
                        <span>●</span><span>●</span><span>●</span>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                  
                  {/* Time indicator */}
                  <div style={{
                    fontSize: '0.7rem',
                    opacity: 0.5,
                    marginTop: '4px',
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}>
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          {currentStep < 3 && (
            <form 
              onSubmit={handleSubmit}
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                display: 'flex',
                gap: '0.5rem'
              }}
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={currentStep === 0 
                  ? "Enter your role (e.g., VP of Risk Management)" 
                  : currentStep === 1 
                  ? "Describe your organization's focus (e.g., Commercial Banking)"
                  : "What insights are most valuable to you?"}
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '0.95rem'
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(90deg, #50A0FF, #9B7AFF)',
                  border: 'none',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Send
              </motion.button>
            </form>
          )}
        </GlassmorphicCard>
        
        {/* Persona Card - appears at the end */}
        {showFinalPersona && (
          <div 
            ref={personaCardRef}
            style={{
              flex: '1 1 40%',
              opacity: 0
            }}
          >
            <GlassmorphicCard active={true}>
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4b6cb7, #182848)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  fontWeight: 600
                }}>
                  SC
                </div>
                
                <div style={{
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>
                    {emergingPersona?.name}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    opacity: 0.8,
                    marginBottom: '1rem'
                  }}>
                    {emergingPersona?.title}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.7
                  }}>
                    {emergingPersona?.email}
                  </div>
                </div>
                
                <div style={{
                  width: '100%',
                  padding: '1rem 0'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    opacity: 0.5,
                    marginBottom: '0.5rem'
                  }}>
                    Industry Focus
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.5rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}>
                    {emergingPersona?.industry}
                  </div>
                </div>
                
                <div style={{
                  width: '100%'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    opacity: 0.5,
                    marginBottom: '0.5rem'
                  }}>
                    Core Expertise
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {emergingPersona?.expertise.map((skill, index) => (
                      <div 
                        key={index}
                        style={{
                          background: 'rgba(80, 160, 255, 0.15)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '100px',
                          fontSize: '0.8rem'
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  onClick={handleProceedToDashboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                    background: 'linear-gradient(90deg, #50A0FF, #9B7AFF)',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Proceed to Dashboard
                </motion.button>
              </div>
            </GlassmorphicCard>
          </div>
        )}
      </div>
      
      {/* Scene progress indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '0.8rem',
          opacity: 0.7,
          marginRight: '0.5rem'
        }}>
          Onboarding Progress:
        </div>
        
        {[0, 1, 2, 3].map(step => (
          <div
            key={step}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: step <= currentStep 
                ? 'linear-gradient(90deg, #50A0FF, #9B7AFF)' 
                : 'rgba(255, 255, 255, 0.2)'
            }}
          />
        ))}
      </div>
      
      {/* Add some CSS for typing indicator animation */}
      <style>{`
        .typing-indicator {
          display: flex;
          align-items: center;
          height: 20px;
        }
        
        .typing-indicator span {
          animation: typingAnimation 1.4s infinite ease-in-out;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          display: inline-block;
          height: 5px;
          margin: 0 1px;
          width: 5px;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typingAnimation {
          0% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-5px);
            opacity: 0.2;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentOnboardingScene;
