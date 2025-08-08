import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: ReactNode;
  title?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * GlassmorphicCard - A reusable card component with glassmorphism styling
 * Inspired by Palantir Foundry and modern glassmorphic UI design
 */
const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  title,
  active = false,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      className={`glassmorphic-card ${active ? 'active' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      style={{
        background: 'rgba(18, 18, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        border: active 
          ? '1px solid rgba(100, 210, 255, 0.2)' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: active 
          ? '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(100, 210, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          : '0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '-0.01em',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top highlight border */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
        }}
      />
      
      {/* Left highlight border */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
        }}
      />

      {title && (
        <div 
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          <div 
            style={{ 
              width: '4px', 
              height: '14px', 
              background: active ? 'rgba(100, 210, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)', 
              marginRight: '8px',
              borderRadius: '2px',
            }} 
          />
          {title}
        </div>
      )}

      {children}
    </motion.div>
  );
};

export default GlassmorphicCard;
