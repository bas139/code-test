import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lock,
  Unlock,
  CheckCircle,
  PlayCircle,
  Code,
  Star,
  Boxes,
  Cpu,
  Divide,
  FunctionSquare,
  CodeSquare,
} from "lucide-react";
import { skillTreeData } from "../data/skillTree";
import { problemsData } from "../data/problems";
import { useUser } from "../contexts/UserContext";

const getIcon = (iconName) => {
  switch (iconName) {
    case "Boxes":
      return <Boxes size={28} />;
    case "Cpu":
      return <Cpu size={28} />;
    case "Divide":
      return <Divide size={28} />;
    case "FunctionSquare":
      return <FunctionSquare size={28} />;
    case "CodeSquare":
      return <CodeSquare size={28} />;
    default:
      return <Code size={28} />;
  }
};

export default function Courses() {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(null);

  const solvedProblems = userData?.solvedProblems || [];

  // Logic to determine if a node is unlocked
  const isNodeUnlocked = (node) => {
    if (node.prerequisites.length === 0) return true;

    // Check if all prerequisites are COMPLETED
    return node.prerequisites.every((prereqId) => {
      const prereqNode = skillTreeData.find((n) => n.id === prereqId);
      if (!prereqNode) return true;
      // A node is completed if ALL its problems are solved
      return prereqNode.problems.every((pId) => solvedProblems.includes(pId));
    });
  };

  // Logic to determine if a node is completed
  const isNodeCompleted = (node) => {
    if (node.problems.length === 0) return false;
    return node.problems.every((pId) => solvedProblems.includes(pId));
  };

  const getNodeStatus = (node) => {
    if (isNodeCompleted(node)) return "completed";
    if (isNodeUnlocked(node)) return "unlocked";
    return "locked";
  };

  return (
    <div className="container" style={{ paddingBottom: "5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          className="text-gradient"
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Star size={40} color="#f59e0b" /> เส้นทางผู้กล้า (Skill Tree){" "}
          <Star size={40} color="#f59e0b" />
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          ผจญภัยไปในโลกของโค้ดดิ้ง ปลดล็อกด่านต่างๆ
          เพื่อก้าวสู่การเป็นโปรแกรมเมอร์ระดับมาสเตอร์!
        </p>
      </div>

      {/* Map Layout Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4rem",
          position: "relative",
          padding: "2rem 0",
        }}
      >
        {/* Background path line */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            bottom: "50px",
            left: "50%",
            width: "8px",
            backgroundColor: "var(--border-color)",
            transform: "translateX(-50%)",
            zIndex: 0,
            borderRadius: "4px",
          }}
        ></div>

        {skillTreeData.map((node, index) => {
          const status = getNodeStatus(node);
          const isLocked = status === "locked";
          const isCompleted = status === "completed";

          // Zigzag offset
          const isEven = index % 2 === 0;
          const translateX = isEven ? "-120px" : "120px";

          return (
            <div
              key={node.id}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateX(${translateX})`,
                transition: "transform 0.3s",
              }}
            >
              {/* Node Button */}
              <button
                onClick={() => !isLocked && setSelectedNode(node)}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  backgroundColor: isLocked
                    ? "var(--color-bg-surface)"
                    : isCompleted
                      ? node.color
                      : "var(--color-bg-base)",
                  border: `4px solid ${isLocked ? "var(--border-color)" : node.color}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: isLocked ? "not-allowed" : "pointer",
                  boxShadow: isLocked ? "none" : `0 0 20px ${node.color}40`,
                  color: isLocked
                    ? "var(--color-text-muted)"
                    : isCompleted
                      ? "#fff"
                      : node.color,
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                className={!isLocked ? "hover-scale" : ""}
              >
                {isLocked ? (
                  <Lock size={32} />
                ) : isCompleted ? (
                  <CheckCircle size={40} />
                ) : (
                  getIcon(node.icon)
                )}

                {/* Status Badge */}
                {!isLocked && !isCompleted && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "var(--color-warning)",
                      color: "#000",
                      borderRadius: "50%",
                      padding: "0.4rem",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Unlock size={16} />
                  </div>
                )}
              </button>

              {/* Node Label */}
              <div
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  backgroundColor: "var(--color-bg-surface)",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)",
                  boxShadow: "var(--shadow-sm)",
                  opacity: isLocked ? 0.6 : 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    color: isLocked
                      ? "var(--color-text-muted)"
                      : "var(--color-text-main)",
                  }}
                >
                  {node.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {
                    node.problems.filter((p) => solvedProblems.includes(p))
                      .length
                  }{" "}
                  / {node.problems.length} ภารกิจ
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Modal / Expansion */}
      {selectedNode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div
            className="card hover-scale"
            style={{
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              borderTop: `6px solid ${selectedNode.color}`,
              animation: "fadeIn 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    padding: "0.8rem",
                    backgroundColor: `${selectedNode.color}20`,
                    color: selectedNode.color,
                    borderRadius: "var(--border-radius-md)",
                  }}
                >
                  {getIcon(selectedNode.icon)}
                </div>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      color: "var(--color-text-main)",
                    }}
                  >
                    {selectedNode.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-text-muted)",
                      marginTop: "0.3rem",
                    }}
                  >
                    {selectedNode.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
              >
                &times;
              </button>
            </div>

            <h3
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
              }}
            >
              ภารกิจในด่านนี้:
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {selectedNode.problems.map((problemId) => {
                const problem = problemsData.find((p) => p.id === problemId);
                if (!problem) return null;

                const isSolved = solvedProblems.includes(problem.id);

                return (
                  <div
                    key={problem.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      backgroundColor: "var(--color-bg-base)",
                      borderRadius: "var(--border-radius-md)",
                      borderLeft: `4px solid ${isSolved ? "var(--color-success)" : "var(--color-warning)"}`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {isSolved ? (
                          <CheckCircle size={16} color="var(--color-success)" />
                        ) : (
                          <PlayCircle size={16} color="var(--color-warning)" />
                        )}
                        <h4
                          style={{ margin: 0, color: "var(--color-text-main)" }}
                        >
                          {problem.title}
                        </h4>
                      </div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          padding: "0.1rem 0.5rem",
                          borderRadius: "10px",
                          backgroundColor:
                            problem.diff === "Easy"
                              ? "rgba(34, 197, 94, 0.1)"
                              : problem.diff === "Hard"
                                ? "rgba(239, 68, 68, 0.1)"
                                : "rgba(245, 158, 11, 0.1)",
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

                    <button
                      className={
                        isSolved ? "btn btn-secondary" : "btn btn-primary"
                      }
                      onClick={() =>
                        navigate(
                          problem.type === "quiz"
                            ? `/quiz/${problem.id}`
                            : `/lesson/${problem.id}`,
                        )
                      }
                    >
                      {isSolved ? "ทบทวน" : "เริ่มภารกิจ"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
