import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { Toggle } from "@/components/ui";

export function PrivacyScreen() {
  const { t } = useLang();
  const { employerMatching, setEmployerMatching, pushToast } = useByeol();

  return (
    <div className="stack">
      <h1 className="screen-title">{t("privacy_title")}</h1>
      <div className="banner">
        <div className="dot" />
        <p>
          Byeol provides aggregated student-development insights without exposing private student
          conversations.
        </p>
      </div>

      <p className="section-title">What Byeol uses</p>
      <div className="card">
        {[
          "Student-provided profile",
          "Courses",
          "Skills",
          "Projects",
          "Career goal",
          "Optional CV / portfolio",
          "Personalisation history",
        ].map((x) => (
          <div className="profile-field" key={x}>
            <span>{x}</span>
            <b>Used for your path</b>
          </div>
        ))}
      </div>

      <p className="section-title">What the university can see</p>
      <div className="card">
        <p className="feed-sub">
          Aggregated, de-identified, program- and department-level insights only. Universities do
          not automatically see private conversations, personal career questions, private notes,
          individual transcripts or personal student records.
        </p>
      </div>

      <p className="section-title">What employers can see</p>
      <div className="card">
        <p className="feed-sub">
          No personally identifiable student information by default. Candidate introductions are
          student-controlled — identifiable information is shared only after explicit student
          consent.
        </p>
        <div className="profile-field">
          <span>Allow Byeol to suggest me for relevant opportunities</span>
          <Toggle
            on={employerMatching}
            onChange={(v) => {
              setEmployerMatching(v);
              pushToast({
                title: v ? "Employer matching enabled" : "Employer matching turned off",
                body: v
                  ? "You will still be asked to approve each introduction before anything identifiable is shared."
                  : "Default state — nothing identifiable is shared.",
              });
            }}
          />
        </div>
        <p className="evidence-note">Default: OFF.</p>
      </div>

      <p className="section-title">Controls</p>
      <div className="card">
        {[
          "Manage personalisation",
          "Download my data",
          "Delete profile data",
          "Manage employer matching",
        ].map((c) => (
          <button
            key={c}
            className="settings-row control-row"
            onClick={() => pushToast({ title: `${c} (prototype control)` })}
          >
            {c}
            <span className="chevron">›</span>
          </button>
        ))}
      </div>

      <p className="section-title">Data sources &amp; integrations</p>
      <div className="card">
        <p className="feed-sub">
          <b>Works today:</b> official/public university information, student-provided information,
          open educational resources, institution-approved uploaded content.
        </p>
        <p className="feed-sub" style={{ marginTop: 8 }}>
          <b>Optional future integrations:</b> SSO, LMS, SIS, APIs. Unrestricted university database
          access is not required.
        </p>
      </div>
    </div>
  );
}
