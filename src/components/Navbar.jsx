import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Terminal,
  LayoutDashboard,
  Trophy,
  BookOpen,
  GraduationCap,
  Zap,
  Sun,
  Moon,
  LogIn,
  PlayCircle,
} from "lucide-react";
import { getLevelInfo } from "../utils/gamification";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const { user, loginWithGoogle } = useAuth();
  const { userData } = useUser();
  const { isDarkMode, toggleTheme } = useTheme();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const { level } = getLevelInfo(userData.xp);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await loginWithGoogle();
    setIsLoggingIn(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand text-gradient">
        CodeMastery
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive("/")}`}>
          <BookOpen
            size={18}
            style={{ display: "inline", marginRight: "4px" }}
          />
          Lessons
        </Link>
        <Link to="/courses" className={`nav-link ${isActive("/courses")}`}>
          <GraduationCap
            size={18}
            style={{ display: "inline", marginRight: "4px" }}
          />
          Skill Tree
        </Link>
        <Link to="/videos" className={`nav-link ${isActive("/videos")}`}>
          <PlayCircle
            size={18}
            style={{ display: "inline", marginRight: "4px" }}
          />
          Video Courses
        </Link>
        <Link to="/codebox" className={`nav-link ${isActive("/codebox")}`}>
          <Terminal
            size={18}
            style={{ display: "inline", marginRight: "4px" }}
          />
          Codebox
        </Link>
        <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>
          <LayoutDashboard
            size={18}
            style={{ display: "inline", marginRight: "4px" }}
          />
          Dashboard
        </Link>
        <Link
          to="/leaderboard"
          className={`nav-link ${isActive("/leaderboard")}`}
        >
          <Trophy size={18} style={{ display: "inline", marginRight: "4px" }} />
          Leaderboard
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            color: "var(--color-text-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.4rem",
          }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderRadius: "20px",
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            border: "1px solid var(--color-primary)",
          }}
        >
          <Zap size={16} color="var(--color-primary)" />
          <span
            style={{
              fontWeight: "bold",
              color: "var(--color-primary)",
              fontSize: "0.9rem",
            }}
          >
            Lvl {level}
          </span>
          <span
            style={{ color: "var(--color-text-muted)", fontSize: "0.8rem" }}
          >
            ({userData.xp} XP)
          </span>
        </div>

        {user ? (
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={user.photoURL}
              alt="Avatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "var(--color-bg-base)",
              }}
            />
            <span style={{ fontWeight: "500" }}>{user.displayName}</span>
          </Link>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={isLoggingIn}
            style={{
              padding: "0.4rem 1rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            {isLoggingIn ? (
              <div
                className="spinner"
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid white",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                }}
              ></div>
            ) : (
              <LogIn size={16} />
            )}
            {isLoggingIn ? "..." : "Sign In"}
          </button>
        )}
      </div>
    </nav>
  );
}
