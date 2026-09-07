import { DemoBadge, LangPicker, Mascot } from "@/components/ui";
import { employerDemo, universityDemo, universityValue } from "@/data/demo";
import { useByeol } from "@/lib/store";

function AdminShell({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="browser admin">
      <div className="browser-bar">
        <span className="traffic" style={{ background: "#FF6058" }} />
        <span className="traffic" style={{ background: "#FFBD2E" }} />
        <span className="traffic" style={{ background: "#28CA41" }} />
        <div className="browser-url">byeol.app/admin</div>
      </div>
      <div className="admin-body">
        <div className="admin-head">
          <div className="logo-row" style={{ margin: 0 }}>
            <Mascot size={30} />
            <div>
              <p className="admin-title">{title}</p>
              <p className="admin-sub">{subtitle}</p>
            </div>
          </div>
          <div className="admin-head-right">
            <DemoBadge text={badge} />
            <LangPicker />
          </div>
        </div>
        <div className="banner">
          <div className="dot" />
          <p>
            Byeol provides aggregated, de-identified, program- and department-level insights without
            exposing private student conversations, notes, transcripts or personal records.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function UniversityAdmin() {
  return (
    <AdminShell
      title="University dashboard"
      subtitle="Illustrative university network · University A (demo environment)"
      badge="DEMO DATA — NOT LIVE UNIVERSITY RESULTS"
    >
      <p className="admin-area-title">1 · Student engagement</p>
      <div className="metric-grid">
        {universityValue.engagement.map((m) => (
          <div className="metric-card" key={m.label}>
            <p className="metric-value">{m.value}</p>
            <p className="metric-label">{m.label}</p>
            <span className="metric-tag">{m.note}</span>
          </div>
        ))}
      </div>

      <p className="admin-area-title">2 · Career &amp; skill-gap intelligence</p>
      <div className="metric-grid">
        {universityValue.intelligence.map((m) => (
          <div className="metric-card" key={m.label}>
            <p className="metric-value">{m.value}</p>
            <p className="metric-label">{m.label}</p>
            <span className="metric-tag">{m.note}</span>
          </div>
        ))}
      </div>

      <p className="section-title">
        Top aggregate skill gaps <DemoBadge />
      </p>
      <div className="card">
        {universityDemo.skillGaps.map((g) => (
          <div className="gap-row" key={g.skill}>
            <div className="gap-main">
              <span>{g.skill}</span>
              <div className="gap-bar">
                <div style={{ width: `${g.share}%` }} />
              </div>
              <span className="gap-share">{g.share}% of cohort (illustrative)</span>
            </div>
            <div className="gap-response">
              <span>POTENTIAL SUPPORT RESPONSE</span>
              <b>{g.response}</b>
            </div>
          </div>
        ))}
        <p className="evidence-note">
          Byeol informs university staff. It does not automatically redesign curriculum.
        </p>
      </div>

      <p className="admin-area-title">3 · Actionable support decisions</p>
      <div className="decision-grid">
        {universityValue.decisions.map((d) => (
          <div className="decision-card" key={d.skill}>
            <p className="decision-skill">{d.skill}</p>
            <span className="decision-insight">{d.insight}</span>
            <div className="decision-arrow">↓</div>
            <p className="decision-kicker">POTENTIAL SUPPORT RESPONSE</p>
            <div className="decision-arrow">↓</div>
            <div className="decision-responses">
              {d.responses.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="evidence-note">
        Insight → decision → student support. University staff choose the response; Byeol never
        changes curriculum automatically. All figures are illustrative demo data.
      </p>

      <div className="admin-cols">
        <div className="card">
          <p className="section-title" style={{ marginTop: 0 }}>
            Most used recommendations <DemoBadge />
          </p>
          {universityDemo.topRecommendations.map((r) => (
            <div className="profile-field" key={r.item}>
              <span>{r.item}</span>
              <b>{r.added}</b>
            </div>
          ))}
        </div>
        <div className="card">
          <p className="section-title" style={{ marginTop: 0 }}>
            Illustrative university network
          </p>
          {universityDemo.network.map((n) => (
            <div className="profile-field" key={n}>
              <span>{n}</span>
              <b>Prototype scenario</b>
            </div>
          ))}
          <p className="evidence-note">
            Byeol has no confirmed university or employer partnerships. These names are placeholders.
          </p>
        </div>
      </div>

      <p className="section-title">
        Department-level aggregate insights <DemoBadge />
      </p>
      <div className="card table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Career plan clarity</th>
              <th>Top aggregate gap</th>
              <th>Pathway activity</th>
            </tr>
          </thead>
          <tbody>
            {universityDemo.departments.map((d) => (
              <tr key={d.dept}>
                <td>{d.dept}</td>
                <td>{d.goalClarity}</td>
                <td>{d.topGap}</td>
                <td>{d.pathwayActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="section-title">
        Sample outcomes report <DemoBadge />
      </p>
      <div className="card">
        {[
          "Student adoption",
          "Engagement",
          "Recommendation actions",
          "Common skill gaps",
          "Career-goal distribution",
          "Pathway progress",
          "Department-level aggregate trends",
        ].map((s) => (
          <div className="profile-field" key={s}>
            <span>{s}</span>
            <b>Sample section</b>
          </div>
        ))}
        <p className="evidence-note">
          Sample report structure only — not actual Byeol performance or validated outcomes.
        </p>
      </div>
    </AdminShell>
  );
}

export function EmployerPreview() {
  const { employerMatching } = useByeol();
  return (
    <AdminShell
      title="Employer preview"
      subtitle="Concept only — Byeol has no employer customers"
      badge="FUTURE ECOSYSTEM PROTOTYPE — PLANNED EXPANSION"
    >
      <div className="metric-grid">
        {employerDemo.trends.map((tr) => (
          <div className="metric-card" key={tr.label}>
            <p className="metric-label">{tr.label}</p>
            <p className="metric-value small">{tr.value}</p>
            <span className="metric-tag">Illustrative</span>
          </div>
        ))}
      </div>

      <div className="card privacy-strong">
        <p className="action-title">Employer privacy</p>
        <ul className="evidence-list">
          <li className="no">
            <span>○</span> No student identity shared automatically
          </li>
          <li className="no">
            <span>○</span> No resumes shared automatically
          </li>
          <li className="no">
            <span>○</span> No transcripts shared automatically
          </li>
        </ul>
        <p className="feed-sub">
          Candidate introductions are student-controlled. Identifiable information is shared only
          after explicit student consent.
        </p>
      </div>

      <div className="card">
        <p className="action-title">Opt-in candidate introductions</p>
        <p className="feed-sub">
          Student employer-matching setting (from the student Privacy screen):{" "}
          <b>{employerMatching ? "ON — introductions may be suggested" : "OFF (default)"}</b>
        </p>
        <div className="candidate-card">
          <span className="candidate-avatar">?</span>
          <div>
            <p className="action-title">
              {employerMatching ? "Anonymous candidate · AI & Big Data, Year 2" : "No candidates visible"}
            </p>
            <p className="feed-sub">
              {employerMatching
                ? "Evidence summary: Python (demonstrated), Machine Learning (demonstrated). Identity withheld until the student approves an introduction."
                : "Students must opt in before Byeol suggests them for opportunities."}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="action-title">{employerDemo.campaign.name}</p>
        <p className="feed-sub">{employerDemo.campaign.reach}</p>
        <DemoBadge />
      </div>
    </AdminShell>
  );
}
