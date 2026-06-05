export const problemsData = [
  {
    id: "TOI01_nugget",
    title: "TOI 1: Nugget Number",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      'แมคโดนัลด์ขายนักเก็ตไก่ในกล่องขนาด 6, 9, และ 20 ชิ้น\nจงหาจำนวนนักเก็ตทั้งหมดที่สามารถซื้อได้พอดี โดยที่จำนวนนั้นต้องไม่เกิน N\n\nข้อมูลนำเข้า:\nบรรทัดแรก: จำนวนเต็ม N (1 <= N <= 100)\n\nข้อมูลส่งออก:\nพิมพ์จำนวนนักเก็ตที่เป็นไปได้ทั้งหมดเรียงจากน้อยไปมาก (บรรทัดละ 1 จำนวน)\nถ้าไม่มีให้พิมพ์ "no"',
    description_en:
      'McDonalds sells chicken nuggets in boxes of 6, 9, and 20 pieces.\nFind all possible exact quantities of nuggets you can buy that are less than or equal to N.\n\nInput:\nAn integer N (1 <= N <= 100)\n\nOutput:\nPrint all possible quantities in ascending order (one per line).\nIf none, print "no".',
    hint_th: "ลองใช้ Dynamic Programming หรือ Recursion ในการหาค่าที่เป็นไปได้",
    hint_en: "Try using Dynamic Programming or Recursion.",
    testcases: [
      {
        input: "15\n",
        expected: "6\n9\n12\n15",
      },
      {
        input: "5\n",
        expected: "no",
      },
    ],
  },
  {
    id: "QUIZ_SET_01",
    title: "แบบฝึกหัด: แผนภาพเวนน์-ออยเลอร์",
    type: "quiz",
    diff: "Medium",
    description_th:
      "นักเรียนห้องหนึ่งมี 50 คน ชอบวิชาคณิตศาสตร์ 30 คน ชอบวิชาภาษาอังกฤษ 25 คน และชอบทั้งสองวิชา 10 คน ถามว่ามีนักเรียนกี่คนที่ไม่ชอบทั้งสองวิชานี้เลย?",
    answer: "5",
  },
  {
    id: "0001",
    title: "เลขคู่หรือเลขคี่ (Even or Odd) #0001",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "จงเขียนโปรแกรมรับค่าตัวเลข 1 ตัว แล้วตรวจสอบว่าเป็นเลขคู่ หรือ เลขคี่\n\nถ้าเป็นเลขคู่ให้แสดงคำว่า 'Even'\nถ้าเป็นเลขคี่ให้แสดงคำว่า 'Odd'",
    description_en:
      "Write a program that takes an integer and checks if it is Even or Odd.\n\nOutput 'Even' or 'Odd'.",
    hint_th:
      "ใช้ตัวดำเนินการหารเอาเศษ (Modulo หรือเครื่องหมาย %) ดูว่าหาร 2 ลงตัวหรือไม่",
    hint_en: "Use the modulo operator (%) to check if divisible by 2.",
    testcases: [
      {
        input: "4\n",
        expected: "Even",
      },
      {
        input: "7\n",
        expected: "Odd",
      },
      {
        input: "0\n",
        expected: "Even",
      },
    ],
  },
  {
    id: "0002",
    title: "หาพื้นที่สี่เหลี่ยม (Rectangle Area) #0002",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับค่าความกว้างและความยาวของสี่เหลี่ยมผืนผ้า (คั่นด้วยช่องว่าง) จงเขียนโปรแกรมเพื่อคำนวณหาพื้นที่ของสี่เหลี่ยมนี้ (พื้นที่ = กว้าง * ยาว)",
    description_en:
      "Given the width and length of a rectangle (separated by space), calculate its area (Area = Width * Length).",
    hint_th: "รับค่าสองตัวแล้วนำมาคูณกัน (ใช้เครื่องหมาย *)",
    hint_en: "Multiply the two inputs together (using *).",
    testcases: [
      {
        input: "5 4\n",
        expected: "20",
      },
      {
        input: "10 10\n",
        expected: "100",
      },
    ],
  },
  {
    id: "0003",
    title: "บวกเลขสองจำนวน (A + B) #0003",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "จงเขียนโปรแกรมรับค่าตัวเลขจำนวนเต็มสองตัว (A และ B) ที่คั่นด้วยช่องว่าง แล้วแสดงผลลัพธ์เป็นผลบวกของทั้งสองจำนวนนั้น\n\nโจทย์นี้เป็นโจทย์พื้นฐานที่สุดสำหรับการเริ่มต้นเขียนโปรแกรม!",
    description_en:
      "Write a program that takes two integers (A and B) separated by a space, and outputs their sum.\n\nThis is the most basic problem to start programming!",
    hint_th:
      "ใน Python คุณสามารถใช้ input().split() เพื่อแยกข้อความ และ map(int, ...) เพื่อแปลงเป็นตัวเลขได้",
    hint_en: "In Python, use input().split() and map(int, ...)",
    testcases: [
      {
        input: "1 2\n",
        expected: "3",
      },
      {
        input: "10 20\n",
        expected: "30",
      },
      {
        input: "-5 15\n",
        expected: "10",
      },
    ],
  },
  {
    id: "0004",
    title: "หาค่าสูงสุด (Find Maximum) #0004",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "รับตัวเลขจำนวนเต็ม 3 จำนวนที่คั่นด้วยช่องว่าง จงเขียนโปรแกรมหาตัวเลขที่มีค่า 'มากที่สุด' แล้วแสดงผลออกมา",
    description_en:
      "Given 3 space-separated integers, output the maximum value.",
    hint_th:
      "คุณสามารถใช้ if-else ซ้อนกัน หรือใช้ฟังก์ชัน max() ในภาษาโปรแกรมส่วนใหญ่",
    hint_en: "You can use if-else conditions or a built-in max() function.",
    testcases: [
      {
        input: "10 25 5\n",
        expected: "25",
      },
      {
        input: "-1 -5 -10\n",
        expected: "-1",
      },
      {
        input: "100 100 100\n",
        expected: "100",
      },
    ],
  },
  {
    id: "0005",
    title: "คูณเลขมหาประลัย (Multiply) #0005",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "จงเขียนโปรแกรมรับตัวเลข 2 จำนวน คั่นด้วยช่องว่าง แล้วแสดงผลคูณของตัวเลขทั้งสอง",
    description_en:
      "Write a program that takes two numbers and prints their product.",
    hint_th: "อย่าลืมรับค่าแยกกันแล้วแปลงเป็น Integer ก่อนคูณ",
    hint_en: "Parse both inputs as Integers before multiplying.",
    testcases: [
      {
        input: "3 4\n",
        expected: "12",
      },
      {
        input: "9 9\n",
        expected: "81",
      },
    ],
  },
  {
    id: "cpp_stl_01",
    title: "std::vector - Dynamic Array",
    diff: "Easy",
    description_th:
      "std::vector เป็น Container ที่ใช้บ่อยที่สุดใน C++ ทำหน้าที่เหมือน Array แต่สามารถเพิ่มหรือลดขนาดได้เองอัตโนมัติ\\n\\nคำสั่งที่คุณควรจำ:\\n- `push_back(val)` : เพิ่มข้อมูลต่อท้าย\\n- `size()` : คืนค่าจำนวนข้อมูลที่มี\\n- `[i]` : เข้าถึงข้อมูลที่ตำแหน่ง i\\n\\n**ภารกิจ:**\\nจงเขียนโปรแกรมรับค่า N จากนั้นรับตัวเลขจำนวนเต็ม N ตัวมาเก็บไว้ใน `std::vector` แล้วแสดงผลตัวเลขที่อยู่ใน vector ออกมาบรรทัดละตัวตามลำดับ",
    description_en:
      "std::vector is the most commonly used container in C++. It works like an Array but resizes automatically.\\n\\nKey methods:\\n- `push_back(val)`: Adds an element to the end.\\n- `size()`: Returns the number of elements.\\n- `[i]`: Accesses element at index i.\\n\\n**Task:**\\nRead an integer N, then read N integers and store them in a `std::vector`. Print all elements in the vector, each on a new line.",
    testcases: [
      {
        input: "3\n10 20 30",
        expected: "10\n20\n30",
      },
      {
        input: "5\n1 2 3 4 5",
        expected: "1\n2\n3\n4\n5",
      },
    ],
    hint_th:
      "สร้าง `vector<int> v;` แล้วใช้ `for` loop วนรับค่าเพื่อ `v.push_back(x);`",
    hint_en:
      "Create a `vector<int> v;` and use a `for` loop to read values and call `v.push_back(x);`",
  },
  {
    id: "cpp_stl_02",
    title: "std::map - Key-Value Store",
    diff: "Medium",
    description_th:
      "std::map ใช้สำหรับเก็บข้อมูลคู่กันแบบ (Key, Value) โดยค่า Key จะไม่ซ้ำกัน และจะถูกจัดเรียงตามค่า Key อัตโนมัติ (ปกติเรียงจากน้อยไปมาก)\\n\\n**ภารกิจ:**\\nจงเขียนโปรแกรมรับค่า N จากนั้นให้รับข้อมูลนักเรียน N คน (ชื่อ, คะแนน) เข้าไปเก็บใน `std::map<string, int>` แล้วให้โปรแกรมพิมพ์รายการชื่อนักเรียนและคะแนนออกมา (โดยชื่อจะถูกเรียงตามตัวอักษรโดยอัตโนมัติ)",
    description_en:
      "std::map stores (Key, Value) pairs. Keys are unique and automatically sorted (usually ascending).\\n\\n**Task:**\\nRead an integer N, then read N students (name, score) into a `std::map<string, int>`. Print the students' names and scores (the map will sort them alphabetically).",
    testcases: [
      {
        input: "3\nAlice 90\nCharlie 80\nBob 85",
        expected: "Alice 90\nBob 85\nCharlie 80",
      },
      {
        input: "2\nZack 50\nAnn 99",
        expected: "Ann 99\nZack 50",
      },
    ],
    hint_th:
      "ประกาศ `map<string, int> m;` แล้วตอนรับค่าก็กำหนดได้เลย `m[name] = score;` จากนั้นใช้ range-based for loop `for (auto const& [key, val] : m)` เพื่อพิมพ์ผลลัพธ์",
    hint_en:
      "Declare `map<string, int> m;` and assign `m[name] = score;`. Then use a range-based for loop `for (auto const& [key, val] : m)` to print.",
  },
  {
    id: "cpp_stl_03",
    title: "std::sort - Algorithm",
    diff: "Easy",
    description_th:
      "std::sort เป็นอัลกอริทึมสำหรับเรียงลำดับข้อมูลที่อยู่ใน Container ที่ใช้ Random Access Iterator ได้ (เช่น std::vector, std::array)\\nปกติ `std::sort(v.begin(), v.end())` จะเรียงข้อมูลจากน้อยไปมาก\\n\\n**ภารกิจ:**\\nรับจำนวนเต็ม N และตัวเลข N ตัวเข้าไปใน `std::vector` จากนั้นใช้ `std::sort` เรียงจากน้อยไปมาก แล้วพิมพ์ตัวเลขทั้งหมดออกมาในบรรทัดเดียวกัน คั่นด้วยช่องว่าง",
    description_en:
      "std::sort sorts elements in a container. By default, `std::sort(v.begin(), v.end())` sorts in ascending order.\\n\\n**Task:**\\nRead N, then read N integers into a `vector`. Use `std::sort` to sort them ascending, and print them on a single line separated by a space.",
    testcases: [
      {
        input: "5\n5 3 1 4 2",
        expected: "1 2 3 4 5",
      },
      {
        input: "4\n10 -5 0 20",
        expected: "-5 0 10 20",
      },
    ],
    hint_th: "อย่าลืม `#include <algorithm>` สำหรับ std::sort",
    hint_en: "Don't forget `#include <algorithm>` for std::sort.",
  },
  {
    id: "TOI01_pattern",
    title: "TOI 1: Pattern (สร้างลวดลาย)",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับขนาด N แล้วพิมพ์รูปสี่เหลี่ยมจัตุรัสที่มีลักษณะเป็นตารางหมากรุก (o และ x สลับกัน)\nโดยเริ่มด้วย 'o' ก่อนเสมอ\n\nข้อมูลนำเข้า:\nบรรทัดแรก: N (1 <= N <= 20)\n\nข้อมูลส่งออก:\nรูปตารางหมากรุกขนาด N x N",
    description_en:
      "Print a checkerboard pattern of 'o' and 'x' of size N x N starting with 'o'.",
    hint_th: "ใช้ Loop สองชั้นเช็ค i+j ว่าเป็นเลขคู่หรือเลขคี่",
    hint_en: "Use nested loops and check if i+j is even or odd.",
    testcases: [
      {
        input: "3\n",
        expected: "oxo\nxox\noxo\n",
      },
      {
        input: "4\n",
        expected: "oxox\nxoxo\noxox\nxoxo\n",
      },
    ],
  },
  {
    id: "OTOG_001",
    title: "OTOG: Grade Calculator",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับคะแนนจากผู้ใช้ (0 - 100) แล้วพิมพ์เกรดตามเงื่อนไขดังนี้:\n- 80-100: A\n- 70-79: B\n- 60-69: C\n- 50-59: D\n- ต่ำกว่า 50: F",
    description_en:
      "Calculate grade based on score (A=80-100, B=70-79, C=60-69, D=50-59, F<50).",
    hint_th: "ใช้ if-elif-else เพื่อตรวจสอบเงื่อนไขตามลำดับ",
    hint_en: "Use if-elif-else statements.",
    testcases: [
      {
        input: "85\n",
        expected: "A\n",
      },
      {
        input: "72\n",
        expected: "B\n",
      },
      {
        input: "49\n",
        expected: "F\n",
      },
    ],
  },
  {
    id: "TOI02_skyline",
    title: "TOI 2: Skyline (โครงร่างตึก)",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "ให้ข้อมูลพิกัด (L, H, R) ของตึกแต่ละตึก (เริ่มต้นด้านซ้ายที่ L สูง H และสิ้นสุดด้านขวาที่ R)\nจงแสดงผลลัพธ์เป็นพิกัดความสูงของเส้นขอบฟ้า (Skyline) ทั้งหมดเรียงจากซ้ายไปขวา\n\nข้อมูลนำเข้า:\nบรรทัดแรก: จำนวนตึก N\nอีก N บรรทัด: พิกัด L, H, R ของแต่ละตึก",
    description_en:
      "Given N buildings with coordinates (L, H, R), print the skyline silhouette from left to right.",
    hint_th:
      "เนื่องจากพิกัด L, R มีค่าไม่เกิน 255 สามารถใช้อาร์เรย์เก็บความสูงสูงสุดที่พิกัด X แต่ละจุดได้",
    hint_en:
      "Since coordinates are small, use an array of size 256 to keep track of the maximum height at each x.",
    testcases: [
      {
        input: "2\n1 11 5\n2 6 7\n",
        expected: "1 11 5 6 7 0\n",
      },
    ],
  },
  {
    id: "OTOG_002",
    title: "OTOG: Fibonacci Sequence",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "จงเขียนโปรแกรมหาค่า Fibonacci ตัวที่ N โดยกำหนดให้:\nF(1) = 1, F(2) = 1\nF(N) = F(N-1) + F(N-2)\n\nข้อมูลนำเข้า: ตัวเลข N (1 <= N <= 40)",
    description_en: "Find the N-th Fibonacci number.",
    hint_th:
      "สามารถใช้ Loop ธรรมดาหรือ Dynamic programming ได้ (ข้อนี้ N=40 ถ้าใช้ Recursion ธรรมดาอาจจะช้าเกินไป)",
    hint_en: "Use iterative method or dynamic programming.",
    testcases: [
      {
        input: "1\n",
        expected: "1\n",
      },
      {
        input: "5\n",
        expected: "5\n",
      },
      {
        input: "10\n",
        expected: "55\n",
      },
    ],
  },
  {
    id: "TOI03_block",
    title: "TOI 3: Block Game (เกมหยอดเหรียญ)",
    diff: "Hard",
    lang: "All Languages",
    description_th:
      "ตารางขนาด M แถว N คอลัมน์ จำลองการเล่นเกมโดยมีการย้ายบล็อก ถ้ามีบล็อกสีเดียวกันเรียงติดกัน 3 ชิ้นทั้งแนวตั้งหรือแนวนอน บล็อกนั้นจะระเบิดและด้านบนจะร่วงลงมา \nจงรับคำสั่งเลื่อนบล็อก แล้วแสดงตารางหลังจากการระเบิดสิ้นสุดลง (แบบย่อ ให้แสดงจำนวนชิ้นที่ระเบิดก็พอ)",
    description_en:
      "Simulate a block puzzle game and count the total number of blocks destroyed.",
    hint_th: "การร่วงของบล็อกสามารถใช้การขยับข้อมูลใน Array 2 มิติได้",
    hint_en: "Simulate falling blocks using 2D array.",
    testcases: [
      {
        input: "3 3\n# - -\n# - -\n# - -\n",
        expected: "3\n",
      },
    ],
  },
  {
    id: "ALG_001",
    title: "Algorithm: Two Sum",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "รับจำนวนเต็ม N และอาเรย์ของตัวเลข N ตัว และรับเป้าหมาย K\nจงหาว่ามีกี่คู่ในอาเรย์ที่บวกกันแล้วได้เท่ากับ K พอดี\n\nข้อมูลนำเข้า:\nบรรทัดแรก: N K\nบรรทัดที่สอง: ตัวเลข N จำนวนคั่นด้วยช่องว่าง",
    description_en:
      "Given an array of N integers and a target K, find the number of pairs that sum up to K.",
    hint_th:
      "สามารถใช้ Hash Map (หรือ Dictionary/Unordered Map) เพื่อเช็คคู่ได้อย่างรวดเร็วใน O(N)",
    hint_en: "Use a Hash Map to find pairs in O(N) time.",
    testcases: [
      {
        input: "5 5\n1 2 3 4 5\n",
        expected: "2\n",
      },
      {
        input: "4 10\n5 5 5 5\n",
        expected: "6\n",
      },
    ],
  },
  {
    id: "ALG_002",
    title: "Algorithm: Longest Palindrome Substring",
    diff: "Hard",
    lang: "All Languages",
    description_th:
      "รับข้อความ S จงหาความยาวของข้อความย่อย (Substring) ที่เป็น Palindrome ที่ยาวที่สุด\n(Palindrome คือข้อความที่อ่านจากหน้าไปหลัง หรือหลังมาหน้าแล้วเหมือนเดิม)",
    description_en:
      "Find the length of the longest palindromic substring in S.",
    hint_th: "ลองพิจารณาการขยายตัวออกจากจุดกึ่งกลางของแต่ละตัวอักษร",
    hint_en: "Try expanding around the center for each character.",
    testcases: [
      {
        input: "babad\n",
        expected: "3\n",
      },
      {
        input: "cbbd\n",
        expected: "2\n",
      },
    ],
  },
  {
    id: "STR_001",
    title: "String: Anagram Check",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับคำ 2 คำ (บรรทัดละคำ) จงเช็คว่าคำสองคำนั้นประกอบขึ้นจากตัวอักษรชุดเดียวกันหรือไม่ (Anagram)\nถ้าใช่ให้พิมพ์ YES ถ้าไม่ใช่พิมพ์ NO (ตัวพิมพ์เล็ก-ใหญ่ถือว่าต่างกัน)",
    description_en:
      "Check if two given strings are anagrams of each other. Print YES or NO.",
    hint_th: "คุณสามารถเอาสตริงมาเรียงลำดับ (Sort) แล้วเทียบกันได้",
    hint_en: "Sort both strings and compare them.",
    testcases: [
      {
        input: "listen\nsilent\n",
        expected: "YES\n",
      },
      {
        input: "hello\nworld\n",
        expected: "NO\n",
      },
      {
        input: "Rat\nCar\n",
        expected: "NO\n",
      },
    ],
  },
  {
    id: "ARR_001",
    title: "Array: Rotate Array",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "รับ N และ K ตามด้วยตัวเลข N ตัว \nจงเลื่อน (Rotate) ตัวเลขในอาเรย์ไปทางขวา K ครั้ง แล้วปริ้นท์อาเรย์ที่ได้",
    description_en: "Rotate an array of N integers to the right by K steps.",
    hint_th: "ตำแหน่งใหม่ของข้อมูล index i คือ (i + K) % N",
    hint_en: "The new index of element at i is (i + K) % N.",
    testcases: [
      {
        input: "5 2\n1 2 3 4 5\n",
        expected: "4 5 1 2 3\n",
      },
      {
        input: "4 1\n10 20 30 40\n",
        expected: "40 10 20 30\n",
      },
    ],
  },
  {
    id: "MTH_001",
    title: "Math: Is Prime Number?",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับตัวเลขจำนวนเต็มบวก 1 ตัว จงตรวจสอบว่าเป็นจำนวนเฉพาะหรือไม่ \nตอบ 'Prime' ถ้าเป็นจำนวนเฉพาะ และ 'Not Prime' ถ้าไม่ใช่",
    description_en:
      "Check if a given number is prime or not. Print 'Prime' or 'Not Prime'.",
    hint_th:
      "จำนวนเฉพาะคือจำนวนที่มีแค่ 1 และตัวมันเองหารลงตัว ลองลูปเช็คตัวหารตั้งแต่ 2 ถึง sqrt(N)",
    hint_en: "Loop from 2 to sqrt(N) to check for divisors.",
    testcases: [
      {
        input: "7\n",
        expected: "Prime\n",
      },
      {
        input: "10\n",
        expected: "Not Prime\n",
      },
      {
        input: "1\n",
        expected: "Not Prime\n",
      },
    ],
  },
  {
    id: "MTH_002",
    title: "Math: GCD and LCM",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับตัวเลข 2 ตัว คั่นด้วยช่องว่าง \nจงหา ห.ร.ม. (GCD) และ ค.ร.น. (LCM) ของสองจำนวนนี้ ปริ้นท์คั่นด้วยช่องว่าง",
    description_en:
      "Calculate the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two numbers.",
    hint_th:
      "ใช้ Euclidean Algorithm หา ห.ร.ม. ก่อน แล้ว ค.ร.น. จะเท่ากับ (a*b)/ห.ร.ม.",
    hint_en: "Use the Euclidean Algorithm for GCD. LCM = (a*b)/GCD.",
    testcases: [
      {
        input: "12 18\n",
        expected: "6 36\n",
      },
      {
        input: "7 5\n",
        expected: "1 35\n",
      },
    ],
  },
  {
    id: "DP_001",
    title: "DP: Coin Change",
    diff: "Hard",
    lang: "All Languages",
    description_th:
      "คุณมีเหรียญมูลค่า C1, C2, ... Cn \nจงหาจำนวนเหรียญน้อยที่สุดที่จะใช้ทอนเงินจำนวน V (ถ้าไม่สามารถทอนได้ให้ปริ้นท์ -1)\nบรรทัดแรก: V และ N\nบรรทัดสอง: มูลค่าเหรียญ N เหรียญ",
    description_en:
      "Find the minimum number of coins needed to make amount V. Print -1 if impossible.",
    hint_th: "ใช้ Dynamic Programming: dp[i] = min(dp[i], dp[i-coin] + 1)",
    hint_en: "Use dynamic programming: dp[i] = min(dp[i], dp[i-coin] + 1).",
    testcases: [
      {
        input: "11 3\n1 2 5\n",
        expected: "3\n",
      },
      {
        input: "3 1\n2\n",
        expected: "-1\n",
      },
    ],
  },
  {
    id: "GRH_001",
    title: "Graph: Number of Islands",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "ให้ตารางขนาด R x C โดย 1 แทนแผ่นดินและ 0 แทนน้ำ\nจงนับว่ามีเกาะกี่เกาะ (เกาะคือกลุ่มของแผ่นดินที่เชื่อมติดกันใน 4 ทิศทาง บนล่างซ้ายขวา)",
    description_en:
      "Given an R x C grid of 1s (land) and 0s (water), count the number of islands.",
    hint_th: "ใช้ DFS หรือ BFS เพื่อกวาดหาพื้นที่ที่เป็น 1 ที่เชื่อมถึงกัน",
    hint_en: "Use DFS or BFS traversal.",
    testcases: [
      {
        input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1\n",
        expected: "3\n",
      },
    ],
  },
  {
    id: "OTOG_003",
    title: "OTOG: Pyramid Printing",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับเลข N (1 ถึง 100) แล้วให้พิมพ์พีระมิดด้วยดอกจัน (*) ความสูง N ชั้น\nตัวอย่าง N=3:\n  *\n ***\n*****",
    description_en: "Print a pyramid of '*' with height N.",
    hint_th: "แต่ละชั้นจะมีช่องว่าง N - i ช่อง และดอกจัน 2*i - 1 อัน",
    hint_en: "Each level i has N-i spaces and 2i-1 stars.",
    testcases: [
      {
        input: "3\n",
        expected: "  *\n ***\n*****\n",
      },
      {
        input: "2\n",
        expected: " *\n***\n",
      },
    ],
  },
  {
    id: "TOI04_temp",
    title: "TOI 4: SMS Thumb",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "ปุ่มโทรศัพท์มือถือแบบเก่า แต่ละปุ่มมี 3-4 ตัวอักษร จงแปลงข้อความที่พิมพ์เป็นลำดับการกดปุ่ม (เช่น A = 2, B = 22, C = 222, Space = 0)\nข้อมูลรับเข้าเป็นข้อความ (Uppercase), จงปริ้นท์ลำดับตัวเลขที่ต้องกดโดยมีช่องว่างคั่น",
    description_en:
      "Convert text into old-school mobile phone keypad keypresses.",
    hint_th: "สร้างตาราง Mapping ตัวอักษร -> ลำดับตัวเลข",
    hint_en: "Create a mapping table for each character.",
    testcases: [
      {
        input: "CAB\n",
        expected: "222 2 22\n",
      },
      {
        input: "HI\n",
        expected: "44 444\n",
      },
    ],
  },
  {
    id: "ALG_003",
    title: "Algorithm: Binary Search",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "รับ N และ T (เป้าหมาย) จากนั้นรับตัวเลขที่ 'เรียงลำดับแล้ว' จำนวน N ตัว\nจงหา Index (เริ่มที่ 0) ของตัวเลข T ในอาเรย์ ถ้าไม่เจอให้ตอบ -1",
    description_en:
      "Find the index of target T in a sorted array using Binary Search.",
    hint_th: "ใช้ Binary Search กำหนด low และ high เพื่อหารครึ่งเรื่อยๆ",
    hint_en: "Use low and high pointers to split the array in half.",
    testcases: [
      {
        input: "5 3\n1 2 3 4 5\n",
        expected: "2\n",
      },
      {
        input: "4 10\n1 2 3 4\n",
        expected: "-1\n",
      },
    ],
  },
  {
    id: "STR_002",
    title: "String: Reverse Words",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      'รับข้อความ 1 บรรทัด จงสลับลำดับของคำในข้อความ (คำคั่นด้วยช่องว่าง)\nเช่น "hello world" กลายเป็น "world hello"',
    description_en: "Reverse the order of words in a given string.",
    hint_th: "แยกคำด้วยการ split(' ') จากนั้น reverse array แล้ว join กลับ",
    hint_en: "Split by space, reverse the array, and join back with space.",
    testcases: [
      {
        input: "hello world\n",
        expected: "world hello\n",
      },
      {
        input: "i love coding\n",
        expected: "coding love i\n",
      },
    ],
  },
  {
    id: "DP_002",
    title: "DP: Climbing Stairs",
    diff: "Easy",
    lang: "All Languages",
    description_th:
      "มีบันได N ขั้น แต่ละก้าวสามารถเดินขึ้นได้ 1 ขั้น หรือ 2 ขั้น \nจงหาจำนวนวิธีทั้งหมดที่จะเดินขึ้นไปถึงขั้นที่ N",
    description_en:
      "You are climbing a staircase of N steps. You can take 1 or 2 steps at a time. How many distinct ways can you climb to the top?",
    hint_th:
      "ความสัมพันธ์คล้ายกับเลขฟีโบนัชชี: ways(N) = ways(N-1) + ways(N-2)",
    hint_en: "This is equivalent to the Fibonacci sequence.",
    testcases: [
      {
        input: "2\n",
        expected: "2\n",
      },
      {
        input: "3\n",
        expected: "3\n",
      },
      {
        input: "5\n",
        expected: "8\n",
      },
    ],
  },
  {
    id: "OTOG_004",
    title: "OTOG: Factorial Trailing Zeroes",
    diff: "Medium",
    lang: "All Languages",
    description_th:
      "รับ N จงหาว่า N! (N Factorial) เมื่อคำนวณออกมาแล้ว จะมีเลขศูนย์ลงท้ายกี่ตัว",
    description_en: "Count the number of trailing zeroes in N!.",
    hint_th:
      "จำนวนศูนย์ลงท้ายเท่ากับจำนวนครั้งที่ 5 หาร 1..N ลงตัว (N/5 + N/25 + N/125 + ...)",
    hint_en: "Count the number of factor 5 in numbers from 1 to N.",
    testcases: [
      {
        input: "3\n",
        expected: "0\n",
      },
      {
        input: "5\n",
        expected: "1\n",
      },
      {
        input: "100\n",
        expected: "24\n",
      },
    ],
  },
  {
    id: "TOI05_jump",
    title: "TOI 5: Jump",
    diff: "Hard",
    lang: "All Languages",
    description_th:
      "กบกระโดดข้ามใบบัว โดยแต่ละใบมีพิกัด X เริ่มต้นจาก X=0 ไป X=L แต่ละครั้งกระโดดได้ไม่เกินระยะ K\nจงหาว่าต้องกระโดดน้อยที่สุดกี่ครั้งถึงจะข้ามไปถึงพิกัด >= L",
    description_en:
      "Find minimum number of jumps to reach position >= L, where max jump distance is K.",
    hint_th: "ใช้หลักการ Greedy: กระโดดให้ไกลที่สุดเท่าที่จะไกลได้ในแต่ละก้าว",
    hint_en:
      "Use greedy approach: Always jump to the furthest possible pad within reach K.",
    testcases: [
      {
        input: "10 4 3\n1 3 6\n",
        expected: "3\n",
      },
    ],
  },
];
