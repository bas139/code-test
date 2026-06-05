import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  Loader2,
  Sparkles,
  ArrowLeft,
  Globe,
  Settings,
  ChevronDown,
  Terminal,
  Upload,
  Square,
  CheckCircle,
  XCircle,
  RefreshCw,
  MessageSquare,
  PlayCircle,
  SkipForward,
} from "lucide-react";
import { defineMonacoTheme } from "../utils/monacoTheme";
import { problemsData } from "../data/problems";
import { setupAutocomplete } from "../utils/autocomplete";
import confetti from "canvas-confetti";
import { useUser } from "../contexts/UserContext";
import { Terminal as XTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { io } from "socket.io-client";
import "@xterm/xterm/css/xterm.css";

const BOILERPLATE_CODE = {
  python: "# Write your Python code here\n",
  javascript: "// Write your JavaScript code here\n",
  c: "#include <stdio.h>\n\nint main() {\n    // Write your C code here\n    return 0;\n}",
  "c++":
    "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    return 0;\n}",
  java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n    }\n}",
};

const languageLabels = {
  python: "Python",
  javascript: "JavaScript",
  c: "C",
  "c++": "C++",
  java: "Java",
};

export default function LessonView() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultLang = queryParams.get("lang") || "python";
  const { userData, addXP, markProblemSolved } = useUser();

  const [customProblems, setCustomProblems] = useState([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem("customProblems") || "[]");
    setCustomProblems(loaded);
  }, []);

  const allProblems = [...customProblems, ...problemsData];
  const problem =
    allProblems.find((p) => p.id === id) || allProblems[0] || problemsData[0];

  const [langPref, setLangPref] = useState("th"); // 'th' or 'en'
  const [language, setLanguage] = useState(
    () => localStorage.getItem(`langPref-${problem.id}`) || defaultLang,
  );
  const [code, setCode] = useState(() => {
    const savedLang =
      localStorage.getItem(`langPref-${problem.id}`) || defaultLang;
    return (
      localStorage.getItem(`code-${problem.id}-${savedLang}`) ||
      BOILERPLATE_CODE[savedLang] ||
      BOILERPLATE_CODE["python"]
    );
  });
  const [customInput, setCustomInput] = useState(
    problem?.testcases?.[0]?.input || "",
  );
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showTestResults, setShowTestResults] = useState(false);
  const [aiHint, setAiHint] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const errorDecorationsRef = useRef(null);
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const socketRef = useRef(null);
  const currentLineRef = useRef("");
  const isFinishedRef = useRef(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      setCode(evt.target.result);
      // Auto-switch language based on extension if recognized
      const ext = file.name.split(".").pop().toLowerCase();
      const extMap = {
        py: "python",
        js: "javascript",
        c: "c",
        cpp: "c++",
        java: "java",
      };
      if (extMap[ext]) {
        setLanguage(extMap[ext]);
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset
  };

  useEffect(() => {
    setCustomInput(problem?.testcases?.[0]?.input || "");
    setOutput("");
    setShowHint(false);

    const savedLang =
      localStorage.getItem(`langPref-${problem.id}`) || defaultLang;
    setLanguage(savedLang);
    setCode(
      localStorage.getItem(`code-${problem.id}-${savedLang}`) ||
        BOILERPLATE_CODE[savedLang] ||
        BOILERPLATE_CODE["python"],
    );
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

  // Xterm Initialization
  useEffect(() => {
    const term = new XTerminal({
      theme: {
        background: "#0a0a0a",
        foreground: "#a3be8c",
        cursor: "#a3be8c",
      },
      fontFamily: "var(--font-family-code)",
      fontSize: 14,
      cursorBlink: true,
      disableStdin: true,
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    xtermRef.current = term;

    const socketUrl =
      window.location.port === "5173"
        ? "http://localhost:3001"
        : window.location.origin;
    const socket = io(socketUrl);
    socketRef.current = socket;

    socket.on("output", (data) => {
      term.write(data);
    });

    socket.on("exit_info", ({ code, codeHex, timeTaken }) => {
      if (xtermRef.current) {
        // If the cursor is not at the beginning of the line, add a newline
        if (xtermRef.current.buffer.active.cursorX > 0) {
          xtermRef.current.writeln("");
        }
        xtermRef.current.writeln(
          `\x1b[33mProcess returned ${code} (0x${codeHex})   execution time : ${timeTaken} s\x1b[0m`,
        );
        xtermRef.current.writeln("\x1b[33mPress any key to continue.\x1b[0m");
      }
    });

    socket.on("exit", () => {
      setIsLoading(false);
      isFinishedRef.current = true;
    });

    term.onData((data) => {
      if (term.options.disableStdin) return;

      if (isFinishedRef.current) {
        setShowTerminal(false);
        return;
      }

      if (data === "\r") {
        // Enter
        socket.emit("input", currentLineRef.current + "\n");
        term.write("\r\n");
        currentLineRef.current = "";
      } else if (data === "\x7f") {
        // Backspace
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write("\b \b");
        }
      } else {
        // Normal character
        currentLineRef.current += data;
        term.write(data);
      }
    });

    return () => {
      socket.disconnect();
      term.dispose();
    };
  }, []);

  useEffect(() => {
    if (showTerminal && terminalRef.current && xtermRef.current) {
      if (!terminalRef.current.hasChildNodes()) {
        xtermRef.current.open(terminalRef.current);
      }
    }
  }, [showTerminal]);

  const handleEditorWillMount = (monaco) => {
    defineMonacoTheme(monaco);
    // Only register autocomplete once
    if (
      !monaco.languages
        .getLanguages()
        .some((lang) => lang.id === "cpp_custom_loaded")
    ) {
      setupAutocomplete(monaco);
      monaco.languages.register({ id: "cpp_custom_loaded" });
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    errorDecorationsRef.current = editor.createDecorationsCollection([]);
  };

  const parsePythonError = (errorStr) => {
    if (!errorStr.includes("PythonError:")) return null;

    // Look for: File "<exec>", line X
    const execLineMatch = errorStr.match(/File "<exec>", line (\d+)/);
    if (!execLineMatch) return null;

    const lineNumber = parseInt(execLineMatch[1], 10);

    // The last line usually contains the actual error type and message
    const lines = errorStr.trim().split("\n");
    const errorMessage = lines[lines.length - 1];

    return { lineNumber, errorMessage };
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(
      localStorage.getItem(`code-${problem.id}-${newLang}`) ||
        BOILERPLATE_CODE[newLang],
    );

    // Clear markers on language change
    if (editorRef.current && monacoRef.current) {
      monacoRef.current.editor.setModelMarkers(
        editorRef.current.getModel(),
        "python",
        [],
      );
      if (errorDecorationsRef.current) errorDecorationsRef.current.set([]);
    }
  };

  const executeCode = async (inputStr) => {
    if (language === "python" && pyodideRef.current) {
      let stdout = [];
      let inputLines = inputStr.split("\n");
      let inputPointer = 0;

      pyodideRef.current.setStdout({ batched: (msg) => stdout.push(msg) });
      pyodideRef.current.setStdin({
        stdin: () => {
          if (inputPointer < inputLines.length) {
            return inputLines[inputPointer++];
          }
          return null;
        },
      });

      await pyodideRef.current.runPythonAsync(code);
      return stdout.join("\n").trim();
    } else if (language === "javascript") {
      let logOutput = [];
      let inputLines = inputStr.split("\n");
      let inputPointer = 0;

      const originalConsoleLog = console.log;
      const originalPrompt = window.prompt;

      console.log = (...args) => logOutput.push(args.join(" "));
      window.prompt = () => {
        if (inputPointer < inputLines.length) {
          return inputLines[inputPointer++];
        }
        return null;
      };

      try {
        // eslint-disable-next-line no-new-func
        new Function(code)();
      } finally {
        console.log = originalConsoleLog;
        window.prompt = originalPrompt;
      }
      return logOutput.join("\n").trim();
    } else if (["c", "c++", "java"].includes(language)) {
      const wandboxCompilers = {
        c: "gcc-head-c",
        "c++": "gcc-head",
        java: "openjdk-jdk-22+36",
      };
      const response = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          code: code,
          compiler: wandboxCompilers[language],
          stdin: inputStr,
        }),
      });

      const data = await response.json();
      if (data.status === "0") {
        return (data.program_output || "").trim();
      } else {
        throw new Error(
          data.compiler_error || data.program_error || "Error executing code.",
        );
      }
    } else {
      throw new Error("Language not supported for execution yet.");
    }
  };

  const handleRunCode = () => {
    setIsLoading(true);
    setShowTerminal(true);
    setShowTestResults(false);
    isFinishedRef.current = false;
    currentLineRef.current = "";

    setTimeout(() => {
      if (xtermRef.current) {
        xtermRef.current.reset();
        xtermRef.current.options.disableStdin = false;
      }
    }, 100);

    if (editorRef.current && monacoRef.current) {
      monacoRef.current.editor.setModelMarkers(
        editorRef.current.getModel(),
        "python",
        [],
      );
      if (errorDecorationsRef.current) errorDecorationsRef.current.set([]);
    }

    socketRef.current.emit("run_code", { code, language });
  };

  const handleStopCode = () => {
    if (socketRef.current) {
      socketRef.current.emit("kill");
    }
  };

  const handleGetAiHint = async () => {
    setIsAiLoading(true);
    setAiError("");
    setAiHint("");
    setShowHint(true);
    try {
      const apiUrl =
        window.location.port === "5173"
          ? "http://localhost:3001/api/ai-hint"
          : `${window.location.origin}/api/ai-hint`;

      let errorContext = "";
      if (
        testResults &&
        testResults.status !== "accepted" &&
        testResults.details
      ) {
        const failed = testResults.details.find((d) => !d.passed);
        if (failed) {
          errorContext = `Failed Testcase ${failed.index}:\nInput: ${failed.input}\nExpected: ${failed.expected}\nActual: ${failed.actual}`;
        }
      }
      if (testResults && testResults.error) {
        errorContext = testResults.error;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          problem_description: problem.description_th || problem.description_en,
          error_message: errorContext,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get AI hint");

      setAiHint(data.hint);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    setShowTestResults(true);
    setShowTerminal(false);
    isFinishedRef.current = true;

    setTestResults({
      status: "running",
      passed: 0,
      total: problem?.testcases?.length || 0,
      details: [],
    });

    if (editorRef.current && monacoRef.current) {
      monacoRef.current.editor.setModelMarkers(
        editorRef.current.getModel(),
        "python",
        [],
      );
      if (errorDecorationsRef.current) errorDecorationsRef.current.set([]);
    }

    try {
      if (!problem?.testcases?.length) {
        setTestResults({
          status: "error",
          error: "No testcases found for this problem.",
        });
        setIsLoading(false);
        return;
      }

      let passedCount = 0;
      const totalCases = problem.testcases.length;
      const details = [];

      const apiUrl =
        window.location.port === "5173"
          ? "http://localhost:3001/api/execute"
          : `${window.location.origin}/api/execute`;

      for (let i = 0; i < totalCases; i++) {
        const tc = problem.testcases[i];

        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code,
              language,
              input: tc.input || "",
              timeout: 5000,
            }),
          });

          if (!response.ok) {
            throw new Error("Server error during execution");
          }

          const result = await response.json();

          if (result.error || result.stderr) {
            const errStr = result.error || result.stderr;
            details.push({
              index: i + 1,
              passed: false,
              input: tc.input,
              expected: tc.expected,
              actual: errStr,
              error: true,
              time: result.executionTime,
            });
            setTestResults({
              status: "running",
              passed: passedCount,
              total: totalCases,
              details: [...details],
            });
            continue;
          }

          const normalize = (str) =>
            String(str)
              .split("\n")
              .map((l) => l.trimEnd())
              .join("\n")
              .trimEnd();
          const isPassed = normalize(result.stdout) === normalize(tc.expected);

          if (isPassed) passedCount++;

          details.push({
            index: i + 1,
            passed: isPassed,
            input: tc.input,
            expected: tc.expected,
            actual: result.stdout,
            time: result.executionTime,
          });
        } catch (err) {
          details.push({
            index: i + 1,
            passed: false,
            input: tc.input,
            expected: tc.expected,
            actual: err.message,
            error: true,
          });
        }

        setTestResults({
          status: "running",
          passed: passedCount,
          total: totalCases,
          details: [...details],
        });
      }

      const allPassed = passedCount === totalCases;
      setTestResults({
        status: allPassed ? "accepted" : "rejected",
        passed: passedCount,
        total: totalCases,
        details,
      });

      if (allPassed) {
        if (!userData.solvedProblems.includes(problem.id)) {
          markProblemSolved(problem.id);
          addXP(25);
        }

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f97316", "#8b5cf6", "#3b82f6", "#22c55e"],
        });
      }
    } catch (error) {
      setTestResults({ status: "error", error: error.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
      }}
    >
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to="/"
            style={{
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft size={20} /> Back
          </Link>
          <h2 className="text-gradient" style={{ margin: 0 }}>
            {problem.title}
          </h2>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => setLangPref(langPref === "th" ? "en" : "th")}
          style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem" }}
        >
          <Globe size={16} />{" "}
          {langPref === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
        </button>
      </div>

      <div
        style={{ display: "flex", gap: "1.5rem", flex: 1, overflow: "hidden" }}
      >
        {/* Left Panel: Instructions */}
        <div
          className="card"
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                marginBottom: "1rem",
                color: "var(--color-primary-light)",
              }}
            >
              {langPref === "th" ? "คำอธิบายโจทย์" : "Instructions"}
            </h3>
            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
                color: "var(--color-text-main)",
              }}
            >
              {langPref === "th"
                ? problem.description_th.replace(/\\n/g, "\n")
                : problem.description_en.replace(/\\n/g, "\n")}
            </div>

            {/* Examples Section */}
            {problem.testcases && problem.testcases.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h4
                  style={{
                    color: "var(--color-text-main)",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  {langPref === "th" ? "ตัวอย่าง (Examples)" : "Examples"}
                </h4>
                {problem.testcases.slice(0, 2).map((tc, idx) => (
                  <div key={idx} style={{ marginBottom: "1.5rem" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        color: "var(--color-text-muted)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {langPref === "th"
                        ? `ตัวอย่างที่ ${idx + 1}`
                        : `Example ${idx + 1}`}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "var(--color-bg-base)",
                          padding: "1rem",
                          borderRadius: "var(--border-radius-md)",
                          border: "1px solid var(--border-color)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-muted)",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          Input
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-family-code)",
                            whiteSpace: "pre-wrap",
                            color: "var(--color-text-main)",
                          }}
                        >
                          {tc.input}
                        </pre>
                      </div>
                      <div
                        style={{
                          backgroundColor: "var(--color-bg-base)",
                          padding: "1rem",
                          borderRadius: "var(--border-radius-md)",
                          border: "1px solid var(--border-color)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-muted)",
                            marginBottom: "0.5rem",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
                          Output
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-family-code)",
                            whiteSpace: "pre-wrap",
                            color: "var(--color-text-main)",
                          }}
                        >
                          {tc.expected}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <div
              style={{
                padding: "1rem",
                backgroundColor: "var(--color-bg-surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--border-radius-md)",
              }}
            >
              {!showHint && (
                <button
                  className="btn btn-secondary"
                  onClick={handleGetAiHint}
                  style={{
                    width: "100%",
                    borderColor: "#8b5cf6",
                    color: "#8b5cf6",
                    background: "transparent",
                  }}
                >
                  <Sparkles size={18} />{" "}
                  {langPref === "th"
                    ? "ให้ AI ช่วยวิเคราะห์โค้ด"
                    : "Ask AI to Analyze Code"}
                </button>
              )}

              {showHint && (
                <div>
                  <h4
                    style={{
                      color: "#8b5cf6",
                      marginBottom: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Sparkles size={16} /> AI Tutor
                    </span>
                    <button
                      onClick={() => setShowHint(false)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-text-muted)",
                        cursor: "pointer",
                      }}
                    >
                      ปิด
                    </button>
                  </h4>

                  {isAiLoading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      <Loader2 size={16} className="spin" />{" "}
                      กำลังวิเคราะห์โค้ด...
                    </div>
                  ) : aiError ? (
                    <div style={{ color: "var(--color-error)" }}>
                      <p>เกิดข้อผิดพลาด: {aiError}</p>
                      <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                        * หากยังไม่มี GEMINI_API_KEY ให้ใส่ในไฟล์ backend/.env
                        ก่อนนะครับ
                      </p>
                      <button
                        onClick={handleGetAiHint}
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.2rem 0.5rem",
                          background: "transparent",
                          border: "1px solid var(--color-error)",
                          color: "var(--color-error)",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        ลองใหม่
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-main)",
                        lineHeight: "1.5",
                      }}
                    >
                      {aiHint.split("\n").map((line, i) => (
                        <p key={i} style={{ marginBottom: "0.5rem" }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Editor and Output */}
        <div
          style={{
            flex: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              flex: showTerminal || showTestResults ? 1 : 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: "var(--border-radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              backgroundColor: "#1e1e1e", // Monaco dark background
              boxShadow: "var(--shadow-lg)",
              transition: "flex 0.3s ease-in-out",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#ff5f56",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#ffbd2e",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#27c93f",
                  }}
                />

                {/* Language Dropdown added here! */}
                <div
                  ref={dropdownRef}
                  style={{ position: "relative", marginLeft: "0.5rem" }}
                >
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      cursor: "pointer",
                      userSelect: "none",
                      color: "#858585",
                      fontFamily: "var(--font-family-base)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span>{languageLabels[language]}</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.2s",
                        transform: isDropdownOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </div>

                  {isDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 0.5rem)",
                        left: 0,
                        width: "max-content",
                        backgroundColor: "var(--color-bg-surface)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--border-radius-md)",
                        boxShadow: "var(--shadow-lg)",
                        zIndex: 10,
                        overflow: "hidden",
                      }}
                    >
                      {Object.entries(languageLabels).map(([key, label]) => (
                        <div
                          key={key}
                          onClick={() => {
                            handleLanguageChange({ target: { value: key } });
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                            color:
                              language === key
                                ? "var(--color-primary)"
                                : "var(--color-text-main)",
                            backgroundColor:
                              language === key
                                ? "rgba(249, 115, 22, 0.1)"
                                : "transparent",
                            fontSize: "0.85rem",
                            fontFamily: "var(--font-family-base)",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            if (language !== key)
                              e.currentTarget.style.backgroundColor =
                                "var(--color-bg-surface-hover)";
                          }}
                          onMouseLeave={(e) => {
                            if (language !== key)
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                          }}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  accept=".py,.js,.c,.cpp,.java,.txt"
                />
                <button
                  className="btn btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.9rem",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border-color)",
                    color: "var(--color-text-main)",
                    transition: "all 0.2s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  title="Upload Code File"
                >
                  <Upload size={16} /> Upload
                </button>

                {isLoading ? (
                  <button
                    className="btn"
                    onClick={handleStopCode}
                    style={{
                      padding: "0.4rem 1rem",
                      fontSize: "0.9rem",
                      backgroundColor: "var(--color-error)",
                      color: "white",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <Square size={14} fill="currentColor" /> Stop
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={handleRunCode}
                    style={{
                      padding: "0.4rem 1rem",
                      fontSize: "0.9rem",
                      backgroundColor: "transparent",
                      border: "1px solid var(--border-color)",
                      color: "var(--color-text-main)",
                      transition: "all 0.2s ease-in-out",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <>
                      <Terminal size={14} fill="currentColor" /> Run
                    </>
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitCode}
                  disabled={isLoading}
                  style={{
                    padding: "0.4rem 1.2rem",
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 14px 0 rgba(249, 115, 22, 0.39)",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="spinner" size={16} /> Testing...
                    </>
                  ) : (
                    <>
                      <Play size={16} fill="currentColor" /> Submit
                    </>
                  )}
                </button>
              </div>
            </div>

            <Editor
              height="100%"
              language={language === "c++" ? "cpp" : language}
              theme="custom-dark"
              value={code}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
              onChange={(value) => {
                setCode(value);
                // Clear markers when user types
                if (editorRef.current && monacoRef.current) {
                  monacoRef.current.editor.setModelMarkers(
                    editorRef.current.getModel(),
                    "python",
                    [],
                  );
                  if (errorDecorationsRef.current)
                    errorDecorationsRef.current.set([]);
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: "var(--font-family-code)",
                padding: { top: 16 },
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                snippetSuggestions: "inline",
                lineHeight: 24,
                renderLineHighlight: "all",
                cursorBlinking: "smooth",
              }}
            />
          </div>

          {/* Test Results Panel */}
          <div
            style={{
              flex: showTestResults ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: showTestResults ? "auto" : "0px",
              opacity: showTestResults ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "var(--border-radius-lg)",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--color-bg-base)",
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "var(--color-bg-surface)",
                  borderBottom: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Play size={16} color="var(--color-primary)" />
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-main)",
                      fontWeight: "bold",
                    }}
                  >
                    Test Results
                  </span>
                  {testResults && testResults.status === "running" && (
                    <span
                      style={{
                        marginLeft: "1rem",
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Running {testResults.passed} / {testResults.total}...
                    </span>
                  )}
                  {testResults && testResults.status === "accepted" && (
                    <span
                      style={{
                        marginLeft: "1rem",
                        fontSize: "0.9rem",
                        color: "var(--color-success)",
                        fontWeight: "bold",
                      }}
                    >
                      Accepted! 🎉
                    </span>
                  )}
                  {testResults && testResults.status === "rejected" && (
                    <span
                      style={{
                        marginLeft: "1rem",
                        fontSize: "0.9rem",
                        color: "var(--color-error)",
                        fontWeight: "bold",
                      }}
                    >
                      Rejected ❌
                    </span>
                  )}
                  {testResults && testResults.status === "error" && (
                    <span
                      style={{
                        marginLeft: "1rem",
                        fontSize: "0.9rem",
                        color: "var(--color-error)",
                        fontWeight: "bold",
                      }}
                    >
                      Error
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowTestResults(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-muted)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0.25rem",
                  }}
                >
                  <Square size={14} />
                </button>
              </div>
              <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
                {testResults && testResults.error && (
                  <div style={{ color: "var(--color-error)" }}>
                    {testResults.error}
                  </div>
                )}
                {testResults && testResults.details && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {testResults.details.map((tc, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "1rem",
                          borderRadius: "var(--border-radius-md)",
                          border: `1px solid ${tc.passed ? "var(--color-success)" : "var(--color-error)"}`,
                          backgroundColor: tc.passed
                            ? "rgba(34, 197, 94, 0.05)"
                            : "rgba(239, 68, 68, 0.05)",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "bold",
                            marginBottom: "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {tc.passed ? (
                            <CheckCircle
                              size={16}
                              color="var(--color-success)"
                            />
                          ) : (
                            <XCircle size={16} color="var(--color-error)" />
                          )}
                          Testcase {tc.index}
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              Input
                            </div>
                            <pre
                              style={{
                                margin: 0,
                                padding: "0.5rem",
                                backgroundColor: "var(--color-bg-surface)",
                                borderRadius: "4px",
                                fontSize: "0.85rem",
                              }}
                            >
                              {tc.input || "(None)"}
                            </pre>
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              Expected
                            </div>
                            <pre
                              style={{
                                margin: 0,
                                padding: "0.5rem",
                                backgroundColor: "var(--color-bg-surface)",
                                borderRadius: "4px",
                                fontSize: "0.85rem",
                              }}
                            >
                              {tc.expected}
                            </pre>
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              Actual
                            </div>
                            <pre
                              style={{
                                margin: 0,
                                padding: "0.5rem",
                                backgroundColor: "var(--color-bg-surface)",
                                borderRadius: "4px",
                                fontSize: "0.85rem",
                                color: tc.error
                                  ? "var(--color-error)"
                                  : "inherit",
                              }}
                            >
                              {tc.actual}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Panel: Terminal */}
          <div
            style={{
              flex: showTerminal ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              height: showTerminal ? "auto" : "0px",
              opacity: showTerminal ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "var(--border-radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-color)",
                backgroundColor: "#0a0a0a",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Terminal size={16} color="#94a3b8" />
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#94a3b8",
                      fontWeight: "500",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Interactive Terminal
                  </span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    padding: "0.25rem",
                  }}
                >
                  <Square size={14} />
                </button>
              </div>
              <div
                ref={terminalRef}
                style={{
                  flex: 1,
                  padding: "1rem",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
