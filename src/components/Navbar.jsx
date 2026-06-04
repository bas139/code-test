import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, LayoutDashboard, Trophy, BookOpen, GraduationCap, Zap } from 'lucide-react';
import { calculateXP, getLevelInfo } from '../utils/gamification';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const [solvedCount, setSolvedCount] = useState(0);

  // Re-calculate XP when path changes (easy way to trigger updates)
  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
    setSolvedCount(solved.length);
  }, [location.pathname]);

  const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
  const xp = calculateXP(solved);
  const { level, rank } = getLevelInfo(xp);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand text-gradient">
        CodeMastery
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <BookOpen size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Lessons
        </Link>
        <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>
          <GraduationCap size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Courses
        </Link>
        <Link to="/codebox" className={`nav-link ${isActive('/codebox')}`}>
          <Terminal size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Codebox
        </Link>
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
          <LayoutDashboard size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Dashboard
        </Link>
        <Link to="/leaderboard" className={`nav-link ${isActive('/leaderboard')}`}>
          <Trophy size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Leaderboard
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '20px', backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid var(--color-primary)' }}>
          <Zap size={16} color="var(--color-primary)" />
          <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '0.9rem' }}>Lvl {level}</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>({xp} XP)</span>
        </div>
        <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign In</button>
      </div>
    </nav>
  );
}
