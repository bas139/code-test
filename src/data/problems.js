export const problemsData = [
  {
    "id": "TOI01_nugget",
    "title": "TOI 1: Nugget Number",
    "diff": "Medium",
    "lang": "All Languages",
    "description_th": "แมคโดนัลด์ขายนักเก็ตไก่ในกล่องขนาด 6, 9, และ 20 ชิ้น\nจงหาจำนวนนักเก็ตทั้งหมดที่สามารถซื้อได้พอดี โดยที่จำนวนนั้นต้องไม่เกิน N\n\nข้อมูลนำเข้า:\nบรรทัดแรก: จำนวนเต็ม N (1 <= N <= 100)\n\nข้อมูลส่งออก:\nพิมพ์จำนวนนักเก็ตที่เป็นไปได้ทั้งหมดเรียงจากน้อยไปมาก (บรรทัดละ 1 จำนวน)\nถ้าไม่มีให้พิมพ์ \"no\"",
    "description_en": "McDonalds sells chicken nuggets in boxes of 6, 9, and 20 pieces.\nFind all possible exact quantities of nuggets you can buy that are less than or equal to N.\n\nInput:\nAn integer N (1 <= N <= 100)\n\nOutput:\nPrint all possible quantities in ascending order (one per line).\nIf none, print \"no\".",
    "hint_th": "ลองใช้ Dynamic Programming หรือ Recursion ในการหาค่าที่เป็นไปได้",
    "hint_en": "Try using Dynamic Programming or Recursion.",
    "testcases": [
      {
        "input": "15\n",
        "expected": "6\n9\n12\n15"
      },
      {
        "input": "5\n",
        "expected": "no"
      }
    ]
  },
  {
    "id": "QUIZ_SET_01",
    "title": "แบบฝึกหัด: แผนภาพเวนน์-ออยเลอร์",
    "type": "quiz",
    "diff": "Medium",
    "description_th": "นักเรียนห้องหนึ่งมี 50 คน ชอบวิชาคณิตศาสตร์ 30 คน ชอบวิชาภาษาอังกฤษ 25 คน และชอบทั้งสองวิชา 10 คน ถามว่ามีนักเรียนกี่คนที่ไม่ชอบทั้งสองวิชานี้เลย?",
    "answer": "5"
  },
  {
    "id": "0001",
    "title": "เลขคู่หรือเลขคี่ (Even or Odd) #0001",
    "diff": "Easy",
    "lang": "All Languages",
    "description_th": "จงเขียนโปรแกรมรับค่าตัวเลข 1 ตัว แล้วตรวจสอบว่าเป็นเลขคู่ หรือ เลขคี่\n\nถ้าเป็นเลขคู่ให้แสดงคำว่า 'Even'\nถ้าเป็นเลขคี่ให้แสดงคำว่า 'Odd'",
    "description_en": "Write a program that takes an integer and checks if it is Even or Odd.\n\nOutput 'Even' or 'Odd'.",
    "hint_th": "ใช้ตัวดำเนินการหารเอาเศษ (Modulo หรือเครื่องหมาย %) ดูว่าหาร 2 ลงตัวหรือไม่",
    "hint_en": "Use the modulo operator (%) to check if divisible by 2.",
    "testcases": [
      {
        "input": "4\n",
        "expected": "Even"
      },
      {
        "input": "7\n",
        "expected": "Odd"
      },
      {
        "input": "0\n",
        "expected": "Even"
      }
    ]
  },
  {
    "id": "0002",
    "title": "หาพื้นที่สี่เหลี่ยม (Rectangle Area) #0002",
    "diff": "Easy",
    "lang": "All Languages",
    "description_th": "รับค่าความกว้างและความยาวของสี่เหลี่ยมผืนผ้า (คั่นด้วยช่องว่าง) จงเขียนโปรแกรมเพื่อคำนวณหาพื้นที่ของสี่เหลี่ยมนี้ (พื้นที่ = กว้าง * ยาว)",
    "description_en": "Given the width and length of a rectangle (separated by space), calculate its area (Area = Width * Length).",
    "hint_th": "รับค่าสองตัวแล้วนำมาคูณกัน (ใช้เครื่องหมาย *)",
    "hint_en": "Multiply the two inputs together (using *).",
    "testcases": [
      {
        "input": "5 4\n",
        "expected": "20"
      },
      {
        "input": "10 10\n",
        "expected": "100"
      }
    ]
  },
  {
    "id": "0003",
    "title": "บวกเลขสองจำนวน (A + B) #0003",
    "diff": "Easy",
    "lang": "All Languages",
    "description_th": "จงเขียนโปรแกรมรับค่าตัวเลขจำนวนเต็มสองตัว (A และ B) ที่คั่นด้วยช่องว่าง แล้วแสดงผลลัพธ์เป็นผลบวกของทั้งสองจำนวนนั้น\n\nโจทย์นี้เป็นโจทย์พื้นฐานที่สุดสำหรับการเริ่มต้นเขียนโปรแกรม!",
    "description_en": "Write a program that takes two integers (A and B) separated by a space, and outputs their sum.\n\nThis is the most basic problem to start programming!",
    "hint_th": "ใน Python คุณสามารถใช้ input().split() เพื่อแยกข้อความ และ map(int, ...) เพื่อแปลงเป็นตัวเลขได้",
    "hint_en": "In Python, use input().split() and map(int, ...)",
    "testcases": [
      {
        "input": "1 2\n",
        "expected": "3"
      },
      {
        "input": "10 20\n",
        "expected": "30"
      },
      {
        "input": "-5 15\n",
        "expected": "10"
      }
    ]
  },
  {
    "id": "0004",
    "title": "หาค่าสูงสุด (Find Maximum) #0004",
    "diff": "Medium",
    "lang": "All Languages",
    "description_th": "รับตัวเลขจำนวนเต็ม 3 จำนวนที่คั่นด้วยช่องว่าง จงเขียนโปรแกรมหาตัวเลขที่มีค่า 'มากที่สุด' แล้วแสดงผลออกมา",
    "description_en": "Given 3 space-separated integers, output the maximum value.",
    "hint_th": "คุณสามารถใช้ if-else ซ้อนกัน หรือใช้ฟังก์ชัน max() ในภาษาโปรแกรมส่วนใหญ่",
    "hint_en": "You can use if-else conditions or a built-in max() function.",
    "testcases": [
      {
        "input": "10 25 5\n",
        "expected": "25"
      },
      {
        "input": "-1 -5 -10\n",
        "expected": "-1"
      },
      {
        "input": "100 100 100\n",
        "expected": "100"
      }
    ]
  },
  {
    "id": "0005",
    "title": "คูณเลขมหาประลัย (Multiply) #0005",
    "diff": "Easy",
    "lang": "All Languages",
    "description_th": "จงเขียนโปรแกรมรับตัวเลข 2 จำนวน คั่นด้วยช่องว่าง แล้วแสดงผลคูณของตัวเลขทั้งสอง",
    "description_en": "Write a program that takes two numbers and prints their product.",
    "hint_th": "อย่าลืมรับค่าแยกกันแล้วแปลงเป็น Integer ก่อนคูณ",
    "hint_en": "Parse both inputs as Integers before multiplying.",
    "testcases": [
      {
        "input": "3 4\n",
        "expected": "12"
      },
      {
        "input": "9 9\n",
        "expected": "81"
      }
    ]
  },
  {
    "id": "cpp_stl_01",
    "title": "std::vector - Dynamic Array",
    "diff": "Easy",
    "description_th": "std::vector เป็น Container ที่ใช้บ่อยที่สุดใน C++ ทำหน้าที่เหมือน Array แต่สามารถเพิ่มหรือลดขนาดได้เองอัตโนมัติ\\n\\nคำสั่งที่คุณควรจำ:\\n- `push_back(val)` : เพิ่มข้อมูลต่อท้าย\\n- `size()` : คืนค่าจำนวนข้อมูลที่มี\\n- `[i]` : เข้าถึงข้อมูลที่ตำแหน่ง i\\n\\n**ภารกิจ:**\\nจงเขียนโปรแกรมรับค่า N จากนั้นรับตัวเลขจำนวนเต็ม N ตัวมาเก็บไว้ใน `std::vector` แล้วแสดงผลตัวเลขที่อยู่ใน vector ออกมาบรรทัดละตัวตามลำดับ",
    "description_en": "std::vector is the most commonly used container in C++. It works like an Array but resizes automatically.\\n\\nKey methods:\\n- `push_back(val)`: Adds an element to the end.\\n- `size()`: Returns the number of elements.\\n- `[i]`: Accesses element at index i.\\n\\n**Task:**\\nRead an integer N, then read N integers and store them in a `std::vector`. Print all elements in the vector, each on a new line.",
    "testcases": [
      {
        "input": "3\\n10 20 30",
        "expected": "10\\n20\\n30"
      },
      {
        "input": "5\\n1 2 3 4 5",
        "expected": "1\\n2\\n3\\n4\\n5"
      }
    ],
    "hint_th": "สร้าง `vector<int> v;` แล้วใช้ `for` loop วนรับค่าเพื่อ `v.push_back(x);`",
    "hint_en": "Create a `vector<int> v;` and use a `for` loop to read values and call `v.push_back(x);`"
  },
  {
    "id": "cpp_stl_02",
    "title": "std::map - Key-Value Store",
    "diff": "Medium",
    "description_th": "std::map ใช้สำหรับเก็บข้อมูลคู่กันแบบ (Key, Value) โดยค่า Key จะไม่ซ้ำกัน และจะถูกจัดเรียงตามค่า Key อัตโนมัติ (ปกติเรียงจากน้อยไปมาก)\\n\\n**ภารกิจ:**\\nจงเขียนโปรแกรมรับค่า N จากนั้นให้รับข้อมูลนักเรียน N คน (ชื่อ, คะแนน) เข้าไปเก็บใน `std::map<string, int>` แล้วให้โปรแกรมพิมพ์รายการชื่อนักเรียนและคะแนนออกมา (โดยชื่อจะถูกเรียงตามตัวอักษรโดยอัตโนมัติ)",
    "description_en": "std::map stores (Key, Value) pairs. Keys are unique and automatically sorted (usually ascending).\\n\\n**Task:**\\nRead an integer N, then read N students (name, score) into a `std::map<string, int>`. Print the students' names and scores (the map will sort them alphabetically).",
    "testcases": [
      {
        "input": "3\\nAlice 90\\nCharlie 80\\nBob 85",
        "expected": "Alice 90\\nBob 85\\nCharlie 80"
      },
      {
        "input": "2\\nZack 50\\nAnn 99",
        "expected": "Ann 99\\nZack 50"
      }
    ],
    "hint_th": "ประกาศ `map<string, int> m;` แล้วตอนรับค่าก็กำหนดได้เลย `m[name] = score;` จากนั้นใช้ range-based for loop `for (auto const& [key, val] : m)` เพื่อพิมพ์ผลลัพธ์",
    "hint_en": "Declare `map<string, int> m;` and assign `m[name] = score;`. Then use a range-based for loop `for (auto const& [key, val] : m)` to print."
  },
  {
    "id": "cpp_stl_03",
    "title": "std::sort - Algorithm",
    "diff": "Easy",
    "description_th": "std::sort เป็นอัลกอริทึมสำหรับเรียงลำดับข้อมูลที่อยู่ใน Container ที่ใช้ Random Access Iterator ได้ (เช่น std::vector, std::array)\\nปกติ `std::sort(v.begin(), v.end())` จะเรียงข้อมูลจากน้อยไปมาก\\n\\n**ภารกิจ:**\\nรับจำนวนเต็ม N และตัวเลข N ตัวเข้าไปใน `std::vector` จากนั้นใช้ `std::sort` เรียงจากน้อยไปมาก แล้วพิมพ์ตัวเลขทั้งหมดออกมาในบรรทัดเดียวกัน คั่นด้วยช่องว่าง",
    "description_en": "std::sort sorts elements in a container. By default, `std::sort(v.begin(), v.end())` sorts in ascending order.\\n\\n**Task:**\\nRead N, then read N integers into a `vector`. Use `std::sort` to sort them ascending, and print them on a single line separated by a space.",
    "testcases": [
      {
        "input": "5\\n5 3 1 4 2",
        "expected": "1 2 3 4 5"
      },
      {
        "input": "4\\n10 -5 0 20",
        "expected": "-5 0 10 20"
      }
    ],
    "hint_th": "อย่าลืม `#include <algorithm>` สำหรับ std::sort",
    "hint_en": "Don't forget `#include <algorithm>` for std::sort."
  }
];
