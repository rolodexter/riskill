// React is used implicitly in JSX
import './App.css'
import SceneController from './SceneController'

/**
 * Main App component that serves as the entry point for Riskill AI
 * Now uses SceneController to navigate between different interface scenes:
 * - Welcome Scene (introduction)
 * - Agent Onboarding (persona emergence)
 * - Dashboard (analytics and financial insights)
 */
function App() {
  return (
    <div className="app-container" style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#080808',
      color: 'rgba(255, 255, 255, 0.9)',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>
      <SceneController />
    </div>
  );
}

export default App
