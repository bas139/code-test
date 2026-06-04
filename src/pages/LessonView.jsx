import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Sparkles, ArrowLeft, Globe, Settings, ChevronDown, Terminal } from 'lucide-react';
import { problemsData } from '../data/problems';
import { setupAutocomplete } from '../utils/autocomplete';
import confetti from 'canvas-confetti';

const BOILERPLATE_CODE = {
  python: '# Write your Python code here\n',
  javascript: '// Write your JavaScript code here\n',
  c: '#include <stdio.h>\n\nint main() {\n    // Write your C code here\n    return 0;\n}',
  'c++': '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    return 0;\n}',
  java: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n    }\n}'
};

const languageLabels = {
  'python': 'Python (Browser)',
  'javascript': 'JavaScript (Browser)',
  'c': 'C (Wandbox API)',
  'c++': 'C++ (Wandbox API)',
  'java': 'Java (Wandbox API)'
};

export default function LessonView() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultLang = queryParams.get('lang') || 'python';

  const problem = problemsData.find(p => p.id === id) || problemsData[0];
  
  const [langPref, setLangPref] = useState('th'); // 'th' or 'en'
  const [language, setLanguage] = useState(() => localStorage.getItem(`langPref-${problem.id}`) || defaultLang);
  const [code, setCode] = useState(() => {
    const savedLang = localStorage.getItem(`langPref-${problem.id}`) || defaultLang;
    return localStorage.getItem(`code-${problem.id}-${savedLang}`) || BOILERPLATE_CODE[savedLang] || BOILERPLATE_CODE['python'];
  });
  const [customInput, setCustomInput] = useState(problem.testcases[0]?.input || '');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const pyodideRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setCustomInput(problem.testcases[0]?.input || '');
    setOutput('');
    setShowHint(false);
    
    const savedLang = localStorage.getItem(`langPref-${problem.id}`) || defaultLang;
    setLanguage(savedLang);
    setCode(localStorage.getItem(`code-${problem.id}-${savedLang}`) || BOILERPLATE_CODE[savedLang] || BOILERPLATE_CODE['python']);
  }, [problem, defaultLang]);

  useEffect(() => {
    localStorage.setItem(`code-${problem.id}-${language}`, code);
    localStorage.setItem(`langPref-${problem.id}`, language);
  }, [code, language, problem.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load Pyodide on mount
  useEffect(() => {
    const loadPyodideAsync = async () => {
      try {
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
          script.async = true;
          document.body.appendChild(script);
          
          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }
        
        pyodideRef.current = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
        });
        setIsPyodideLoading(false);
      } catch (err) {
        console.error("Failed to load Pyodide", err);
      }
    };
    
    loadPyodideAsync();
  }, []);

  const handleEditorWillMount = (monaco) => {
    // Only register autocomplete once
    if (!monaco.languages.getLanguages().some(lang => lang.id === 'cpp_custom_loaded')) {
      setupAutocomplete(monaco);
      monaco.languages.register({ id: 'cpp_custom_loaded' });
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(localStorage.getItem(`code-${problem.id}-${newLang}`) || BOILERPLATE_CODE[newLang]);
  };

  const executeCode = async (inputStr) => {
    if (language === 'python' && pyodideRef.current) {
      let stdout = [];
      let inputLines = inputStr.split('\n');
      let inputPointer = 0;

      pyodideRef.current.setStdout({ batched: (msg) => stdout.push(msg) });
      pyodideRef.current.setStdin({
        stdin: () => {
          if (inputPointer < inputLines.length) {
            return inputLines[inputPointer++];
          }
          return null;
        }
      });

      await pyodideRef.current.runPythonAsync(code);
      return stdout.join('\n').trim();
    } else if (language === 'javascript') {
      let logOutput = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => logOutput.push(args.join(' '));
      // eslint-disable-next-line no-new-func
      new Function(code)();
      console.log = originalConsoleLog;
      return logOutput.join('\n').trim();
    } else if (['c', 'c++', 'java'].includes(language)) {
      const wandboxCompilers = { 'c': 'gcc-head-c', 'c++': 'gcc-head', 'java': 'openjdk-jdk-22+36' };
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          code: code,
          compiler: wandboxCompilers[language],
          stdin: inputStr
        })
      });
      
      const data = await response.json();
      if (data.status === '0') {
        return (data.program_output || '').trim();
      } else {
        throw new Error(data.compiler_error || data.program_error || 'Error executing code.');
      }
    } else {
      throw new Error('Language not supported for execution yet.');
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      const res = await executeCode(customInput);
      setOutput(res || 'Executed successfully with no output.');
    } catch (error) {
      setOutput(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    let outText = 'Running testcases...\n\n';
    setOutput(outText);
    let allPassed = true;

    try {
      for (let i = 0; i < problem.testcases.length; i++) {
        const tc = problem.testcases[i];
        outText += `Testcase ${i + 1}... `;
        setOutput(outText); // Live update

        const result = await executeCode(tc.input);
        
        if (result === tc.expected.trim()) {
          outText += '✅ Passed\n';
        } else {
          outText += '❌ Failed\n';
          outText += `\nInput:\n${tc.input}\n\nExpected:\n${tc.expected}\n\nActual:\n${result}\n`;
          allPassed = false;
          break;
        }
      }

      if (allPassed) {
        outText += '\n🎉 ACCEPTED! All testcases passed.';
        const solved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
        if (!solved.includes(problem.id)) {
          solved.push(problem.id);
          localStorage.setItem('solvedProblems', JSON.stringify(solved));
        }
        
        // Trigger confetti celebration!
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#8b5cf6', '#3b82f6', '#22c55e']
        });
      }
      setOutput(outText);
    } catch (error) {
      setOutput(outText + '\nError: ' + error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={20} /> Back
          </Link>
          <h2 className="text-gradient" style={{ margin: 0 }}>{problem.title}</h2>
        </div>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => setLangPref(langPref === 'th' ? 'en' : 'th')}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
        >
          <Globe size={16} /> {langPref === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
        {/* Left Panel: Instructions */}
        <div className="card" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-light)' }}>
              {langPref === 'th' ? 'คำอธิบายโจทย์' : 'Instructions'}
            </h3>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: 'var(--color-text-main)' }}>
              {langPref === 'th' ? problem.description_th.replace(/\\n/g, '\n') : problem.description_en.replace(/\\n/g, '\n')}
            </div>

            {/* Examples Section */}
            {problem.testcases && problem.testcases.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--color-text-main)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  {langPref === 'th' ? 'ตัวอย่าง (Examples)' : 'Examples'}
                </h4>
                {problem.testcases.slice(0, 2).map((tc, idx) => (
                  <div key={idx} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                      {langPref === 'th' ? `ตัวอย่างที่ ${idx + 1}` : `Example ${idx + 1}`}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ backgroundColor: 'var(--color-bg-base)', padding: '1rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Input</div>
                        <pre style={{ margin: 0, fontFamily: 'var(--font-family-code)', whiteSpace: 'pre-wrap', color: 'var(--color-text-main)' }}>{tc.input}</pre>
                      </div>
                      <div style={{ backgroundColor: 'var(--color-bg-base)', padding: '1rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Output</div>
                        <pre style={{ margin: 0, fontFamily: 'var(--font-family-code)', whiteSpace: 'pre-wrap', color: 'var(--color-text-main)' }}>{tc.expected}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            {!showHint ? (
              <button className="btn btn-secondary" onClick={() => setShowHint(true)} style={{ width: '100%', borderColor: '#8b5cf6', color: '#8b5cf6' }}>
                <Sparkles size={18} /> {langPref === 'th' ? 'ขอคำใบ้' : 'Get AI Hint'}
              </button>
            ) : (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8b5cf6', borderRadius: 'var(--border-radius-md)' }}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} /> {langPref === 'th' ? 'คำใบ้จากระบบ' : 'System Hint'}
                </h4>
                <p style={{ fontFamily: 'var(--font-family-code)', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  {langPref === 'th' ? problem.hint_th : problem.hint_en}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Editor and Output */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ 
            flex: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 'var(--border-radius-lg)', 
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            backgroundColor: '#1e1e1e', // Monaco dark background
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ 
              padding: '0.75rem 1rem', 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
                
                {/* Language Dropdown added here! */}
                <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '0.5rem' }}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem', 
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: '#858585',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>{languageLabels[language]}</span>
                    <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </div>

                  {isDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.5rem)',
                      left: 0,
                      width: 'max-content',
                      backgroundColor: 'var(--color-bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--border-radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      zIndex: 10,
                      overflow: 'hidden'
                    }}>
                      {Object.entries(languageLabels).map(([key, label]) => (
                        <div
                          key={key}
                          onClick={() => {
                            handleLanguageChange({ target: { value: key } });
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            color: language === key ? 'var(--color-primary)' : 'var(--color-text-main)',
                            backgroundColor: language === key ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                            fontSize: '0.85rem',
                            fontFamily: 'var(--font-family-base)',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => { if(language !== key) e.currentTarget.style.backgroundColor = 'var(--color-bg-surface-hover)' }}
                          onMouseLeave={(e) => { if(language !== key) e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={handleRunCode} disabled={isLoading || (language === 'python' && isPyodideLoading)} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--color-text-main)', transition: 'all 0.2s ease-in-out' }}>
                  {(language === 'python' && isPyodideLoading) ? (
                    <><Loader2 className="spinner" size={16} /> Loading...</>
                  ) : isLoading ? (
                    <><Loader2 className="spinner" size={16} /> Running...</>
                  ) : (
                    <><Terminal size={16} fill="currentColor" /> Run</>
                  )}
                </button>
                <button className="btn btn-primary" onClick={handleSubmitCode} disabled={isLoading || (language === 'python' && isPyodideLoading)} style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem', boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.39)', transition: 'all 0.2s ease-in-out' }}>
                  {isLoading ? (
                    <><Loader2 className="spinner" size={16} /> Testing...</>
                  ) : (
                    <><Play size={16} fill="currentColor" /> Submit</>
                  )}
                </button>
              </div>
            </div>
            
            <Editor
              height="100%"
              language={language === 'c++' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              beforeMount={handleEditorWillMount}
              onChange={(value) => setCode(value)}
              options={{ 
                minimap: { enabled: false }, 
                fontSize: 15, 
                fontFamily: 'var(--font-family-code)', 
                padding: { top: 16 }, 
                suggestOnTriggerCharacters: true, 
                quickSuggestions: true, 
                snippetSuggestions: 'inline',
                lineHeight: 24,
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 'var(--border-radius-lg)', 
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              backgroundColor: '#0a0a0a',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Standard Input (stdin)
              </div>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent', color: '#fff', border: 'none', padding: '1.25rem', fontFamily: 'var(--font-family-code)', outline: 'none', resize: 'none', fontSize: '0.9rem', lineHeight: '1.6' }}
                placeholder="Enter inputs here..."
              />
            </div>
            
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 'var(--border-radius-lg)', 
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              backgroundColor: '#0a0a0a',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Output Terminal (stdout)
              </div>
              <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto', backgroundColor: 'transparent', fontFamily: 'var(--font-family-code)', whiteSpace: 'pre-wrap', color: '#a3be8c', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {output ? (
                  <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>{output}</div>
                ) : (
                  <span style={{ color: '#334155' }}>Run your code to see the output here...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
