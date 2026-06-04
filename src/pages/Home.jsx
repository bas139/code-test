import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Target, Filter, Search, CheckCircle, Code2, Hash } from 'lucide-react';
import { problemsData } from '../data/problems';

export default function Home() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const itemsPerPage = 30;

  React.useEffect(() => {
    const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
    setSolvedProblems(solved);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const filteredProblems = problemsData.filter(problem => {
    const matchesFilter = filter === 'All' || problem.diff === filter;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || problem.id.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const currentProblems = filteredProblems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Master Coding (TOI & OTOG)</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Interactive problems from classic competitive programming platforms. Choose any problem, write code, and run Python instantly in your browser!
        </p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search problems by title or ID..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            style={{ 
              width: '100%', 
              padding: '0.8rem 1rem 0.8rem 3rem', 
              borderRadius: 'var(--border-radius-lg)', 
              border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--color-bg-surface)', 
              color: 'var(--color-text-main)',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className={`btn ${filter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
        <button 
          className={`btn ${filter === 'Easy' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('Easy')}
          style={{ borderColor: filter === 'Easy' ? 'var(--color-success)' : '', color: filter === 'Easy' ? '#fff' : 'var(--color-success)' }}
        >
          Easy
        </button>
        <button 
          className={`btn ${filter === 'Medium' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('Medium')}
          style={{ borderColor: filter === 'Medium' ? 'var(--color-warning)' : '', color: filter === 'Medium' ? '#fff' : 'var(--color-warning)' }}
        >
          Medium
        </button>
        <button 
          className={`btn ${filter === 'Hard' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('Hard')}
          style={{ borderColor: filter === 'Hard' ? 'var(--color-error)' : '', color: filter === 'Hard' ? '#fff' : 'var(--color-error)' }}
        >
          Hard
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {currentProblems.map(problem => (
          <div key={problem.id} className="card" style={{ 
            display: 'flex', flexDirection: 'column', height: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'default'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--border-color)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', width: 'fit-content' }}>
                  <Code2 size={12} /> {problem.lang}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Hash size={12} /> {problem.id}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: problem.diff === 'Easy' ? 'rgba(34, 197, 94, 0.1)' : problem.diff === 'Hard' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)', color: problem.diff === 'Easy' ? 'var(--color-success)' : problem.diff === 'Hard' ? 'var(--color-error)' : 'var(--color-warning)' }}>
                  {problem.diff}
                </span>
                {solvedProblems.includes(problem.id) && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 'bold' }}>
                    <CheckCircle size={14} /> Solved
                  </span>
                )}
              </div>
            </div>
            
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: 'var(--color-text-main)' }}>{problem.title}</h2>
            
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {problem.description_th || "โจทย์ปัญหาการเขียนโปรแกรมที่จะท้าทายความสามารถของคุณ ลองแก้ปัญหานี้ดูสิ!"}
            </p>
            
            <Link to={`/lesson/${problem.id}`} style={{ width: '100%', textDecoration: 'none' }}>
              <button className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                <PlayCircle size={18} /> Solve Problem
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            style={{ minWidth: '100px' }}
          >
            Previous
          </button>
          <span style={{ color: 'var(--color-text-main)', fontWeight: '500', fontSize: '1.1rem' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            style={{ minWidth: '100px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
