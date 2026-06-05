import React, { useState, useEffect, useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Play, Loader2, Code2, Terminal as TerminalIcon, Settings, ChevronDown, Upload, Square } from 'lucide-react';
import { setupAutocomplete } from '../utils/autocomplete';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { io } from 'socket.io-client';
import '@xterm/xterm/css/xterm.css';

const DEFAULT_CODE = {
  python: 'print("Hello, CodeMastery from Pyodide!")',
  javascript: 'console.log("Hello, World!");',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  'c++': '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\n    cout << "Hello world!" << endl;\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
};

export default function Codebox() {
  const [language, setLanguage] = useState('c++');
  const [code, setCode] = useState(DEFAULT_CODE['c++']);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const errorDecorationsRef = useRef(null);
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const socketRef = useRef(null);
  const currentLineRef = useRef('');
  const isFinishedRef = useRef(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      setCode(evt.target.result);
      const ext = file.name.split('.').pop().toLowerCase();
      const extMap = { 'py': 'python', 'js': 'javascript', 'c': 'c', 'cpp': 'c++', 'java': 'java' };
      if (extMap[ext]) {
        setLanguage(extMap[ext]);
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset
  };

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
    // Initialize XTerm
    const term = new XTerminal({
      theme: { background: '#0a0a0a', foreground: '#a3be8c', cursor: '#a3be8c' },
      fontFamily: 'var(--font-family-code)',
      fontSize: 14,
      cursorBlink: true,
      disableStdin: true
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = term;

    term.writeln('\x1b[32mWelcome to CodeMastery Interactive Terminal!\x1b[0m');
    term.writeln('Select a language and click "Run Code" to start.\r\n');

    // Initialize Socket.io
    // If running in Vite dev server (port 5173), connect to localhost:3001
    // Otherwise, connect to the same host (for localtunnel/ngrok)
    const socketUrl = window.location.port === '5173' ? 'http://localhost:3001' : window.location.origin;
    const socket = io(socketUrl);
    socketRef.current = socket;

    socket.on('output', (data) => {
      term.write(data);
    });

    socket.on('exit', () => {
      setIsLoading(false);
      isFinishedRef.current = true;
    });

    // Handle user input in terminal
    term.onData((data) => {
      if (term.options.disableStdin) return;
      
      if (isFinishedRef.current) {
        // "Press any key to continue" behavior
        setShowTerminal(false);
        return;
      }

      if (data === '\r') { // Enter
        socket.emit('input', currentLineRef.current + '\n');
        term.write('\r\n');
        currentLineRef.current = '';
      } else if (data === '\x7f') { // Backspace
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write('\b \b');
        }
      } else { // Normal character
        currentLineRef.current += data;
        term.write(data);
      }
    });

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      socket.disconnect();
      term.dispose();
      resizeObserver.disconnect();
    };
  }, []);

  const handleEditorWillMount = (monaco) => {
    // Only register autocomplete once
    if (!monaco.languages.getLanguages().some(lang => lang.id === 'cpp_custom_loaded')) {
      setupAutocomplete(monaco);
      monaco.languages.register({ id: 'cpp_custom_loaded' });
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    errorDecorationsRef.current = editor.createDecorationsCollection([]);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(DEFAULT_CODE[newLang]);
    
    // Clear markers on language change
    if (editorRef.current && monacoRef.current) {
      monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), "python", []);
      if (errorDecorationsRef.current) errorDecorationsRef.current.set([]);
    }
  };

  const handleRunCode = () => {
    setIsLoading(true);
    setShowTerminal(true);
    isFinishedRef.current = false;
    currentLineRef.current = '';
    
    // Slight delay to allow terminal container to mount/resize before clearing
    setTimeout(() => {
      if (xtermRef.current) {
        xtermRef.current.reset();
        xtermRef.current.options.disableStdin = false;
      }
    }, 100);
    
    // Clear previous error markers
    if (editorRef.current && monacoRef.current) {
      monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), "python", []);
      if (errorDecorationsRef.current) errorDecorationsRef.current.set([]);
    }

    socketRef.current.emit('run_code', { code, language });
  };

  const handleStopCode = () => {
    if (socketRef.current) {
      socketRef.current.emit('kill');
    }
  };

  const languageLabels = {
    'python': 'Python',
    'javascript': 'JavaScript',
    'c': 'C',
    'c++': 'C++',
    'java': 'Java'
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
          <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem' }}>Interactive Terminal</h2>
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
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
              accept=".py,.js,.c,.cpp,.java,.txt"
            />
            <button 
              className="btn btn-secondary" 
              onClick={() => fileInputRef.current?.click()} 
              style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--color-text-main)', transition: 'all 0.2s ease-in-out' }}
              title="Upload Code File"
            >
              <Upload size={18} /> <span style={{ fontWeight: '500' }}>Upload</span>
            </button>
            {isLoading ? (
              <button 
                className="btn" 
                onClick={handleStopCode} 
                style={{ 
                  padding: '0.6rem 1.5rem', 
                  backgroundColor: 'var(--color-error)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--border-radius-md)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Square size={16} fill="currentColor" />
                <span style={{ fontWeight: '600' }}>Stop</span>
              </button>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={handleRunCode} 
                style={{ 
                  padding: '0.6rem 1.5rem', 
                  boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.39)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Play size={18} fill="currentColor" />
                <span style={{ fontWeight: '600' }}>Run Code</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflow: 'hidden' }}>
        {/* Editor Section */}
        <div style={{ 
          flex: showTerminal ? 1 : 2, 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 'var(--border-radius-lg)', 
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          backgroundColor: '#1e1e1e', // Monaco dark background
          boxShadow: 'var(--shadow-lg)',
          transition: 'flex 0.3s ease-in-out'
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
            onMount={handleEditorDidMount}
            onChange={(value) => {
              setCode(value);
              // Clear markers when user types
              if (editorRef.current && monacoRef.current) {
                monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), "python", []);
                if (errorDecorationsRef.current) errorDecorationsRef.current.set([]);
              }
            }}
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

        {/* Bottom Panel: Terminal */}
        <div style={{ 
          flex: showTerminal ? 1 : 0, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          height: showTerminal ? 'auto' : '0px',
          opacity: showTerminal ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out'
        }}>
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
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TerminalIcon size={16} color="#94a3b8" />
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Terminal
                </span>
              </div>
              <button 
                onClick={() => setShowTerminal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: '0.25rem' }}
              >
                <Square size={14} />
              </button>
            </div>
            <div 
              ref={terminalRef} 
              style={{ flex: 1, padding: '1rem', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
