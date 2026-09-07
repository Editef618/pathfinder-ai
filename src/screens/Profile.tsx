import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { StatusPill } from "@/components/ui";
import { student } from "@/data/demo";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="profile-field">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export function ProfileScreen({ go }: { go: (s: string) => void }) {
  const { t } = useLang();
  const { skills, goal, setGoal, exploring, setExploring } = useByeol();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goal);

  return (
    <div className="stack">
      <h1 className="screen-title">{t("profile_title")}</h1>
      <div className="profile-head">
        <div className="avatar-circle">{student.initials}</div>
        <div>
          <p className="profile-name">{student.name}</p>
          <span className="goal-chip">
            {student.major} · {student.year}
          </span>
        </div>
        <span className="edit-link" onClick={() => setEditing((e) => !e)}>
          {editing ? "Done" : "Edit"}
        </span>
      </div>

      <div className="card">
        <Field label="University" value={student.university} />
        <Field label="Major" value={student.major} />
        <Field label="Year" value={student.year} />
        <div className="profile-field">
          <span>Career goal</span>
          {editing ? (
            <span className="edit-inline">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} />
              <button
                className="btn-small"
                onClick={() => {
                  setGoal(draft);
                  setExploring(false);
                }}
              >
                Save
              </button>
            </span>
          ) : (
            <b>{exploring ? "Still exploring" : goal}</b>
          )}
        </div>
        <div className="profile-field">
          <span>Goal status</span>
          <button className="link-btn" onClick={() => setExploring(!exploring)}>
            {exploring ? "I know my goal" : "I'm still exploring"}
          </button>
        </div>
        <Field label="Career interests" value={student.interests.join(", ")} />
        <Field label="Learning preferences" value={student.learningPreferences.join(", ")} />
        <Field label="CV / portfolio (optional)" value={student.portfolio} />
      </div>

      <p className="section-title">Courses</p>
      <div className="card">
        {student.courses.map((c) => (
          <div className="profile-field" key={c.name}>
            <span>{c.name}</span>
            <b>
              {c.term} · {c.status}
            </b>
          </div>
        ))}
      </div>

      <p className="section-title">Skills</p>
      <div className="card">
        {skills.map((s) => (
          <div className="profile-field" key={s.id}>
            <span>{s.name}</span>
            <StatusPill status={s.status} />
          </div>
        ))}
        <button className="link-btn" onClick={() => go("path")}>
          See evidence in My Path
        </button>
      </div>

      <p className="section-title">Projects &amp; evidence</p>
      <div className="card">
        {student.projects.map((p) => (
          <div className="profile-field" key={p.name}>
            <span>{p.name}</span>
            <b>{p.skills.join(", ")}</b>
          </div>
        ))}
      </div>

      <p className="section-title">Certifications</p>
      <div className="card">
        {student.certifications.map((c) => (
          <div className="profile-field" key={c.name}>
            <span>{c.name}</span>
            <b>{c.status}</b>
          </div>
        ))}
      </div>

      <div className="mini-links">
        <button onClick={() => go("privacy")}>Privacy &amp; data</button>
        <button onClick={() => go("onboarding")}>Re-run onboarding</button>
      </div>
    </div>
  );
}
