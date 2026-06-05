import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Target, Flame, Star, Code2, Trophy, Zap, Shield } from "lucide-react";
import { getLevelInfo } from "../utils/gamification";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

const activityData = [
  { name: "Mon", score: 120 },
  { name: "Tue", score: 200 },
  { name: "Wed", score: 150 },
  { name: "Thu", score: 320 },
  { name: "Fri", score: 280 },
  { name: "Sat", score: 450 },
  { name: "Sun", score: 500 },
];

const languageData = [
  { name: "Python", problems: 45 },
  { name: "JS", problems: 30 },
  { name: "C++", problems: 15 },
  { name: "Java", problems: 10 },
];

export default function Dashboard() {
  const { userData } = useUser();
  const { user } = useAuth();

  const { level, rank, nextLevelXP, progressPercent } = getLevelInfo(
    userData.xp,
  );

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h2
            className="text-gradient"
            style={{ marginBottom: "0.5rem", fontSize: "2.5rem" }}
          >
            Coder Profile
          </h2>
          <p
            style={{
              color: "var(--color-text-muted)",
              margin: 0,
              fontSize: "1.1rem",
            }}
          >
            Welcome back, {user ? user.displayName : "Hacker"}!
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "var(--color-bg-base)",
              padding: "0.5rem 1rem",
              borderRadius: "30px",
              border: "1px solid var(--border-color)",
            }}
          >
            <Shield size={20} color="var(--color-secondary)" />
            <span
              style={{ fontWeight: "bold", color: "var(--color-text-main)" }}
            >
              Rank: {rank}
            </span>
          </div>
        </div>
      </div>

      {/* Level Progress Banner */}
      <div
        className="card"
        style={{
          marginBottom: "2rem",
          background:
            "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
          border: "1px solid rgba(249, 115, 22, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "1.8rem",
                fontWeight: "bold",
                boxShadow: "0 0 20px rgba(249, 115, 22, 0.4)",
              }}
            >
              {level}
            </div>
            <div>
              <h3
                style={{
                  margin: "0 0 0.3rem 0",
                  fontSize: "1.5rem",
                  color: "var(--color-text-main)",
                }}
              >
                Level {level}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-primary-light)",
                  fontWeight: "bold",
                }}
              >
                {userData.xp} / {nextLevelXP} XP
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right", color: "var(--color-text-muted)" }}>
            <p style={{ margin: 0 }}>
              {nextLevelXP - userData.xp} XP to Level {level + 1}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "12px",
            backgroundColor: "var(--color-bg-base)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
              borderRadius: "10px",
              transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          ></div>
        </div>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transition: "transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--color-primary)",
              borderRadius: "50%",
              color: "white",
              boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)",
            }}
          >
            <Zap size={24} />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Total Experience
            </p>
            <h3
              style={{
                margin: "0.3rem 0 0 0",
                fontSize: "1.8rem",
                color: "var(--color-text-main)",
              }}
            >
              {userData.xp}
            </h3>
          </div>
        </div>
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transition: "transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#eab308",
              borderRadius: "50%",
              color: "black",
              boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)",
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Day Streak
            </p>
            <h3
              style={{
                margin: "0.3rem 0 0 0",
                fontSize: "1.8rem",
                color: "var(--color-text-main)",
              }}
            >
              14 Days
            </h3>
          </div>
        </div>
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transition: "transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--color-secondary)",
              borderRadius: "50%",
              color: "white",
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            }}
          >
            <Code2 size={24} />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Problems Solved
            </p>
            <h3
              style={{
                margin: "0.3rem 0 0 0",
                fontSize: "1.8rem",
                color: "var(--color-text-main)",
              }}
            >
              {userData.solvedProblems.length}
            </h3>
          </div>
        </div>
        <div
          className="card"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            transition: "transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
              color: "white",
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
            }}
          >
            <Trophy size={24} />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Global Rank
            </p>
            <h3
              style={{
                margin: "0.3rem 0 0 0",
                fontSize: "1.8rem",
                color: "var(--color-text-main)",
              }}
            >
              #{Math.max(1, 1000 - userData.xp)}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
        }}
      >
        <div className="card">
          <h3
            style={{ marginBottom: "1.5rem", color: "var(--color-text-muted)" }}
          >
            Learning Activity (This Week)
          </h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "var(--color-primary)" }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--color-primary)" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3
            style={{ marginBottom: "1.5rem", color: "var(--color-text-muted)" }}
          >
            Language Mastery
          </h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={languageData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-surface)",
                    borderColor: "var(--border-color)",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                />
                <Bar
                  dataKey="problems"
                  fill="var(--color-secondary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
