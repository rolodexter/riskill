import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { ApexOptions } from 'apexcharts';

interface FinancialChartProps {
  chartType: 'area' | 'line' | 'bar' | 'candlestick' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'boxPlot' | 'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap';
  title: string;
  data: number[][];
  labels: string[];
  seriesNames: string[];
  height?: number;
  width?: string;
  className?: string;
}

const FinancialChart: React.FC<FinancialChartProps> = ({
  chartType,
  title,
  data,
  labels,
  seriesNames,
  height = 350,
  width = '100%',
  className = '',
}) => {
  // Format the data for ApexCharts
  const series = seriesNames.map((name, index) => ({
    name,
    data: data[index] || [],
  }));

  // Define default chart options with glassmorphic styling
  const [options] = useState<ApexOptions>({
    chart: {
      type: chartType,
      height: height,
      toolbar: {
        show: false,
      },
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
      },
    },
    colors: ['#4ade80', '#38bdf8', '#f43f5e', '#a78bfa'],
    grid: {
      borderColor: 'rgba(255,255,255,0.1)',
      strokeDashArray: 5,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      lineCap: 'round',
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
      x: {
        show: true,
        format: 'dd MMM',
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
        },
      },
      axisTicks: {
        color: 'rgba(255,255,255,0.1)',
      },
      axisBorder: {
        show: true,
        color: 'rgba(255,255,255,0.1)',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: 'rgba(255,255,255,0.7)',
      },
      itemMargin: {
        horizontal: 15,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.3,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
  });

  return (
    <motion.div 
      className={`financial-chart ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ 
        background: 'rgba(13, 17, 23, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.07)',
        padding: '20px',
        width: width
      }}
    >
      <div className="chart-header" style={{ marginBottom: '15px' }}>
        <h3 style={{ 
          color: 'rgba(255, 255, 255, 0.9)', 
          fontSize: '16px',
          fontWeight: 600,
          margin: 0,
          paddingLeft: '10px',
          borderLeft: '3px solid #4ade80'
        }}>
          {title}
        </h3>
      </div>
      <div className="chart-container">
        <ReactApexChart 
          options={options}
          series={series}
          type={chartType}
          height={height} 
        />
      </div>
    </motion.div>
  );
};

export default FinancialChart;
