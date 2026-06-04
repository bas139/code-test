import React, { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Play, Loader2, Code2, Terminal, Settings, ChevronDown } from 'lucide-react';
import { setupAutocomplete } from '../utils/autocomplete';

const DEFAULT_CODE = {
  python: 'print("Hello, CodeMastery from Pyodide!")',
  javascript: 'console.log("Hello, World!");',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  'c++': '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\n    cout << "Hello world!" << endl;\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
};

export default function Codebox() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(DEFAULT_CODE['python']);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pyodideRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadPyodideAsync = async () => {
      try {
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
          script.async = true;
          document.body.appendChild(script);
          await new Promise((resolve) => { script.onload = resolve; });
        }
        pyodideRef.current = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' });
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
      // Dummy language register to mark as loaded
      monaco.languages.register({ id: 'cpp_custom_loaded' });
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(DEFAULT_CODE[newLang]);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      if (language === 'python' && pyodideRef.current) {
        let stdout = [];
        pyodideRef.current.setStdout({ batched: (msg) => stdout.push(msg) });
        await pyodideRef.current.runPythonAsync(code);
        setOutput(stdout.join('\\n') || 'Executed successfully with no output.');
      } else if (language === 'javascript') {
        let logOutput = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => logOutput.push(args.join(' '));
        // eslint-disable-next-line no-new-func
        new Function(code)();
        console.log = originalConsoleLog;
        setOutput(logOutput.join('\\n') || 'Executed successfully with no output.');
      } else if (['c', 'c++', 'java'].includes(language)) {
        const wandboxCompilers = { 'c': 'gcc-head-c', 'c++': 'gcc-head', 'java': 'openjdk-jdk-22+36' };
        const response = await fetch('https://wandbox.org/api/compile.json', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            compiler: wandboxCompilers[language]
          })
        });
        
        const data = await response.json();
        
        if (data.status === '0') {
          setOutput(data.program_output || 'Executed successfully with no output.');
        } else {
          setOutput(data.compiler_error || data.program_error || 'Error executing code.');
        }
      } else {
         setOutput(`Language not supported for execution yet.`);
      }
    } catch (error) {
      setOutput(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const languageLabels = {
    'python': 'Python (Browser)',
    'javascript': 'JavaScript (Browser)',
    'c': 'C (Wandbox API)',
    'c++': 'C++ (Wandbox API)',
    'java': 'Java (Wandbox API)'
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--border-radius-md)', color: 'var(--color-secondary)' }}>
            <Code2 size={24} />
          </div>
          <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem' }}>Codebox Sandbox</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div 
            ref={dropdownRef}
            style={{ position: 'relative' }}
          >
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: 'var(--color-bg-base)', 
                padding: '0.5rem 1rem', 
                borderRadius: 'var(--border-radius-md)', 
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <Settings size={16} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ color: 'var(--color-text-main)', fontWeight: '500' }}>{languageLabels[language]}</span>
              <ChevronDown size={16} style={{ color: 'var(--color-text-muted)', marginLeft: '0.5rem', transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>

            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                left: 0,
                width: '100%',
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
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      color: language === key ? 'var(--color-primary)' : 'var(--color-text-main)',
                      backgroundColor: language === key ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                      fontWeight: language === key ? '600' : '400',
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
          
          <button 
            className="btn btn-primary" 
            onClick={handleRunCode} 
            disabled={isLoading || (language === 'python' && isPyodideLoading)}
            style={{ 
              padding: '0.6rem 1.5rem', 
              boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.39)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {(language === 'python' && isPyodideLoading) ? <Loader2 className="spinner" size={18} /> : isLoading ? <Loader2 className="spinner" size={18} /> : <Play size={18} fill="currentColor" />}
            <span style={{ fontWeight: '600' }}>{isLoading ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
        {/* Editor Section */}
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
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#858585', fontFamily: 'var(--font-family-base)' }}>
              main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'c++' ? 'cpp' : language}
            </span>
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
              cursorBlinking: 'smooth',
            }}
          />
        </div>

        {/* Output Section */}
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
          <div style={{ 
            padding: '0.75rem 1rem', 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Terminal size={16} color="#94a3b8" />
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Output Terminal
            </span>
          </div>
          <div style={{ 
            padding: '1.25rem', 
            flex: 1, 
            overflowY: 'auto', 
            fontFamily: 'var(--font-family-code)', 
            whiteSpace: 'pre-wrap', 
            color: '#a3be8c',
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}>
            {output ? (
              <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>{output}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#334155', gap: '1rem' }}>
                <Terminal size={48} strokeWidth={1} />
                <span>Run your code to see the output here...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
