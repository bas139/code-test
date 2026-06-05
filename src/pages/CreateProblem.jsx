import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, Code2 } from 'lucide-react';

export default function CreateProblem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    diff: 'Easy',
    lang: 'All Languages',
    description_th: '',
    hint_th: '',
  });

  const [testcases, setTestcases] = useState([
    { input: '', expected: '' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTestcaseChange = (index, field, value) => {
    const newTestcases = [...testcases];
    newTestcases[index][field] = value;
    setTestcases(newTestcases);
  };

  const addTestcase = () => {
    setTestcases([...testcases, { input: '', expected: '' }]);
  };

  const removeTestcase = (index) => {
    if (testcases.length > 1) {
      setTestcases(testcases.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description_th.trim()) {
      alert('กรุณากรอกชื่อโจทย์และคำอธิบายให้ครบถ้วน');
      return;
    }

    if (testcases.some(tc => !tc.expected.trim())) {
      alert('Expected Output ของทุก Test case ต้องไม่เป็นค่าว่าง');
      return;
    }

    const customProblem = {
      id: `CUSTOM_${Date.now()}`,
      type: 'problem',
      ...formData,
      testcases: testcases
    };

    // Save to localStorage
    const savedCustomProblems = JSON.parse(localStorage.getItem('customProblems') || '[]');
    savedCustomProblems.push(customProblem);
    localStorage.setItem('customProblems', JSON.stringify(savedCustomProblems));

    alert('สร้างโจทย์สำเร็จ!');
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', marginBottom: '2rem', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
      >
        <ArrowLeft size={18} /> กลับไปหน้าก่อนหน้า
      </button>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '0.8rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--color-secondary)' }}>
            <Code2 size={24} />
          </div>
          <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--color-text-main)' }}>สร้างโจทย์ใหม่</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ color: 'var(--color-text-main)', fontWeight: 'bold' }}>ชื่อโจทย์ (Title)</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., หาผลบวก A+B"
              className="form-input"
              style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-surface)', color: 'white' }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ color: 'var(--color-text-main)', fontWeight: 'bold' }}>ระดับความยาก (Difficulty)</label>
              <select 
                name="diff" 
                value={formData.diff} 
                onChange={handleInputChange}
                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-surface)', color: 'white' }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ color: 'var(--color-text-main)', fontWeight: 'bold' }}>ภาษา (Language)</label>
              <input 
                type="text" 
                name="lang"
                value={formData.lang}
                onChange={handleInputChange}
                disabled
                style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-muted)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ color: 'var(--color-text-main)', fontWeight: 'bold' }}>คำอธิบายโจทย์ (Description)</label>
            <textarea 
              name="description_th"
              value={formData.description_th}
              onChange={handleInputChange}
              rows="5"
              placeholder="อธิบายว่าโจทย์ต้องการอะไร และรูปแบบ Input/Output เป็นแบบไหน..."
              style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-surface)', color: 'white', resize: 'vertical' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ color: 'var(--color-text-main)', fontWeight: 'bold' }}>คำใบ้ (Hint) - ไม่บังคับ</label>
            <input 
              type="text" 
              name="hint_th"
              value={formData.hint_th}
              onChange={handleInputChange}
              placeholder="คำใบ้เพื่อช่วยผู้เล่น..."
              style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-surface)', color: 'white' }}
            />
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-text-main)' }}>Test Cases</h3>
              <button type="button" className="btn btn-secondary" onClick={addTestcase} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                <Plus size={16} /> เพิ่ม Test Case
              </button>
            </div>

            {testcases.map((tc, index) => (
              <div key={index} style={{ backgroundColor: 'var(--color-bg-base)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Test Case #{index + 1}</span>
                  {testcases.length > 1 && (
                    <button type="button" onClick={() => removeTestcase(index)} style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Input (ทิ้งว่างได้ถ้าไม่มี Input)</label>
                    <textarea 
                      value={tc.input}
                      onChange={(e) => handleTestcaseChange(index, 'input', e.target.value)}
                      rows="3"
                      placeholder="e.g. 5 10"
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-surface)', color: 'white', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Expected Output (สิ่งที่ต้องตอบกลับ)</label>
                    <textarea 
                      value={tc.expected}
                      onChange={(e) => handleTestcaseChange(index, 'expected', e.target.value)}
                      rows="3"
                      placeholder="e.g. 15"
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-surface)', color: 'white', fontFamily: 'monospace' }}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            <Save size={20} /> บันทึกและสร้างโจทย์
          </button>
        </form>
      </div>
    </div>
  );
}
