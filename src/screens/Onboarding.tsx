import { useState } from "react";
import { useByeol } from "@/lib/store";
import { Mascot } from "@/components/ui";
import { student } from "@/data/demo";

const STEPS = [
  "University",
  "Major + Year",
  "Courses",
  "Skills + Projects",
  "Career goal",
  "CV / portfolio (optional)",
  "Privacy + personalisation",
];

export function OnboardingScreen({ go }: { go: (s: string) => void }) {
  const [step, setStep] = useState(0);
  const [building, setBuilding] = useState(false);
  const { setExploring, employerMatching, setEmployerMatching } = useByeol();

  if (building) {
    return (
      <div className="stack onboard-analyse">
        <Mascot size={64} />
        <h2 className="hero-goal">Byeol is analysing your profile…</h2>
        <p className="feed-sub">
          Mapping courses and projects to capabilities, comparing them with your career goal.
        </p>
        <button className="btn-primary" onClick={() => go("path")}>
          Open My Path
        </button>
      </div>
    );
  }

  return (
    <div className="stack">
      <h1 className="screen-title">Set up Byeol</h1>
      <div className="onboard-steps">
        {STEPS.map((s, i) => (
          <span key={s} className={`onboard-pip ${i === step ? "active" : i < step ? "done" : ""}`}>
            {i + 1}
          </span>
        ))}
      </div>
      <div className="card onboard-card">
        <p className="hero-kicker">STEP {step + 1} OF {STEPS.length}</p>
        <h2 className="action-title" style={{ fontSize: 18 }}>
          {STEPS[step]}
        </h2>

        {step === 0 && <input className="onboard-input" defaultValue={student.university} />}
        {step === 1 && (
          <>
            <input className="onboard-input" defaultValue={student.major} />
            <input className="onboard-input" defaultValue={student.year} />
          </>
        )}
        {step === 2 && (
          <ul className="evidence-list">
            {student.courses.map((c) => (
              <li className="yes" key={c.name}>
                <span>✓</span> {c.name}
              </li>
            ))}
          </ul>
        )}
        {step === 3 && (
          <ul className="evidence-list">
            {["Python", "Machine Learning", "C++ (introductory)"].map((s) => (
              <li className="yes" key={s}>
                <span>✓</span> {s}
              </li>
            ))}
            {student.projects.map((p) => (
              <li className="yes" key={p.name}>
                <span>✓</span> {p.name}
              </li>
            ))}
          </ul>
        )}
        {step === 4 && (
          <div className="rec-actions">
            <button
              className="rec-btn primary"
              onClick={() => {
                setExploring(false);
                setStep(5);
              }}
            >
              I know my goal — Robotics / AI Engineer
            </button>
            <button
              className="rec-btn"
              onClick={() => {
                setExploring(true);
                setStep(5);
              }}
            >
              I'm still exploring
            </button>
          </div>
        )}
        {step === 5 && (
          <input className="onboard-input" placeholder="Link a CV or portfolio (optional)" />
        )}
        {step === 6 && (
          <div>
            <p className="feed-sub">
              Byeol uses only what you provide plus official/public university information.
              Universities see aggregated, de-identified insights only.
            </p>
            <button
              className={`rec-btn ${employerMatching ? "chosen" : ""}`}
              onClick={() => setEmployerMatching(!employerMatching)}
              style={{ marginTop: 10 }}
            >
              Employer matching: {employerMatching ? "ON" : "OFF (default)"}
            </button>
          </div>
        )}

        <div className="rec-actions" style={{ marginTop: 14 }}>
          {step > 0 && (
            <button className="rec-btn" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button className="rec-btn primary" onClick={() => setStep(step + 1)}>
              Continue
            </button>
          ) : (
            <button className="rec-btn primary" onClick={() => setBuilding(true)}>
              Build my path
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
