const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static frontend files from 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Setup temp directory
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const processes = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('run_code', async (data) => {
    const { code, language } = data;
    const sessionId = uuidv4();
    const sessionDir = path.join(tempDir, sessionId);
    fs.mkdirSync(sessionDir, { recursive: true });

    let processCmd = '';
    let processArgs = [];
    let isCompiled = false;
    let compileCmd = '';
    let compileArgs = [];

    const fileMap = {
      'c': 'main.c',
      'c++': 'main.cpp',
      'java': 'Main.java',
      'python': 'main.py',
      'javascript': 'main.js'
    };

    const fileName = fileMap[language] || 'main.txt';
    const filePath = path.join(sessionDir, fileName);
    fs.writeFileSync(filePath, code);

    // Setup compilation/execution commands
    if (language === 'c') {
      isCompiled = true;
      compileCmd = 'gcc';
      compileArgs = [filePath, '-o', path.join(sessionDir, 'main.exe')];
      processCmd = path.join(sessionDir, 'main.exe');
      processArgs = [];
    } else if (language === 'c++') {
      isCompiled = true;
      compileCmd = 'g++';
      compileArgs = [filePath, '-o', path.join(sessionDir, 'main.exe')];
      processCmd = path.join(sessionDir, 'main.exe');
      processArgs = [];
    } else if (language === 'java') {
      isCompiled = true;
      compileCmd = 'javac';
      compileArgs = [filePath];
      processCmd = 'java';
      processArgs = ['-cp', sessionDir, 'Main'];
    } else if (language === 'python') {
      processCmd = 'python';
      processArgs = [filePath];
    } else if (language === 'javascript') {
      processCmd = 'node';
      processArgs = [filePath];
    } else {
      socket.emit('output', `\r\nLanguage ${language} not supported.\r\n`);
      socket.emit('exit');
      return;
    }

    const runProcess = () => {
      const startTime = Date.now();
      const child = spawn(processCmd, processArgs, { cwd: sessionDir });
      processes.set(socket.id, child);

      child.stdout.on('data', (data) => {
        // Convert to string and handle newlines for terminal
        const output = data.toString().replace(/\n/g, '\r\n');
        socket.emit('output', output);
      });

      child.stderr.on('data', (data) => {
        const output = data.toString().replace(/\n/g, '\r\n');
        socket.emit('output', output);
      });

      child.on('close', (code) => {
        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(3);
        const codeHex = code !== null ? code.toString(16).toUpperCase() : '0';
        socket.emit('exit_info', { code, codeHex, timeTaken });
        socket.emit('exit');
        processes.delete(socket.id);
        
        // Clean up temp dir
        setTimeout(() => {
          fs.rm(sessionDir, { recursive: true, force: true }, () => {});
        }, 1000);
      });

      child.on('error', (err) => {
        socket.emit('output', `\r\n\x1b[31mFailed to start process: ${err.message}\x1b[0m\r\n`);
        socket.emit('exit');
      });
    };

    if (isCompiled) {
      const compiler = spawn(compileCmd, compileArgs, { cwd: sessionDir });
      let compileError = '';

      compiler.stderr.on('data', (data) => {
        compileError += data.toString().replace(/\n/g, '\r\n');
      });

      compiler.on('close', (code) => {
        if (code === 0) {
          runProcess();
        } else {
          socket.emit('output', `\x1b[31mCompilation failed:\x1b[0m\r\n${compileError}`);
          socket.emit('exit');
          setTimeout(() => {
            fs.rm(sessionDir, { recursive: true, force: true }, () => {});
          }, 1000);
        }
      });

      compiler.on('error', (err) => {
        socket.emit('output', `\x1b[31mFailed to start compiler: ${err.message}\x1b[0m\r\n`);
        socket.emit('exit');
        setTimeout(() => {
          fs.rm(sessionDir, { recursive: true, force: true }, () => {});
        }, 1000);
      });
    } else {
      runProcess();
    }
  });

  socket.on('input', (data) => {
    const child = processes.get(socket.id);
    if (child && !child.killed && child.stdin.writable) {
      // Write the received data to the process stdin
      child.stdin.write(data);
    }
  });
  
  // Handle Ctrl+C (SIGINT)
  socket.on('kill', () => {
     const child = processes.get(socket.id);
     if (child) {
         child.kill('SIGKILL');
         socket.emit('output', `\r\n\x1b[31m--- Process Terminated ---\x1b[0m\r\n`);
     }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    const child = processes.get(socket.id);
    if (child) {
      child.kill('SIGKILL');
      processes.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// REST API for Automated Testcase Execution
app.post('/api/execute', async (req, res) => {
  const { code, language, input = '', timeout = 5000 } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  const sessionId = uuidv4();
  const sessionDir = path.join(tempDir, sessionId);
  fs.mkdirSync(sessionDir, { recursive: true });

  const fileMap = {
    'c': 'main.c',
    'c++': 'main.cpp',
    'java': 'Main.java',
    'python': 'main.py',
    'javascript': 'main.js'
  };

  const fileName = fileMap[language] || 'main.txt';
  const filePath = path.join(sessionDir, fileName);
  fs.writeFileSync(filePath, code);

  let processCmd = '';
  let processArgs = [];
  let isCompiled = false;
  let compileCmd = '';
  let compileArgs = [];

  if (language === 'c') {
    isCompiled = true;
    compileCmd = 'gcc';
    compileArgs = [filePath, '-o', path.join(sessionDir, 'main.exe')];
    processCmd = path.join(sessionDir, 'main.exe');
  } else if (language === 'c++') {
    isCompiled = true;
    compileCmd = 'g++';
    compileArgs = [filePath, '-o', path.join(sessionDir, 'main.exe')];
    processCmd = path.join(sessionDir, 'main.exe');
  } else if (language === 'java') {
    isCompiled = true;
    compileCmd = 'javac';
    compileArgs = [filePath];
    processCmd = 'java';
    processArgs = ['-cp', sessionDir, 'Main'];
  } else if (language === 'python') {
    processCmd = 'python';
    processArgs = [filePath];
  } else if (language === 'javascript') {
    processCmd = 'node';
    processArgs = [filePath];
  } else {
    fs.rmSync(sessionDir, { recursive: true, force: true });
    return res.status(400).json({ error: `Language ${language} not supported` });
  }

  const runCode = () => {
    const startTime = Date.now();
    const child = spawn(processCmd, processArgs, { cwd: sessionDir });

    let stdout = '';
    let stderr = '';

    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      stderr += '\nError: Execution Timed Out (Possible Infinite Loop)';
    }, timeout);

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    if (input) {
      child.stdin.write(input);
      child.stdin.end();
    }

    child.on('close', (code) => {
      clearTimeout(timer);
      const executionTime = ((Date.now() - startTime) / 1000).toFixed(3);
      fs.rm(sessionDir, { recursive: true, force: true }, () => {});
      
      res.json({
        stdout: stdout.trimEnd(),
        stderr: stderr.trimEnd(),
        exitCode: code,
        executionTime
      });
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      fs.rm(sessionDir, { recursive: true, force: true }, () => {});
      res.status(500).json({ error: `Failed to start process: ${err.message}` });
    });
  };

  if (isCompiled) {
    const compiler = spawn(compileCmd, compileArgs, { cwd: sessionDir });
    let compileError = '';

    compiler.stderr.on('data', (data) => {
      compileError += data.toString();
    });

    compiler.on('close', (code) => {
      if (code === 0) {
        runCode();
      } else {
        fs.rm(sessionDir, { recursive: true, force: true }, () => {});
        res.json({
          stdout: '',
          stderr: `Compilation failed:\n${compileError}`,
          exitCode: code,
          executionTime: 0
        });
      }
    });

    compiler.on('error', (err) => {
      fs.rm(sessionDir, { recursive: true, force: true }, () => {});
      res.status(500).json({ error: `Failed to start compiler: ${err.message}` });
    });
  } else {
    runCode();
  }
});

// For any other routes, serve the React frontend index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
