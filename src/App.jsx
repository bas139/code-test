import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Codebox from './pages/Codebox';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import LessonView from './pages/LessonView';
import Courses from './pages/Courses';
import VideoCourses from './pages/VideoCourses';
import CourseView from './pages/CourseView';
import QuizView from './pages/QuizView';
import Profile from './pages/Profile';
import CreateProblem from './pages/CreateProblem';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lesson/:id" element={<LessonView />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/videos" element={<VideoCourses />} />
                  <Route path="/course/:courseId" element={<CourseView />} />
                  <Route path="/quiz/:id" element={<QuizView />} />
                  <Route path="/codebox" element={<Codebox />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/create-problem" element={<CreateProblem />} />
                </Routes>
              </main>
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
