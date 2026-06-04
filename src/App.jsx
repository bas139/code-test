import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Codebox from './pages/Codebox';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import LessonView from './pages/LessonView';
import Courses from './pages/Courses';
import CourseView from './pages/CourseView';
import QuizView from './pages/QuizView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:id" element={<LessonView />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseView />} />
            <Route path="/quiz/:id" element={<QuizView />} />
            <Route path="/codebox" element={<Codebox />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
