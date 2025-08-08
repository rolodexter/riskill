# Riskill AI Cinematic Interface - Project Structure

## Project Overview
This project creates a highly cinematic, adaptive AI interface for the Riskill AI platform focused on banking industry verticals. It simulates adaptive UI experiences through animations and storyboarded user journeys, with special focus on agent onboarding and persona emergence storytelling.

## Current Structure
```
/src
  /components
    /common
      GlassmorphicCard.tsx     # Core glassmorphic UI component
      Tooltip.tsx              # Enhanced tooltip component with Tippy.js
    /banking
      BankingMetricCard.tsx    # Financial metric visualization card
      FinancialChart.tsx       # ApexCharts visualization component
    /animations
      TransitionEffects.ts     # GSAP transition effects and timelines
  /scenes
    /dashboard
      DashboardReveal.tsx      # Cinematic dashboard reveal sequence
    /onboarding
      WelcomeScene.tsx         # Initial welcome and entry scene
      AgentOnboardingScene.tsx # Conversational onboarding and persona emergence
  /styles                     # Shared styles and theme definitions
  SceneController.tsx         # Main scene navigation controller
  App.tsx                     # Main application entry point
  main.tsx                    # Application entry point
  global.css                  # Global styles
  App.css                     # Application-specific styles
```

## Planned Structure (In Progress)
```
/src
  /components
    /common
      GlassmorphicCard.tsx     # Core glassmorphic UI component
      Tooltip.tsx              # Enhanced tooltip component with Tippy.js
      Button.tsx               # Standardized button component (planned)
    /banking
      BankingMetricCard.tsx    # Financial metric visualization card
      FinancialChart.tsx       # ApexCharts visualization component
      RiskAnalysisPanel.tsx    # Risk analysis dashboard panel (planned)
    /layout
      DashboardLayout.tsx      # 5-zone Bloomberg Terminal inspired layout (planned)
      ControlPanel.tsx         # Presenter controls for demo navigation (planned)
    /animations
      TransitionEffects.ts     # GSAP transition effects and timelines
      ParticleSystem.tsx       # Enhanced particle system effects (planned)
  /scenes
    /onboarding
      WelcomeScene.tsx         # Initial welcome and agent interface (planned)
      PersonaEmergence.tsx     # Transformation from generic to financial persona (planned)
    /dashboard
      DashboardReveal.tsx      # Cinematic dashboard reveal sequence
      AdaptiveUIScene.tsx      # UI that adapts based on focus/context (planned)
  /styles
    variables.css              # Theme variables and design tokens
    glassmorphism.css          # Shared glassmorphism styling
    animations.css             # Animation keyframes and transitions
  /utils
    adaptiveLogic.ts           # Logic for simulating UI adaptation
    dataFormatters.ts          # Data formatting utilities
  /hooks
    useAdaptiveUI.ts           # Custom hook for adaptive UI behavior
  App.tsx                      # Main application entry point
```

## Technology Stack
- React 18.2.0
- TypeScript
- Vite
- Framer Motion
- GSAP (GreenSock Animation Platform)
- ApexCharts (planned)
- Tippy.js (planned)

## Implementation Status
- [x] Basic project setup
- [x] Core glassmorphic component
- [x] Banking metric card component
- [x] Simple animations and interactions
- [ ] Advanced charts with ApexCharts
- [ ] Enhanced tooltips with Tippy.js
- [ ] GSAP timeline animations
- [ ] Scene-based storyboard implementation
- [ ] Complete adaptive UI simulation
