import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { Mascot, SectionTitle } from "@/components/ui";
import { exploreItems, student } from "@/data/demo";

export function HomeScreen({ go }: { go: (s: string) => void }) {
  const { t } = useLang();
  const { goal, counts, currentPriority, nextStep, exploring } = useByeol();
  const opportunity = exploreItems.find((e) => e.category === "Research")!;

  return (
    <div className="stack">
      <div className="logo-row">
        <Mascot />
        <span className="brand">Byeol</span>
      </div>
      <h1 className="greeting">{t("greeting")}</h1>
      <p className="tagline">{t("tagline")}</p>

      <div className="hero-card hero-lead">
        <p className="hero-kicker">YOUR PATH TO</p>
        <h2 className="hero-goal xl">{exploring ? "Still exploring" : goal}</h2>
        <div className="hero-split">
          <div className="hero-block priority" key={currentPriority?.id}>
            <p className="hero-label">CURRENT PRIORITY</p>
            <p className="hero-value">{currentPriority?.name ?? "—"}</p>
          </div>
          <div className="hero-block next">
            <p className="hero-label">NEXT ACTION</p>
            <p className="hero-value">{nextStep ? `Start ${nextStep.action}` : "Build career evidence"}</p>
          </div>
        </div>
        <div className="hero-stats big">
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
        <button className="btn-primary" onClick={() => go("path")}>
          Open My Path
        </button>
      </div>

      <SectionTitle>{t("home_next_action")}</SectionTitle>
      <div className="card action-card" onClick={() => go("explore")}>
        <div className="action-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2l2.2 6.8H21l-5.6 4.1 2.2 6.8L12 15.6l-5.6 4.1 2.2-6.8L3 8.8h6.8z" />
          </svg>
        </div>
        <div>
          <p className="action-title">{nextStep?.action ?? "Build career evidence"}</p>
          <p className="action-sub">Evidence target: {nextStep?.evidenceTarget ?? "Portfolio"}</p>
        </div>
        <span className="chevron">›</span>
      </div>

      <SectionTitle>{t("home_opportunity")}</SectionTitle>
      <div className="card action-card" onClick={() => go("explore")}>
        <div className="action-icon">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="16" rx="3" />
            <path d="M8 3v4M16 3v4M3 11h18" />
          </svg>
        </div>
        <div>
          <p className="action-title">{opportunity.title}</p>
          <p className="action-sub">
            {opportunity.deadline} · Addresses {opportunity.addresses}
          </p>
        </div>
        <span className="chevron">›</span>
      </div>

      <SectionTitle>{t("home_progress")}</SectionTitle>
      <div className="card">
        <p className="action-title" style={{ marginBottom: 6 }}>
          {student.projects[0]?.name}
        </p>
        <p className="action-sub">Added as evidence for Python and Machine Learning.</p>
      </div>

      <div className="nudge-card">
        <Mascot size={38} />
        <div>
          <p className="nudge-label">{t("home_nudge")}</p>
          <p className="nudge-text">
            {currentPriority
              ? `${currentPriority.name} is your current priority capability. One short learning block this week would start building evidence.`
              : "You have evidence for every priority capability — focus on portfolio depth next."}
          </p>
          <button className="btn-small" onClick={() => go("path")}>
            Open My Path
          </button>
        </div>
      </div>

      <SectionTitle>{t("home_quick")}</SectionTitle>
      <div className="quick-row">
        {["Am I on track?", "Am I qualified for this?", "What should I learn next?"].map((q) => (
          <button key={q} className="quick-chip" onClick={() => go("ai")}>
            {q}
          </button>
        ))}
      </div>

      <div className="mini-links">
        <button onClick={() => go("calendar")}>Calendar</button>
        <button onClick={() => go("graph")}>Career graph</button>
        <button onClick={() => go("privacy")}>Privacy &amp; data</button>
      </div>
    </div>
  );
}
