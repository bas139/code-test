import React, { useState, useEffect } from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { calculateXP } from '../utils/gamification';

const MOCK_LEADERBOARD = [
  { id: 'mock1', name: 'Alice Coder', score: 1420, language: 'Python', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 'mock2', name: 'Bob Hacker', score: 1100, language: 'C++', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: 'mock3', name: 'Charlie Dev', score: 850, language: 'JavaScript', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  { id: 'mock4', name: 'Diana Script', score: 500, language: 'Python', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana' },
  { id: 'mock5', name: 'Evan Byte', score: 200, language: 'Java', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Evan' },
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
    const userXP = calculateXP(solved);

    const currentUser = {
      id: 'current_user',
      name: 'You (Hacker)',
      score: userXP,
      language: 'Any',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
    };

    const combined = [...MOCK_LEADERBOARD, currentUser].sort((a, b) => b.score - a.score);
    
    // Assign ranks after sorting
    const ranked = combined.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    setLeaderboard(ranked);
  }, []);

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Trophy size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
        <h2 className="text-gradient" style={{ fontSize: '2.5rem' }}>Global Leaderboard</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Compete with others and climb the ranks!</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-bg-surface-hover)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>Rank</th>
              <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>Coder</th>
              <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>Top Language</th>
              <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', textAlign: 'right' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user) => (
              <tr key={user.id} style={{ 
                borderBottom: '1px solid var(--border-color)', 
                transition: 'background-color 0.2s',
                backgroundColor: user.id === 'current_user' ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
              }}>
                <td style={{ padding: '1.5rem' }}>
                  {user.rank === 1 && <Medal color="#fbbf24" size={24} />}
                  {user.rank === 2 && <Medal color="#94a3b8" size={24} />}
                  {user.rank === 3 && <Medal color="#b45309" size={24} />}
                  {user.rank > 3 && <span style={{ fontWeight: 'bold', marginLeft: '0.5rem', color: 'var(--color-text-muted)' }}>#{user.rank}</span>}
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-bg-surface-hover)', border: user.id === 'current_user' ? '2px solid var(--color-primary)' : 'none' }} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: user.id === 'current_user' ? 'var(--color-primary)' : 'inherit' }}>
                      {user.name} {user.id === 'current_user' && <User size={16} style={{ display: 'inline', marginLeft: '0.5rem' }} />}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{user.language}</td>
                <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: 'bold', color: user.id === 'current_user' ? 'var(--color-primary)' : 'var(--color-primary-light)', fontSize: '1.2rem' }}>
                  {user.score.toLocaleString()} XP
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
