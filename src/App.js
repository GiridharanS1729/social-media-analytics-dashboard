import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import MainPage from './components/mainpage/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:username" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
