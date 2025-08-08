import React, { ReactNode, isValidElement } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { motion } from 'framer-motion';
import './tooltip.css'; // We'll create this file for custom styling

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  theme?: 'light' | 'dark' | 'riskill';
  arrow?: boolean;
  maxWidth?: number;
  className?: string;
  interactive?: boolean;
  animation?: string;
}

/**
 * Enhanced tooltip component using Tippy.js with glassmorphic styling options
 * Designed to provide context-sensitive information throughout the Riskill UI
 */
const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  theme = 'riskill',
  arrow = true,
  maxWidth = 300,
  className = '',
  interactive = false,
  animation = 'shift-away',
}) => {
  // Convert the content to a React element that Tippy can use
  const renderContent = (): React.ReactElement => {
    if (content === null || content === undefined) {
      return <div>Info</div>;
    }
    
    // If content is already a React element, wrap it in motion.div
    if (React.isValidElement(content)) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`tooltip-content ${className}`}
        >
          {content}
        </motion.div>
      );
    }
    
    // For strings, numbers, etc.
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`tooltip-content ${className}`}
      >
        {String(content)}
      </motion.div>
    );
  };

  // Ensure we always provide a valid React element as required by Tippy.js
  const renderChild = () => {
    if (isValidElement(children)) {
      return children;
    }
    
    // Wrap non-ReactElement children in a span
    return <span>{children}</span>;
  };

  // Set the correct theme class
  const tooltipClass = theme === 'riskill' ? 'riskill-theme' : theme;

  return (
    <Tippy
      content={renderContent()}
      placement={placement}
      arrow={arrow}
      animation={animation}
      theme={theme === 'riskill' ? 'custom' : theme}
      maxWidth={maxWidth}
      interactive={interactive}
      allowHTML={true}
      className={`riskill-tooltip ${tooltipClass}`}
      popperOptions={{
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: document.body
          }
        }]
      }}
    >
      {renderChild()}
    </Tippy>
  );
};

export default Tooltip;
