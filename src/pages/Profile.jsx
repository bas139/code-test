import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { getLevelInfo } from "../utils/gamification";
import { Save, LogOut, Medal, User, Award, CheckCircle } from "lucide-react";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const { userData } = useUser();
  const levelInfo = getLevelInfo(userData.xp);

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "Guest");

  const handleSave = () => {
    updateProfile({ displayName });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", marginTop: "5rem" }}
      >
        <h2>กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์ของคุณ</h2>
        <p style={{ color: "var(--color-text-muted)" }}>
          ข้อมูล XP และเหรียญตราของคุณจะถูกเก็บไว้ชั่วคราวในเครื่อง หากล็อกอิน
          ข้อมูลจะถูกบันทึกขึ้น Cloud
        </p>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", padding: "2rem 1rem" }}
    >
      <h1
        className="text-gradient"
        style={{
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <User size={32} /> โปรไฟล์ของคุณ
      </h1>

      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={user.photoURL}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: `4px solid var(--color-primary)`,
              backgroundColor: "var(--color-bg-base)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--color-primary)",
              color: "white",
              padding: "0.2rem 0.8rem",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            Lv.{levelInfo.level}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "var(--color-primary)",
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginBottom: "0.2rem",
            }}
          >
            {levelInfo.rank}
          </div>
          {isEditing ? (
            <div
              style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
            >
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "var(--border-radius-sm)",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--color-bg-base)",
                  color: "var(--color-text-main)",
                  fontSize: "1.2rem",
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleSave}
                style={{ padding: "0.5rem 1rem" }}
              >
                <Save size={18} /> Save
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ fontSize: "2rem", margin: 0 }}>
                {user.displayName}
              </h2>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
                style={{ padding: "0.2rem 0.8rem", fontSize: "0.85rem" }}
              >
                Edit Name
              </button>
            </div>
          )}

          <div style={{ color: "var(--color-text-muted)" }}>{user.email}</div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: "2rem",
              color: "var(--color-text-muted)",
              fontSize: "0.95rem",
            }}
          >
            <div>
              <span
                style={{ fontWeight: "bold", color: "var(--color-text-main)" }}
              >
                {userData.xp.toLocaleString()}
              </span>{" "}
              XP Total
            </div>
            <div>
              <span
                style={{ fontWeight: "bold", color: "var(--color-text-main)" }}
              >
                {userData.solvedProblems.length}
              </span>{" "}
              Problems Solved
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn btn-secondary"
            onClick={logout}
            style={{
              borderColor: "var(--color-error)",
              color: "var(--color-error)",
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "1rem",
          }}
        >
          <Award size={24} color="var(--color-warning)" /> ตู้โชว์เหรียญตรา
          (Badges)
        </h2>

        {userData.badges.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {userData.badges.map((badge) => (
              <div
                key={badge.id}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "rgba(234, 179, 8, 0.1)",
                  border: "1px solid rgba(234, 179, 8, 0.3)",
                  borderRadius: "var(--border-radius-md)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
                  }}
                >
                  {badge.icon}
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "var(--color-warning)",
                    fontSize: "1.1rem",
                  }}
                >
                  {badge.name}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {badge.desc}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "var(--color-text-muted)",
              padding: "2rem 0",
            }}
          >
            <Medal size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
            <p>
              คุณยังไม่ได้รับเหรียญตราใดๆ เริ่มทำโจทย์เพื่อสะสมเหรียญตราเลย!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
