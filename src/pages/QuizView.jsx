import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Send } from 'lucide-react';
import { problemsData } from '../data/problems';
import confetti from 'canvas-confetti';

export default function QuizView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = problemsData.find(p => p.id === id);
  
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
    if (solved.includes(id)) {
      setIsSolved(true);
      setStatus('correct');
      setAnswer(problem?.answer || '');
    }
  }, [id, problem]);

  if (!problem) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Quiz not found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary">Go Back</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    // Simple string comparison (trim spaces, ignore case)
    const isCorrect = answer.trim().toLowerCase() === String(problem.answer).trim().toLowerCase();
    
    if (isCorrect) {
      setStatus('correct');
      setIsSolved(true);
      
      const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
      if (!solved.includes(id)) {
        solved.push(id);
        localStorage.setItem('solvedProblems', JSON.stringify(solved));
      }

      // Trigger confetti celebration!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#8b5cf6', '#3b82f6', '#22c55e']
      });
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '2rem', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
      >
        <ArrowLeft size={18} /> กลับไปหน้าก่อนหน้า
      </button>

      <div className="card" style={{ padding: '3rem', borderTop: '4px solid var(--color-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--color-text-main)' }}>{problem.title}</h1>
          <span style={{ padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', backgroundColor: problem.diff === 'Easy' ? 'rgba(34, 197, 94, 0.1)' : problem.diff === 'Hard' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)', color: problem.diff === 'Easy' ? 'var(--color-success)' : problem.diff === 'Hard' ? 'var(--color-error)' : 'var(--color-warning)' }}>
            {problem.diff}
          </span>
        </div>

        <div style={{ marginBottom: '3rem', padding: '1.5rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', fontSize: '1.1rem', lineHeight: '1.8' }}>
          {problem.description_th.split('\\n').map((line, i) => <p key={i} style={{ margin: '0 0 1rem 0' }}>{line}</p>)}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
              พิมพ์คำตอบของคุณที่นี่:
            </label>
            <input 
              type="text" 
              value={answer}
              onChange={(e) => { setAnswer(e.target.value); setStatus('idle'); }}
              disabled={isSolved}
              placeholder="Ex. 15, True, 20"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.2rem',
                borderRadius: 'var(--border-radius-md)',
                border: `2px solid ${status === 'incorrect' ? 'var(--color-error)' : status === 'correct' ? 'var(--color-success)' : 'var(--border-color)'}`,
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-main)',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSolved || !answer.trim()}
              style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Send size={18} /> ส่งคำตอบ
            </button>

            {status === 'correct' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontWeight: 'bold', fontSize: '1.1rem', animation: 'fadeIn 0.3s' }}>
                <CheckCircle size={24} /> ยอดเยี่ยม! คำตอบถูกต้อง
              </span>
            )}
            
            {status === 'incorrect' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-error)', fontWeight: 'bold', fontSize: '1.1rem', animation: 'fadeIn 0.3s' }}>
                <XCircle size={24} /> คำตอบยังไม่ถูก ลองใหม่อีกครั้งนะ
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
