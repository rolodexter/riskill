import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import BankingMetricCard from '../../components/banking/BankingMetricCard';
import FinancialChart from '../../components/banking/FinancialChart';
import Tooltip from '../../components/common/Tooltip';
import { createRevealTimeline, createParallaxEffect } from '../../components/animations/TransitionEffects';

interface DashboardRevealProps {
  onComplete?: () => void;
}

/**
 * Cinematic dashboard reveal scene
 * Creates a dramatic introduction to the banking analytics dashboard
 * with sequenced animations and parallax effects
 */
const DashboardReveal: React.FC<DashboardRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Mock data
  const revenueData = [44, 55, 57, 56, 61, 58, 63, 60, 66, 68, 78, 85];
  const expenseData = [35, 41, 36, 26, 45, 48, 52, 53, 41, 55, 58, 62];
  const riskExposureData = [28, 32, 39, 37, 42, 40, 45, 48, 52, 53, 41, 50];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    // Create particles for background effect
    const container = containerRef.current;
    if (!container) return;

    // Create animated particles
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      Object.assign(particle.style, {
        position: 'absolute',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        zIndex: 1
      });
      container.appendChild(particle);
      particles.push(particle);
    }

    // Create GSAP reveal timeline
    const timeline = createRevealTimeline([
      titleRef.current,
      metricsRef.current,
      chartRef.current
    ], 0.2);

    // Start the timeline
    setTimeout(() => {
      timeline.play();
    }, 500);

    // Create parallax effect for depth
    const removeParallax = createParallaxEffect(
      [
        titleRef.current as Element, 
        metricsRef.current as Element, 
        chartRef.current as Element, 
        ...particles
      ],
      [0.5, 1, 1.5, 0.3] // Different intensities for different elements
    );

    // Notify when complete
    timeline.eventCallback('onComplete', () => {
      if (onComplete) {
        setTimeout(onComplete, 1000);
      }
    });

    // Cleanup
    return () => {
      timeline.kill();
      removeParallax();
      particles.forEach(p => {
        if (container.contains(p)) {
          container.removeChild(p);
        }
      });
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="dashboard-reveal"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(10,15,20,1) 0%, rgba(14,21,35,1) 100%)',
      }}
    >
      {/* Title Section */}
      <div 
        ref={titleRef} 
        style={{
          opacity: 0,
          zIndex: 2,
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        <motion.h1 
          style={{
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
            textAlign: 'center',
            letterSpacing: '-0.03em'
          }}
        >
          <span style={{ color: '#50A0FF' }}>Riskill</span> Financial Intelligence
        </motion.h1>
        
        <motion.p 
          style={{
            fontSize: '1.1rem',
            opacity: 0.7,
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          Advanced banking analytics with adaptive UI
        </motion.p>
      </div>

      {/* Banking Metrics Grid */}
      <div 
        ref={metricsRef} 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '1200px',
          zIndex: 2,
          opacity: 0
        }}
      >
        <div>
          <BankingMetricCard
            title="REVENUE"
            value="$24.7M"
            trend={{ value: "4.2%", positive: true }}
          />
        </div>
        
        <div>
          <BankingMetricCard
            title="RISK EXPOSURE"
            value="72%"
            trend={{ value: "1.5%", positive: false }}
          />
        </div>
        
        <div>
          <BankingMetricCard
            title="CLIENT RETENTION"
            value="97.3%"
            trend={{ value: "0.8%", positive: true }}
          />
        </div>
      </div>

      {/* Financial Analysis Chart */}
      <div 
        ref={chartRef} 
        style={{
          marginTop: '2rem',
          width: '100%',
          maxWidth: '1200px',
          zIndex: 2,
          opacity: 0
        }}
      >
        <GlassmorphicCard 
          title="Financial Performance Analysis"
        >
          <Tooltip
            content={
              <div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>Annual Performance Metrics</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  Comparative analysis of revenue, expenses, and risk exposure over the past 12 months
                </div>
              </div>
            }
          >
            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.5,
              opacity: 0.8,
              marginBottom: '1rem',
              cursor: 'help'
            }}>
              Advanced analysis of financial metrics across multiple dimensions. Click on any banking metric above to see detailed analytics.
            </p>
          </Tooltip>
          
          <FinancialChart
            chartType="area"
            title="Annual Performance Metrics"
            data={[revenueData, expenseData, riskExposureData]}
            labels={monthLabels}
            seriesNames={['Revenue', 'Expenses', 'Risk Exposure']}
            height={320}
            width="100%"
            className="financial-analysis-chart"
          />
        </GlassmorphicCard>
      </div>
    </div>
  );
};

export default DashboardReveal;
