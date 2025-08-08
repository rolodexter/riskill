import React from 'react';
import GlassmorphicCard from '../common/GlassmorphicCard';
import Tooltip from '../common/Tooltip';
import { motion } from 'framer-motion';

interface BankingMetricCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

/**
 * BankingMetricCard - Financial metric display card with glassmorphic styling
 * Designed for banking KPIs like revenue, AUM, risk metrics, etc.
 */
const BankingMetricCard: React.FC<BankingMetricCardProps> = ({
  title,
  value,
  trend,
  icon,
  active = false,
  onClick,
}) => {
  return (
    <GlassmorphicCard active={active} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Tooltip 
            content={
              <div>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>{title} Metric</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  {title === 'REVENUE' && 'Total income generated across all banking services and products.'}
                  {title === 'RISK EXPOSURE' && 'Percentage of assets exposed to market volatility and default risk.'}
                  {title === 'CLIENT RETENTION' && 'Percentage of clients maintained over the last fiscal year.'}
                </div>
              </div>
            }
          >
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '0.25rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'help'
            }}>
              {title}
            </div>
          </Tooltip>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'baseline',
            gap: '0.5rem'
          }}>
            <Tooltip
              content={
                <div>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>Current Value</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {title === 'REVENUE' && 'Total revenue for the current quarter.'}
                    {title === 'RISK EXPOSURE' && 'Current risk exposure as percentage of total portfolio.'}
                    {title === 'CLIENT RETENTION' && 'Current client retention rate over trailing 12 months.'}
                  </div>
                </div>
              }
              placement="bottom"
            >
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 600,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '-0.03em',
                color: 'rgba(255, 255, 255, 0.95)',
                cursor: 'help'
              }}>
                {value}
              </div>
            </Tooltip>
            
            {trend && (
              <Tooltip
                content={
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                      {trend.positive ? 'Positive Trend' : 'Negative Trend'}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                      {title === 'REVENUE' && trend.positive && 'Revenue increased compared to previous quarter.'}
                      {title === 'REVENUE' && !trend.positive && 'Revenue decreased compared to previous quarter.'}
                      {title === 'RISK EXPOSURE' && trend.positive && 'Risk exposure increased, indicating potentially higher volatility.'}
                      {title === 'RISK EXPOSURE' && !trend.positive && 'Risk exposure decreased, indicating more stability.'}
                      {title === 'CLIENT RETENTION' && trend.positive && 'Client retention improved compared to previous period.'}
                      {title === 'CLIENT RETENTION' && !trend.positive && 'Client retention decreased compared to previous period.'}
                    </div>
                  </div>
                }
                placement="right"
              >
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: trend.positive ? 'rgba(74, 222, 128, 0.9)' : 'rgba(248, 113, 113, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'help'
                }}>
                  {trend.positive ? '↑' : '↓'} {trend.value}
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        
        {icon && (
          <div style={{ 
            opacity: 0.7, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px'
          }}>
            {icon}
          </div>
        )}
      </div>
      
      {/* Mini visualization area - could be a sparkline, bar chart, etc. */}
      <motion.div 
        style={{ 
          marginTop: '1rem', 
          height: '40px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Example mini bar chart - this would be replaced with actual visualization */}
        <div style={{ 
          display: 'flex', 
          height: '100%', 
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          padding: '4px'
        }}>
          {[0.3, 0.5, 0.4, 0.7, 0.6, 0.8].map((height, index) => (
            <motion.div
              key={index}
              style={{
                width: '4px',
                background: active 
                  ? 'linear-gradient(180deg, rgba(100, 210, 255, 0.8) 0%, rgba(100, 210, 255, 0.3) 100%)' 
                  : 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)',
                borderRadius: '2px',
              }}
              initial={{ height: 0 }}
              animate={{ height: `${height * 100}%` }}
              transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </GlassmorphicCard>
  );
};

export default BankingMetricCard;
