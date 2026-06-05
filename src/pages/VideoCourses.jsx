import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  PlayCircle,
  Boxes,
  Cpu,
  Divide,
  FunctionSquare,
  Terminal,
  CodeSquare,
  Code,
  Coffee,
  FileJson,
  Code2,
} from "lucide-react";
import { coursesData } from "../data/courses";

const getIcon = (iconName) => {
  switch (iconName) {
    case "Boxes":
      return <Boxes size={24} />;
    case "Cpu":
      return <Cpu size={24} />;
    case "Divide":
      return <Divide size={24} />;
    case "FunctionSquare":
      return <FunctionSquare size={24} />;
    case "Terminal":
      return <Terminal size={24} />;
    case "CodeSquare":
      return <CodeSquare size={24} />;
    case "Code":
      return <Code size={24} />;
    case "Coffee":
      return <Coffee size={24} />;
    case "FileJson":
      return <FileJson size={24} />;
    case "Code2":
      return <Code2 size={24} />;
    default:
      return <GraduationCap size={24} />;
  }
};

export default function VideoCourses() {
  const codingCourses = coursesData.filter((c) => c.category === "coding");
  const mathCourses = coursesData.filter((c) => c.category === "math");

  return (
    <div className="container">
      {/* Coding Courses Section */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          className="text-gradient"
          style={{ fontSize: "3rem", marginBottom: "1rem" }}
        >
          ภาควิชาเขียนโปรแกรม (Coding Courses)
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          เรียนรู้พื้นฐานการเขียนโปรแกรมด้วยภาษาต่างๆ
          ผ่านคลิปวิดีโอสอนและลองเขียนโค้ดแก้โจทย์จริงแบบ Step-by-Step
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "4rem",
        }}
      >
        {codingCourses.map((course) => (
          <div
            key={course.id}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderColor: "var(--border-color)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                backgroundColor: course.color,
              }}
            ></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                paddingLeft: "0.5rem",
              }}
            >
              <div
                style={{
                  padding: "0.8rem",
                  backgroundColor: `${course.color}20`,
                  borderRadius: "var(--border-radius-md)",
                  color: course.color,
                }}
              >
                {getIcon(course.icon)}
              </div>
              <h2
                style={{
                  fontSize: "1.3rem",
                  margin: 0,
                  color: "var(--color-text-main)",
                }}
              >
                {course.title}
              </h2>
            </div>

            <p
              style={{
                color: "var(--color-text-muted)",
                lineHeight: "1.6",
                flexGrow: 1,
                marginBottom: "2rem",
                paddingLeft: "0.5rem",
              }}
            >
              {course.description}
            </p>

            <Link to={`/course/${course.id}`} style={{ width: "100%" }}>
              <button
                className="btn btn-primary"
                style={{
                  width: "100%",
                  backgroundColor: course.color,
                  borderColor: course.color,
                  boxShadow: `0 4px 14px 0 ${course.color}40`,
                }}
              >
                <PlayCircle size={18} /> เข้าเรียนวิชานี้
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Math Courses Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          marginTop: "4rem",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "4rem",
        }}
      >
        <h1
          className="text-gradient"
          style={{ fontSize: "3rem", marginBottom: "1rem" }}
        >
          ภาควิชาคณิตศาสตร์ (Math Courses)
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          เรียนรู้ทฤษฎีคณิตศาสตร์ที่สำคัญสำหรับการเขียนโปรแกรม พร้อมวิดีโอสอน
          และแบบฝึกหัดทบทวนที่ประยุกต์เข้ากับโค้ด
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {mathCourses.map((course) => (
          <div
            key={course.id}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderColor: "var(--border-color)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                backgroundColor: course.color,
              }}
            ></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                paddingLeft: "0.5rem",
              }}
            >
              <div
                style={{
                  padding: "0.8rem",
                  backgroundColor: `${course.color}20`,
                  borderRadius: "var(--border-radius-md)",
                  color: course.color,
                }}
              >
                {getIcon(course.icon)}
              </div>
              <h2
                style={{
                  fontSize: "1.3rem",
                  margin: 0,
                  color: "var(--color-text-main)",
                }}
              >
                {course.title}
              </h2>
            </div>

            <p
              style={{
                color: "var(--color-text-muted)",
                lineHeight: "1.6",
                flexGrow: 1,
                marginBottom: "2rem",
                paddingLeft: "0.5rem",
              }}
            >
              {course.description}
            </p>

            <Link to={`/course/${course.id}`} style={{ width: "100%" }}>
              <button
                className="btn btn-primary"
                style={{
                  width: "100%",
                  backgroundColor: course.color,
                  borderColor: course.color,
                  boxShadow: `0 4px 14px 0 ${course.color}40`,
                }}
              >
                <PlayCircle size={18} /> เข้าเรียนวิชานี้
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
