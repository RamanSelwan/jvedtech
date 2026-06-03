import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["WATCH DEMO", "EXPLORE COURSES", "MY DASHBOARD"];

const COURSES = [
  { title: "AI & Machine Learning", level: "Intermediate", duration: "8 weeks", color: "#4ecdc4" },
  { title: "Data Science Fundamentals", level: "Beginner", duration: "6 weeks", color: "#88d8b0" },
  { title: "Deep Learning Specialization", level: "Advanced", duration: "12 weeks", color: "#45b7d1" },
  { title: "Python for AI", level: "Beginner", duration: "4 weeks", color: "#96c93d" },
  { title: "Natural Language Processing", level: "Advanced", duration: "10 weeks", color: "#6bcfb8" },
  { title: "Computer Vision", level: "Intermediate", duration: "8 weeks", color: "#a8e6cf" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function VideoModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(20,40,30,0.95)",
          borderRadius: "20px",
          padding: "32px",
          maxWidth: "520px",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.15)",
          animation: "slideUp 0.3s ease",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "12px" }}>
          Luminary in Action
        </h2>

        <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          See how our AI adapts to your learning style in real time.
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 24px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function CoursesPanel({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,35,25,0.97)",
          borderRadius: "20px",
          padding: "32px",
          maxWidth: "640px",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "24px" }}>
          Explore Courses
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {COURSES.map((course) => (
            <div
              key={course.title}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "18px",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: course.color,
                  marginBottom: "10px",
                }}
              />

              <div style={{ fontWeight: 600 }}>{course.title}</div>

              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "4px",
                }}
              >
                {course.level} · {course.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPanel({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,35,25,0.97)",
          borderRadius: "20px",
          padding: "32px",
          maxWidth: "520px",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "16px" }}>
          My Dashboard
        </h2>

        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: "14px",
            padding: "18px",
          }}
        >
          <div style={{ color: "#4ecdc4", fontSize: "28px" }}>68%</div>

          <div style={{ color: "rgba(255,255,255,0.6)" }}>
            Course Completion
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LuminaryHero() {
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState(null);

  const [headingRef, headingInView] = useInView(0.1);
  const [subRef, subInView] = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(135deg, #a8e6cf, #88d8b0, #6bcfb8, #4ecdc4, #45b7d1, #96c93d)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        }}
      />

      {/* Floating blobs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,230,160,0.5) 0%, transparent 70%)",
            top: "-20%",
            left: "-10%",
            animation: "blobFloat1 12s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(120,200,200,0.45) 0%, transparent 70%)",
            bottom: "-10%",
            right: "-5%",
            animation: "blobFloat2 15s ease-in-out infinite",
          }}
        />

        <div style={{
          position: "absolute",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,180,140,0.35) 0%, transparent 70%)",
          top: "30%",
          right: "20%",
          animation: "blobFloat3 10s ease-in-out infinite"
          }} 
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Hero */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <div
            ref={headingRef}
            style={{
              overflow: "hidden",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(47px, 8vw, 90px)",
                color: "#fff",
                fontWeight: 300,
                opacity: headingInView && mounted ? 1 : 0,
                transform:
                  headingInView && mounted
                    ? "translateY(0)"
                    : "translateY(60px)",
                transition: "all 1.5s ease",
              }}
            >
              Revolutionizing Healthcare Through Innovation and Excellence!
            </h1>
          </div>

          <div ref={subRef} style={{ maxWidth: "560px" }}>
            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.7,
                opacity: subInView && mounted ? 1 : 0,
                transform:
                  subInView && mounted
                    ? "translateY(0)"
                    : "translateY(30px)",
                transition: "all 1.5s ease",
              }}
            >
              Empowering Lives with Cutting-Edge Solutions in Education, Wellness, and Technology
            </p>
          </div>

          <div style={{ height: 24 }} />
        </div>
      </div>

      {/* Modals */}
      {modal === "demo" && <VideoModal onClose={() => setModal(null)} />}
      {modal === "courses" && <CoursesPanel onClose={() => setModal(null)} />}
      {modal === "dashboard" && (
        <DashboardPanel onClose={() => setModal(null)} />
      )}

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes blobFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(3%,5%) scale(1.05); }
        }

        @keyframes blobFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-4%,-3%) scale(1.07); }
        }

        @keyframes blobFloat3 {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(1.1);
          }
          66% {
            transform: translate(30px, -20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}