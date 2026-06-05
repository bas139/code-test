export const skillTreeData = [
  {
    id: "basics",
    title: "ด่าน 1: พื้นฐานโปรแกรมมิ่ง (Variables & IO)",
    description: "เรียนรู้การรับค่า แสดงผล และคำนวณเบื้องต้น ก้าวแรกสู่การเป็นโปรแกรมเมอร์",
    icon: "Boxes",
    color: "#10b981", // Green
    prerequisites: [],
    problems: ["0003", "0002"] // A+B, Rectangle Area
  },
  {
    id: "conditionals",
    title: "ด่าน 2: ทางแยกแห่งการตัดสินใจ (If-Else)",
    description: "ฝึกให้โปรแกรมรู้จักคิดและตัดสินใจเลือกทางเดินผ่านเงื่อนไขต่างๆ",
    icon: "Divide",
    color: "#3b82f6", // Blue
    prerequisites: ["basics"],
    problems: ["0001", "0004", "0005"] // Even/Odd, Find Max, Grading
  },
  {
    id: "loops",
    title: "ด่าน 3: ลูปมฤตยู (Loops)",
    description: "วงจรการทำซ้ำไม่รู้จบ เอาชนะด้วย Loop for และ while",
    icon: "Cpu",
    color: "#8b5cf6", // Purple
    prerequisites: ["conditionals"],
    problems: ["0010", "0011"] // Min Max, Count Divisors (Assuming they exist or similar ones)
  },
  {
    id: "arrays",
    title: "ด่าน 4: คลังสรรพาวุธ (Arrays & Strings)",
    description: "จัดระเบียบข้อมูลเป็นชุด พร้อมลุยกับโจทย์ที่ซับซ้อนขึ้น",
    icon: "FunctionSquare",
    color: "#f59e0b", // Orange
    prerequisites: ["loops"],
    problems: ["TOI01_nugget"] // Using a harder problem here
  },
  {
    id: "math_logic",
    title: "เควสต์พิเศษ: ถ้ำแห่งตรรกะ (Math & Logic)",
    description: "ทดสอบไหวพริบและตรรกะทางคณิตศาสตร์",
    icon: "CodeSquare",
    color: "#ef4444", // Red
    prerequisites: ["basics"],
    problems: ["QUIZ_SET_01"] // Venn Diagram Quiz
  }
];
