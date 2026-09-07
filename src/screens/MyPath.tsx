import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { RecActions, StatusPill, WhyThis } from "@/components/ui";
import { alternativeGoals, roadmap, type Skill } from "@/data/demo";

function SkillRow({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const { completeLearning } = useByeol();
  return (
    <div className={`skill-card ${open ? "open" : ""}`}>
      <button className="skill-head" onClick={() => setOpen((o) => !o)}>
        <span className="skill-name">{skill.name}</span>
        <StatusPill status={skill.status} />
        <span className="chevron">{open ? "⌄" : "›"}</span>
      </button>
      {open && (
        <div className="skill-body">
          <p className="evidence-label">{t("path_evidence")}</p>
          <ul className="evidence-list">
            {skill.evidence.map((e) => (
              <li key={e.label} className={e.has ? "yes" : "no"}>
                <span>{e.has ? "✓" : "○"}</span> {e.label}
              </li>
            ))}
          </ul>
          <p className="evidence-note">
            Taking a course does not automatically equal mastery — Byeol looks for project or
            applied evidence too.
          </p>
          <WhyThis text={skill.why} />
          {skill.status !== "DEMONSTRATED" && (
            <button className="btn-primary small" onClick={() => completeLearning(skill.id)}>
              {t("act_complete_learning")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function MyPathScreen() {
  const { t } = useLang();
  const { skills, goal, exploring, setExploring, setGoal, counts } = useByeol();
  const evidenced = counts.demonstrated + counts.developing;

  return (
    <div className="stack">
      <h1 className="screen-title">{t("path_title")}</h1>

      <div className="goal-card">
        <p className="hero-kicker">{t("path_goal")}</p>
        <h2 className="hero-goal">{exploring ? "Still exploring" : goal}</h2>
        <p className="prep-status">
          CAREER PREPARATION STATUS · <b>Developing</b> — {evidenced} of {skills.length} priority
          capabilities have evidence
        </p>
        <div className="hero-stats">
          <span className="hero-stat demo">
            <b>{counts.demonstrated}</b> {t("stat_demonstrated")}
          </span>
          <span className="hero-stat dev">
            <b>{counts.developing}</b> {t("stat_developing")}
          </span>
          <span className="hero-stat gap">
            <b>{counts.gaps}</b> {t("stat_gaps")}
          </span>
        </div>
        <button className="link-btn" onClick={() => setExploring(!exploring)}>
          {exploring ? "I know my goal" : "I'm still exploring"}
        </button>
        {exploring && (
          <div className="explore-goals">
            <p className="evidence-note">
              Suggested from your major, courses, skills, projects and interests:
            </p>
            {alternativeGoals.map((g) => (
              <button
                key={g.goal}
                className="goal-suggestion"
                onClick={() => {
                  setGoal(g.goal);
                  setExploring(false);
                }}
              >
                <b>{g.goal}</b>
                <span>{g.because}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="section-title">{t("path_capabilities")}</p>
      {skills.map((s) => (
        <SkillRow key={s.id} skill={s} />
      ))}

      <p className="section-title">{t("path_roadmap")}</p>
      <div className="roadmap">
        <div className="road-node start">
          <span className="road-kicker">{t("path_current_state")}</span>
          <b>Python + Machine Learning</b>
        </div>
        {roadmap.map((step) => {
          const skill = skills.find((s) => s.id === step.skillId);
          const done = skill?.status === "DEMONSTRATED";
          const active = skill && skill.status !== "DEMONSTRATED";
          return (
            <div key={step.id} className={`road-node ${done ? "done" : active ? "active" : ""}`}>
              <span className="road-kicker">STEP {step.order}</span>
              <b>{step.title}</b>
              {skill && <StatusPill status={skill.status} />}
              <p className="road-line">
                <span>{t("path_action")}:</span> {step.action}
              </p>
              <p className="road-line">
                <span>{t("path_evidence_target")}:</span> {step.evidenceTarget}
              </p>
              <RecActions id={`step-${step.id}`} />
            </div>
          );
        })}
        <div className="road-node goal">
          <span className="road-kicker">{t("path_direction")}</span>
          <b>{exploring ? "Still exploring" : goal}</b>
        </div>
      </div>
    </div>
  );
}
