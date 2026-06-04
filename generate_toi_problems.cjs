const fs = require('fs');
const path = require('path');

const toiProblems = [
  {
    id: "TOI01_nugget",
    title: "TOI 1: Nugget Number",
    diff: "Medium",
    lang: "All Languages",
    description_th: `แมคโดนัลด์ขายนักเก็ตไก่ในกล่องขนาด 6, 9, และ 20 ชิ้น\nจงหาจำนวนนักเก็ตทั้งหมดที่สามารถซื้อได้พอดี โดยที่จำนวนนั้นต้องไม่เกิน N\n\nข้อมูลนำเข้า:\nบรรทัดแรก: จำนวนเต็ม N (1 <= N <= 100)\n\nข้อมูลส่งออก:\nพิมพ์จำนวนนักเก็ตที่เป็นไปได้ทั้งหมดเรียงจากน้อยไปมาก (บรรทัดละ 1 จำนวน)\nถ้าไม่มีให้พิมพ์ "no"`,
    description_en: `McDonalds sells chicken nuggets in boxes of 6, 9, and 20 pieces.\nFind all possible exact quantities of nuggets you can buy that are less than or equal to N.\n\nInput:\nAn integer N (1 <= N <= 100)\n\nOutput:\nPrint all possible quantities in ascending order (one per line).\nIf none, print "no".`,
    hint_th: `ลองใช้ Dynamic Programming หรือ Recursion ในการหาค่าที่เป็นไปได้`,
    hint_en: `Try using Dynamic Programming or Recursion.`,
    testcases: [
      { input: "15\n", expected: "6\n9\n12\n15" },
      { input: "5\n", expected: "no" }
    ]
  },
  {
    id: "TOI01_pattern",
    title: "TOI 1: Pattern",
    diff: "Easy",
    lang: "All Languages",
    description_th: `จงเขียนโปรแกรมเพื่อสร้างลวดลาย (Pattern) ตามขนาด N ที่กำหนดให้ โดยใช้ตัวอักษร 'o' และ 'x'\n\nข้อมูลนำเข้า:\nบรรทัดแรก: จำนวนเต็ม N (1 <= N <= 50)\n\nข้อมูลส่งออก:\nลวดลายตารางขนาด N x N โดยที่สลับ 'o' และ 'x'`,
    description_en: `Write a program to print a pattern of size N using 'o' and 'x'.\n\nInput:\nAn integer N (1 <= N <= 50)\n\nOutput:\nA pattern of size N x N alternating 'o' and 'x'.`,
    hint_th: `ใช้ Loop ซ้อน Loop (Nested Loop)`,
    hint_en: `Use a nested loop.`,
    testcases: [
      { input: "3\n", expected: "oxo\nxox\noxo" },
      { input: "2\n", expected: "ox\nxo" }
    ]
  },
  {
    id: "TOI01_brick",
    title: "TOI 1: Brick",
    diff: "Hard",
    lang: "All Languages",
    description_th: `เกม Tetris แบบง่าย มีกำแพงขนาด N x M และมีอิฐตกลงมาจากด้านบนในแต่ละคอลัมน์\nจงหาว่าสถานะสุดท้ายของกำแพงจะเป็นอย่างไร\n\nข้อมูลนำเข้า:\nบรรทัดแรก N M\nตามด้วยตาราง N x M ('O' คือว่าง, '#' คือสิ่งกีดขวาง)\nบรรทัดสุดท้าย: จำนวนอิฐที่ตกในแต่ละคอลัมน์\n\nข้อมูลส่งออก:\nตาราง N x M หลังอิฐตกเสร็จ`,
    description_en: `Simplified Tetris. Find the final state of the board after bricks fall.\n\nInput: N M, then the board, then bricks per column.\nOutput: Final board.`,
    hint_th: `ใช้ Array 2 มิติและไล่เช็คจากล่างขึ้นบน`,
    hint_en: `Use a 2D array and check from bottom to top.`,
    testcases: [
      { input: "3 3\nO O O\nO # O\nO O O\n1 1 1\n", expected: "O O O\nO # O\n# O #" }
    ]
  }
];

const mathProblems = [
  {
    id: 'QUIZ_SET_01',
    title: 'แบบฝึกหัด: แผนภาพเวนน์-ออยเลอร์',
    type: 'quiz',
    diff: 'Medium',
    description_th: 'นักเรียนห้องหนึ่งมี 50 คน ชอบวิชาคณิตศาสตร์ 30 คน ชอบวิชาภาษาอังกฤษ 25 คน และชอบทั้งสองวิชา 10 คน ถามว่ามีนักเรียนกี่คนที่ไม่ชอบทั้งสองวิชานี้เลย?',
    answer: '5'
  },
  {
    id: 'QUIZ_SET_02',
    title: 'แบบฝึกหัด: การหาสับเซต',
    type: 'quiz',
    diff: 'Easy',
    description_th: 'กำหนดให้เซต A = {a, b, c, d} จงหาว่าเซต A มีสับเซตแท้ (Proper Subset) ทั้งหมดกี่เซต?',
    answer: '15'
  },
  {
    id: 'QUIZ_SET_03',
    title: 'แบบฝึกหัด: จำนวนสมาชิกของเพาเวอร์เซต',
    type: 'quiz',
    diff: 'Hard',
    description_th: 'ถ้าเซต B มีจำนวนสับเซตทั้งหมด 64 เซต แล้วจำนวนสมาชิกของ P(B) หรือเพาเวอร์เซตของ B จะมีกี่เซต?',
    answer: '64'
  },
  {
    id: 'QUIZ_LOGIC_01',
    title: 'แบบฝึกหัด: ค่าความจริงของประพจน์',
    type: 'quiz',
    diff: 'Medium',
    description_th: 'กำหนดให้ p เป็นจริง, q เป็นเท็จ, r เป็นจริง จงหาค่าความจริงของประพจน์ (p -> q) OR (p AND r) (ตอบ True หรือ False)',
    answer: 'True'
  },
  {
    id: 'QUIZ_LOGIC_02',
    title: 'แบบฝึกหัด: สมมูลของประพจน์',
    type: 'quiz',
    diff: 'Hard',
    description_th: 'ประพจน์ p -> q สมมูลกับประพจน์ใดต่อไปนี้? (ตอบเป็นตัวเลข)\n1. NOT p AND q\n2. NOT p OR q\n3. p OR NOT q\n4. NOT q -> p',
    answer: '2'
  },
  {
    id: 'QUIZ_NUM_01',
    title: 'แบบฝึกหัด: ห.ร.ม. และ ค.ร.น.',
    type: 'quiz',
    diff: 'Medium',
    description_th: 'ผลคูณของตัวเลขสองจำนวนเท่ากับ 1200 และ ห.ร.ม. ของตัวเลขทั้งสองคือ 10 จงหา ค.ร.น. ของตัวเลขทั้งสองจำนวนนี้',
    answer: '120'
  },
  {
    id: 'QUIZ_NUM_02',
    title: 'แบบฝึกหัด: ทฤษฎีบทเศษเหลือ',
    type: 'quiz',
    diff: 'Hard',
    description_th: 'จงหาเศษจากการหาร 2^100 ด้วย 7',
    answer: '2'
  },
  {
    id: 'QUIZ_NUM_03',
    title: 'แบบฝึกหัด: การหารลงตัว',
    type: 'quiz',
    diff: 'Easy',
    description_th: 'จงหาผลรวมของจำนวนเต็มบวกทั้งหมดที่หาร 12 ลงตัว',
    answer: '28'
  },
  {
    id: 'QUIZ_FUNC_01',
    title: 'แบบฝึกหัด: การหาค่าโดเมน',
    type: 'quiz',
    diff: 'Medium',
    description_th: 'กำหนดให้ f(x) = 1 / (x - 5) ค่าของ x ที่ทำให้ฟังก์ชันนี้หาค่าไม่ได้ (ไม่อยู่ในโดเมน) คือค่าใด?',
    answer: '5'
  },
  {
    id: 'QUIZ_FUNC_02',
    title: 'แบบฝึกหัด: ฟังก์ชันประกอบ (Composite Function)',
    type: 'quiz',
    diff: 'Hard',
    description_th: 'กำหนดให้ f(x) = 2x + 1 และ g(x) = x^2 จงหาค่าของ f(g(3))',
    answer: '19'
  }
];

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
    lang: "All Languages",
    description_th,
    description_en,
    hint_th,
    hint_en,
    testcases: [
      { input: "1 2\n", expected: "3" },
      { input: "10 20\n", expected: "30" }
    ]
  };
};

const problems = [...toiProblems, ...mathProblems];

// Add random problems to make it 2000 total
const targetCount = 2000 - problems.length;
for (let i = 1; i <= targetCount; i++) {
  problems.push(generateProblem(i));
}

const fileContent = 'export const problemsData = ' + JSON.stringify(problems, null, 2) + ';\n';
const outputPath = path.join(__dirname, 'src', 'data', 'problems.js');

// Save explicitly in UTF-8
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully generated ${problems.length} problems (Including TOI and Math problems) in ${outputPath}`);
