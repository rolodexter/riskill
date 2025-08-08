import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { createRevealTimeline } from '../../components/animations/TransitionEffects';

interface WelcomeSceneProps {
  onStartDemo?: () => void;
  onStartOnboarding?: () => void;
}

/**
 * Cinematic welcome scene for Riskill AI enterprise platform
 * Presents an immersive introduction to the platform's capabilities
 * and integration with common enterprise software ecosystems
 */
const WelcomeScene: React.FC<WelcomeSceneProps> = ({ 
  onStartDemo, 
  onStartOnboarding 
}) => {
  // Refs for animation targeting
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create animated particles system with varied sizes, colors and speeds
    const container = containerRef.current;
    if (!container) return;
    
    const particles: HTMLDivElement[] = [];
    // Create more particles for a denser, more cinematic effect
    for (let i = 0; i < 120; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Randomize particle properties for a more dynamic field
      const size = Math.random() * 4 + 1;
      const speed = Math.random() * 40 + 20; // Movement speed (seconds)
      
      // Create color variation - subtle blues and purples
      const hue = 220 + Math.random() * 60; // Blue to purple range
      const saturation = 70 + Math.random() * 30;
      const lightness = 60 + Math.random() * 20;
      
      Object.assign(particle.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.3 + 0.1})`,
        boxShadow: `0 0 ${size * 2}px hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        zIndex: 1,
        animation: `float ${speed}s infinite linear`
      });
      
      // Add custom animation for floating effect
      const keyframes = document.createElement('style');
      keyframes.innerHTML = `
        @keyframes float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
          100% { transform: translate(0, 0); }
        }
      `;
      document.head.appendChild(keyframes);
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    // Create enhanced GSAP reveal timeline with staggered animations
    const timeline = createRevealTimeline([
      logoRef.current,
      headerRef.current,
      contentRef.current,
      buttonRef.current
    ], 0.5);
    
    // Start the timeline with a slight delay for impact
    setTimeout(() => {
      timeline.play();
    }, 500);
    
    return () => {
      timeline.kill();
      particles.forEach(p => {
        if (container && container.contains(p)) {
          container.removeChild(p);
        }
      });
    };
  }, []);

  // Get current date for display
  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);

  return (
    <div
      ref={containerRef}
      className="welcome-scene"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'rgba(255, 255, 255, 0.95)',
        fontFamily: 'Inter, sans-serif',
        padding: '0'
      }}
    >
      {/* Gradient overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(10,15,20,0.85) 0%, rgba(10,15,20,0.4) 100%)',
        zIndex: 1,
      }} />
      
      {/* Content wrapper */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: '0 8%',
      }}>
        {/* Left column: Main content */}
        <div style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '55%',
        }}>
          {/* Logo and Headline */}
          <motion.div
            ref={logoRef}
            style={{
              opacity: 0,
              marginBottom: '1.5rem'
            }}
          >
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              background: 'linear-gradient(90deg, #50A0FF, #9B7AFF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              padding: '0',
              textAlign: 'left',
              lineHeight: 1.1,
            }}>
              Riskill<span style={{ 
                fontSize: '1.8rem', 
                verticalAlign: 'super', 
                fontWeight: 300,
                marginLeft: '0.25rem',
                opacity: 0.8 
              }}>AI</span>
            </div>
            <div style={{
              fontSize: '1.4rem',
              opacity: 0.9,
              textAlign: 'left',
              letterSpacing: '0.05em',
              marginTop: '0.5rem',
              fontWeight: 300,
            }}>
              ENTERPRISE INTELLIGENCE
            </div>
          </motion.div>
          
          {/* Main headline */}
          <motion.div
            ref={headerRef}
            style={{
              opacity: 0,
              marginBottom: '2rem'
            }}
          >
            <h1 style={{
              fontSize: '4.2rem',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: 'white',
              maxWidth: '800px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}>
              Transform Your<br />Enterprise Workflow
            </h1>
          </motion.div>
          
          {/* Brief Description */}
          <motion.div
            ref={contentRef}
            style={{
              opacity: 0,
              marginBottom: '3rem',
              maxWidth: '650px'
            }}
          >
            <p style={{
              fontSize: '1.6rem',
              lineHeight: 1.5,
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.9)',
            }}>
              AI-powered intelligence that seamlessly integrates with your enterprise tools and transforms how you work.
            </p>
            
            {/* Enterprise Integration Tags */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>✓</span>
                Microsoft 365
              </div>
              
              <div style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>✓</span>
                Intuit QuickBooks
              </div>
              
              <div style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>✓</span>
                SharePoint
              </div>
              
              <div style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.9rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '1.1rem' }}>✓</span>
                Teams
              </div>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            ref={buttonRef}
            style={{
              opacity: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <motion.button
              onClick={onStartOnboarding}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'linear-gradient(90deg, #50A0FF, #9B7AFF)',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '4px',
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 25px rgba(80, 160, 255, 0.4)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '350px',
              }}
            >
              Start Experience
            </motion.button>
            
            <motion.button
              onClick={onStartDemo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '0.8rem 2rem',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                width: '100%',
                maxWidth: '350px',
                textAlign: 'center',
              }}
            >
              Skip to Demo
            </motion.button>
          </motion.div>
        </div>
        
        {/* Right column: Glassmorphic card */}
        <div style={{
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '5%',
        }}>
          <div style={{
            width: '100%',
            maxWidth: '450px',
            height: '65vh',
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Top section - title and date */}
            <div>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                marginBottom: '1rem',
                color: 'white',
              }}>
                Enterprise Overview
              </div>
              <div style={{
                fontSize: '1rem',
                opacity: 0.7,
                fontWeight: 400,
              }}>
                {formattedDate}
              </div>
              <div style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                margin: '1.5rem 0',
                width: '100%',
              }} />
            </div>
            
            {/* Middle section - metrics */}
            <div style={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.5rem',
            }}>
              {/* Metric rows */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ opacity: 0.7 }}>Integration Status</div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#50FA7B'
                }}>
                  Active
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ opacity: 0.7 }}>Connected Services</div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}>
                  14
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ opacity: 0.7 }}>Team Members</div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}>
                  86
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ opacity: 0.7 }}>Efficiency Gain</div>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#50FA7B'
                }}>
                  +47%
                </div>
              </div>
              
              {/* Chart placeholder */}
              <div style={{
                height: '150px',
                marginTop: '1rem',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                position: 'relative',
              }}>
                {/* Simulated chart lines */}
                <div style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '40%',
                  left: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '70%',
                  left: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }} />
                
                {/* Simulated chart bars */}
                {Array(10).fill(0).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      left: `${8 + i * 9}%`,
                      width: '5%',
                      height: `${25 + Math.random() * 50}%`,
                      backgroundColor: `rgba(80, ${160 + Math.random() * 60}, 255, ${0.5 + Math.random() * 0.5})`,
                      borderRadius: '3px 3px 0 0',
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Bottom section - action links */}
            <div>
              <div style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                margin: '1.5rem 0 1rem',
                width: '100%',
              }} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  opacity: 0.6,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}>
                  View Full Report
                </div>
                <div style={{
                  opacity: 0.6,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}>
                  Settings
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScene;