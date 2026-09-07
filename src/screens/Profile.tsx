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
  const { t, tx } = useLang();
  const { skills, goal, setGoal, exploring, setExploring } = useByeol();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(goal);

  return (
    <div className="stack">
      <h1 className="screen-title">{t("profile_title")}</h1>
      <div className="profile-head">
        <div className="avatar-circle">{student.initials}</div>
        <div>
          <p className="profile-name">{tx(student.name)}</p>
          <span className="goal-chip">
            {tx(student.major)} · {tx(student.year)}
          </span>
        </div>
        <span className="edit-link" onClick={() => setEditing((e) => !e)}>
          {editing ? t("pf_done") : t("pf_edit")}
        </span>
      </div>

      <div className="card">
        <Field label={t("pf_university")} value={tx(student.university)} />
        <Field label={t("pf_major")} value={tx(student.major)} />
        <Field label={t("pf_year")} value={tx(student.year)} />
        <div className="profile-field">
          <span>{t("pf_goal")}</span>
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
                {t("pf_save")}
              </button>
            </span>
          ) : (
            <b>{exploring ? t("still_exploring") : tx(goal)}</b>
          )}
        </div>
        <div className="profile-field">
          <span>{t("pf_goal_status")}</span>
          <button className="link-btn" onClick={() => setExploring(!exploring)}>
            {exploring ? t("path_know_goal") : t("path_im_exploring")}
          </button>
        </div>
        <Field label={t("pf_interests")} value={student.interests.map(tx).join(", ")} />
        <Field label={t("pf_prefs")} value={student.learningPreferences.map(tx).join(", ")} />
        <Field label={t("pf_portfolio")} value={student.portfolio} />
      </div>

      <p className="section-title">{t("pf_courses")}</p>
      <div className="card">
        {student.courses.map((c) => (
          <div className="profile-field" key={c.name}>
            <span>{tx(c.name)}</span>
            <b>
              {tx(c.term)} · {tx(c.status)}
            </b>
          </div>
        ))}
      </div>

      <p className="section-title">{t("pf_skills")}</p>
      <div className="card">
        {skills.map((s) => (
          <div className="profile-field" key={s.id}>
            <span>{tx(s.name)}</span>
            <StatusPill status={s.status} />
          </div>
        ))}
        <button className="link-btn" onClick={() => go("path")}>
          {t("pf_see_evidence")}
        </button>
      </div>

      <p className="section-title">{t("pf_projects")}</p>
      <div className="card">
        {student.projects.map((p) => (
          <div className="profile-field" key={p.name}>
            <span>{tx(p.name)}</span>
            <b>{p.skills.map(tx).join(", ")}</b>
          </div>
        ))}
      </div>

      <p className="section-title">{t("pf_certs")}</p>
      <div className="card">
        {student.certifications.map((c) => (
          <div className="profile-field" key={c.name}>
            <span>{tx(c.name)}</span>
            <b>{tx(c.status)}</b>
          </div>
        ))}
      </div>

      <div className="mini-links">
        <button onClick={() => go("privacy")}>{t("nav_privacy")}</button>
        <button onClick={() => go("onboarding")}>{t("pf_rerun")}</button>
      </div>
    </div>
  );
}
