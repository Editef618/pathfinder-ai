import { useState } from "react";
import { useByeol } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { Mascot } from "@/components/ui";
import { student } from "@/data/demo";

const STEPS = ["ob_s1", "ob_s2", "ob_s3", "ob_s4", "ob_s5", "ob_s6", "ob_s7"];

export function OnboardingScreen({ go }: { go: (s: string) => void }) {
  const [step, setStep] = useState(0);
  const [building, setBuilding] = useState(false);
  const { setExploring, employerMatching, setEmployerMatching } = useByeol();
  const { t, tx } = useLang();

  if (building) {
    return (
      <div className="stack onboard-analyse">
        <Mascot size={64} />
        <h2 className="hero-goal">{t("ob_building")}</h2>
        <p className="feed-sub">{t("ob_building_sub")}</p>
        <button className="btn-primary" onClick={() => go("path")}>
          {t("home_open_path")}
        </button>
      </div>
    );
  }

  return (
    <div className="stack">
      <h1 className="screen-title">{t("ob_title")}</h1>
      <div className="onboard-steps">
        {STEPS.map((s, i) => (
          <span key={s} className={`onboard-pip ${i === step ? "active" : i < step ? "done" : ""}`}>
            {i + 1}
          </span>
        ))}
      </div>
      <div className="card onboard-card">
        <p className="hero-kicker">{t("ob_step", { n: step + 1, m: STEPS.length })}</p>
        <h2 className="action-title" style={{ fontSize: 18 }}>
          {t(STEPS[step]!)}
        </h2>

        {step === 0 && (
          <input className="onboard-input" key={student.university} defaultValue={tx(student.university)} />
        )}
        {step === 1 && (
          <>
            <input className="onboard-input" key={student.major} defaultValue={tx(student.major)} />
            <input className="onboard-input" key={student.year} defaultValue={tx(student.year)} />
          </>
        )}
        {step === 2 && (
          <ul className="evidence-list">
            {student.courses.map((c) => (
              <li className="yes" key={c.name}>
                <span>✓</span> {tx(c.name)}
              </li>
            ))}
          </ul>
        )}
        {step === 3 && (
          <ul className="evidence-list">
            {["Python", "Machine Learning", "C++"].map((s) => (
              <li className="yes" key={s}>
                <span>✓</span> {tx(s)}
              </li>
            ))}
            {student.projects.map((p) => (
              <li className="yes" key={p.name}>
                <span>✓</span> {tx(p.name)}
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
              {t("ob_know_goal")}
            </button>
            <button
              className="rec-btn"
              onClick={() => {
                setExploring(true);
                setStep(5);
              }}
            >
              {t("ob_exploring")}
            </button>
          </div>
        )}
        {step === 5 && (
          <input className="onboard-input" placeholder={t("ob_cv_placeholder")} />
        )}
        {step === 6 && (
          <div>
            <p className="feed-sub">{t("ob_privacy_text")}</p>
            <button
              className={`rec-btn ${employerMatching ? "chosen" : ""}`}
              onClick={() => setEmployerMatching(!employerMatching)}
              style={{ marginTop: 10 }}
            >
              {t("ob_employer", { x: employerMatching ? t("ob_on") : t("ob_off") })}
            </button>
          </div>
        )}

        <div className="rec-actions" style={{ marginTop: 14 }}>
          {step > 0 && (
            <button className="rec-btn" onClick={() => setStep(step - 1)}>
              {t("ob_back")}
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button className="rec-btn primary" onClick={() => setStep(step + 1)}>
              {t("ob_continue")}
            </button>
          ) : (
            <button className="rec-btn primary" onClick={() => setBuilding(true)}>
              {t("ob_build")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
