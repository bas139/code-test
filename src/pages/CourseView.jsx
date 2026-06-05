import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  ListVideo,
  Info,
  Code,
  Lightbulb,
} from "lucide-react";
import { coursesData } from "../data/courses";
import { problemsData } from "../data/problems";

export default function CourseView() {
  const { courseId } = useParams();
  const course = coursesData.find((c) => c.id === courseId);
  const [solvedProblems, setSolvedProblems] = useState([]);

  // Set the first episode as default active
  const [activeEpisodeId, setActiveEpisodeId] = useState(
    course?.episodes?.[0]?.id,
  );

  useEffect(() => {
    const solved = JSON.parse(localStorage.getItem("solvedProblems") || "[]");
    setSolvedProblems(solved);
  }, []);

  if (!course) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", marginTop: "5rem" }}
      >
        <h2>Course not found</h2>
        <Link to="/courses" className="btn btn-primary">
          Back to Courses
        </Link>
      </div>
    );
  }

  const activeEpisode =
    course.episodes.find((ep) => ep.id === activeEpisodeId) ||
    course.episodes[0];
  const courseProblems = activeEpisode.problems
    .map((pid) => problemsData.find((p) => p.id === pid))
    .filter(Boolean);

  const getCourseDefaultLang = (cId) => {
    if (cId === "programming-c") return "c";
    if (cId === "programming-cpp") return "c++";
    if (cId === "programming-java") return "java";
    if (cId === "programming-js") return "javascript";
    return "python";
  };
  const courseLang = getCourseDefaultLang(course.id);

  return (
    <div className="container">
      <Link
        to="/courses"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--color-text-muted)",
          marginBottom: "2rem",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={18} /> กลับไปหน้าเลือกวิชา
      </Link>

      <div style={{ marginBottom: "2rem" }}>
        <h1
          className="text-gradient"
          style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
        >
          {course.title}
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1.2rem",
            maxWidth: "800px",
          }}
        >
          {course.description}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Video & Info */}
        <div>
          {/* Video Player Section */}
          <div
            className="card"
            style={{
              padding: 0,
              overflow: "hidden",
              marginBottom: "2rem",
              border: `1px solid ${course.color}`,
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: course.color,
                color: "white",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <PlayCircle size={20} /> {activeEpisode.title}
              </h2>
            </div>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                src={`https://www.youtube.com/embed/${activeEpisode.youtubeId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div
              style={{
                padding: "1rem",
                backgroundColor: "var(--color-bg-surface)",
                borderTop: `1px solid var(--border-color)`,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  margin: "0 0 0.5rem 0",
                  color: "var(--color-text-muted)",
                  fontSize: "0.9rem",
                }}
              >
                หากวิดีโอไม่เล่น หรือขึ้นว่า "วิดีโอนี้ไม่สามารถเล่นได้"
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${activeEpisode.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="btn btn-primary"
                  style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}
                >
                  📺 ดูคลิปนี้บน YouTube แทน
                </button>
              </a>
            </div>
          </div>

          {/* Episode Info Section */}
          <div className="card" style={{ marginBottom: "3rem" }}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "1.5rem",
                color: course.color,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Info size={20} /> รายละเอียดบทเรียน
            </h3>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Lightbulb size={16} /> สิ่งที่จะได้เรียนรู้
              </h4>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {activeEpisode.summary}
              </p>
            </div>

            <div
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderLeft: "4px solid #3b82f6",
                borderRadius: "4px",
              }}
            >
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Code size={16} /> การนำไปประยุกต์ใช้ในโค้ด
              </h4>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {activeEpisode.howToUse}
              </p>
            </div>

            <div>
              <h4 style={{ margin: "0 0 0.5rem 0" }}>ตัวอย่าง (Examples):</h4>
              <pre
                style={{
                  margin: 0,
                  padding: "1rem",
                  backgroundColor: "var(--color-bg-base)",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  overflowX: "auto",
                }}
              >
                <code>{activeEpisode.examples}</code>
              </pre>
            </div>
          </div>

          {/* Programming Challenges Section */}
          <h2
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: course.color }}>⚡</span>{" "}
            โจทย์คณิตศาสตร์ประจำตอน
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            {courseProblems.map((problem, index) => (
              <div
                key={problem.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: `4px solid ${course.color}`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "var(--color-bg-base)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      โจทย์ประจำตอนที่ {activeEpisode.id.replace("ep", "")}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        color:
                          problem.diff === "Easy"
                            ? "var(--color-success)"
                            : problem.diff === "Hard"
                              ? "var(--color-error)"
                              : "var(--color-warning)",
                      }}
                    >
                      {problem.diff}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.2rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {problem.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-text-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {problem.description_th}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    paddingLeft: "1rem",
                  }}
                >
                  {solvedProblems.includes(problem.id) && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "var(--color-success)",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                      }}
                    >
                      <CheckCircle size={18} /> ผ่านแล้ว
                    </span>
                  )}
                  <Link
                    to={
                      problem.type === "quiz"
                        ? `/quiz/${problem.id}`
                        : `/lesson/${problem.id}?lang=${courseLang}`
                    }
                  >
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: course.color,
                        borderColor: course.color,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {problem.type === "quiz" ? "ทำแบบฝึกหัด" : "เริ่มทำโจทย์"}{" "}
                      <PlayCircle size={16} style={{ marginLeft: "0.3rem" }} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
            {courseProblems.length === 0 && (
              <div
                className="card"
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "var(--color-text-muted)",
                }}
              >
                ไม่มีโจทย์สำหรับตอนนี้
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Episode Playlist */}
        <div className="card" style={{ position: "sticky", top: "2rem" }}>
          <h3
            style={{
              marginTop: 0,
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ListVideo size={20} /> รายการตอน
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {course.episodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setActiveEpisodeId(ep.id)}
                style={{
                  textAlign: "left",
                  padding: "1rem",
                  backgroundColor:
                    activeEpisodeId === ep.id
                      ? "var(--color-bg-base)"
                      : "transparent",
                  border: `1px solid ${activeEpisodeId === ep.id ? course.color : "var(--border-color)"}`,
                  borderRadius: "var(--border-radius-md)",
                  color:
                    activeEpisodeId === ep.id
                      ? course.color
                      : "var(--color-text)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {activeEpisodeId === ep.id && <PlayCircle size={16} />}
                <span
                  style={{
                    fontWeight: activeEpisodeId === ep.id ? "bold" : "normal",
                    fontSize: "0.95rem",
                  }}
                >
                  {ep.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
