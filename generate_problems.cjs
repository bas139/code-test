const fs = require('fs');
const path = require('path');

const difficulties = ['Easy', 'Medium', 'Hard'];

const topics = {
  'Easy': ['Math', 'String', 'Array', 'Loop', 'Condition', 'Logic', 'Simulation', 'Number', 'Pattern'],
  'Medium': ['Sorting', 'Searching', 'Greedy', 'Two Pointers', 'Stack', 'Queue', 'HashMap', 'Math', 'Bitwise'],
  'Hard': ['Dynamic Programming', 'Graph', 'Tree', 'DFS', 'BFS', 'Segment Tree', 'Backtracking', 'Math']
};

const prefixes = {
  'Easy': ['Basic', 'Intro to', 'Simple', 'Beginner', 'Fundamentals of'],
  'Medium': ['Intermediate', 'Advanced', 'Applying', 'Exploring', 'Mastering'],
  'Hard': ['Expert', 'Complex', 'Challenging', 'Ultimate', 'Extreme']
};

const generateProblem = (index) => {
  const diff = difficulties[Math.floor(Math.random() * difficulties.length)];
  const topic = topics[diff][Math.floor(Math.random() * topics[diff].length)];
  const prefix = prefixes[diff][Math.floor(Math.random() * prefixes[diff].length)];
  
  // Format: "Topic - Prefix Challenge" or "Prefix Topic I/II/III"
  // Let's use a consistent format: "[Topic] - Problem [Index]"
  // Actually, to make it sound coherent:
  const title = `${prefix} ${topic} #${index}`;
  
  let description_th = '';
  let description_en = '';
  let hint_th = '';
  let hint_en = '';
  
  if (diff === 'Easy') {
    description_th = `โจทย์ปัญหาพื้นฐานเกี่ยวกับ ${topic} ให้คุณเขียนโปรแกรมเพื่อแก้ไขปัญหานี้`;
    description_en = `A fundamental problem about ${topic}. Write a program to solve it.`;
    hint_th = `ลองใช้ความรู้พื้นฐานเรื่อง ${topic} ดูครับ`;
    hint_en = `Try using basic concepts of ${topic}.`;
  } else if (diff === 'Medium') {
    description_th = `โจทย์ระดับกลางที่ต้องใช้ทักษะด้าน ${topic} ในการออกแบบอัลกอริทึมให้มีประสิทธิภาพ`;
    description_en = `A medium-level problem requiring ${topic} skills to design an efficient algorithm.`;
    hint_th = `พิจารณา Time Complexity ให้ดี ลองคิดแบบ ${topic}`;
    hint_en = `Consider Time Complexity carefully. Think in terms of ${topic}.`;
  } else {
    description_th = `โจทย์ขั้นสูงที่ท้าทายความสามารถของคุณในเรื่อง ${topic} อย่างเต็มที่`;
    description_en = `An advanced problem that fully challenges your skills in ${topic}.`;
    hint_th = `โจทย์ข้อนี้อาจจะต้องประยุกต์ใช้หลายเทคนิคร่วมกับ ${topic}`;
    hint_en = `This problem might require combining multiple techniques with ${topic}.`;
  }

  const id = String(index).padStart(4, '0');

  return {
    id,
    title,
    diff,
    lang: 'C, C++, Python, Java',
    description_th: `โจทย์ข้อที่ ${index}: ${title}\\n\\n${description_th}\\n\\nข้อมูลนำเข้า:\\nค่าตัวเลขจาก Standard Input\\n\\nข้อมูลส่งออก:\\nผลลัพธ์จากการคำนวณพิมพ์ออก Standard Output`,
    description_en: `Problem ${index}: ${title}\\n\\n${description_en}\\n\\nInput:\\nNumeric values from Standard Input\\n\\nOutput:\\nThe calculated result printed to Standard Output`,
    hint_th,
    hint_en,
    initialCode: {
      python: 'def solve():\\n    # Write your code here\\n    pass\\n\\nsolve()',
      javascript: 'function solve() {\\n    // Write your code here\\n}\\n\\nsolve();',
      c: '#include <stdio.h>\\n\\nint main() {\\n    // Write your code here\\n    return 0;\\n}',
      'c++': '#include <iostream>\\n\\nusing namespace std;\\n\\nint main() {\\n    // Write your code here\\n    return 0;\\n}',
      java: 'public class Main {\\n    public static void main(String[] args) {\\n        // Write your code here\\n    }\\n}'
    },
    testcases: [
      { input: '10 20', expected: '30' }
    ]
  };
};

const problems = [];

// Preserve the first 3 original problems
problems.push({
  id: '0000',
  title: 'A+B Problem',
  diff: 'Easy',
  lang: 'C, C++, Python, Java',
  description_th: 'จงเขียนโปรแกรมรับค่าจำนวนเต็ม 2 จำนวน และแสดงผลรวมของจำนวนทั้งสอง\\n\\nข้อมูลนำเข้า:\\nบรรทัดแรกประกอบด้วยจำนวนเต็ม a และ b (-10^9 <= a, b <= 10^9) คั่นด้วยช่องว่าง\\n\\nข้อมูลส่งออก:\\nผลรวมของ a และ b',
  description_en: 'Write a program that takes 2 integers and outputs their sum.\\n\\nInput:\\nA single line containing two integers a and b (-10^9 <= a, b <= 10^9) separated by a space.\\n\\nOutput:\\nThe sum of a and b.',
  hint_th: 'อ่านค่าอินพุตทั้งสองตัวแปลงเป็นตัวเลข แล้วนำมาบวกกัน',
  hint_en: 'Read both inputs, convert them to integers, and add them together.',
  initialCode: {
    python: 'import sys\\n\\n# Read space-separated integers\\na, b = map(int, sys.stdin.read().split())\\nprint(a + b)',
  },
  testcases: [
    { input: '10 20', expected: '30' }
  ]
});

problems.push({
  id: '0001',
  title: 'Min Max',
  diff: 'Easy',
  lang: 'C, C++, Python, Java',
  description_th: 'รับจำนวนเต็ม n จากนั้นรับจำนวนเต็มอีก n ตัว จงหาค่าที่น้อยที่สุดและมากที่สุด\\n\\nข้อมูลนำเข้า:\\nบรรทัดแรก: n (1 <= n <= 1000)\\nบรรทัดที่สองถึง n+1: จำนวนเต็มตัวละบรรทัด\\n\\nข้อมูลส่งออก:\\nค่าต่ำสุด และ ค่าสูงสุด คั่นด้วยเว้นวรรค',
  description_en: 'Take an integer n, followed by n integers. Find the minimum and maximum values.\\n\\nInput:\\nFirst line: n (1 <= n <= 1000)\\nNext n lines: One integer per line\\n\\nOutput:\\nThe minimum and maximum values separated by a space.',
  hint_th: 'เก็บค่าอินพุตไว้ใน list/array แล้วใช้ฟังก์ชัน min() และ max()',
  hint_en: 'Store the inputs in a list/array and use the min() and max() functions.',
  initialCode: {
    python: 'import sys\\n\\nlines = sys.stdin.read().split()\\nif len(lines) > 0:\\n    n = int(lines[0])\\n    nums = [int(x) for x in lines[1:n+1]]\\n    print(min(nums), max(nums))',
  },
  testcases: [
    { input: '5\\n10\\n-5\\n20\\n0\\n15', expected: '-5 20' }
  ]
});

for (let i = 2; i < 2000; i++) {
  problems.push(generateProblem(i));
}

const fileContent = 'export const problemsData = ' + JSON.stringify(problems, null, 2) + ';\n';
const outputPath = path.join(__dirname, 'src', 'data', 'problems.js');

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated 2000 problems in ' + outputPath);

