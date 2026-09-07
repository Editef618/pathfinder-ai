import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { Mascot, SectionTitle } from "@/components/ui";
import { exploreItems, student } from "@/data/demo";

export function HomeScreen({ go }: { go: (s: string) => void }) {
  const { t, tx } = useLang();
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
        <p className="hero-kicker">{t("hero_kicker")}</p>
        <h2 className="hero-goal xl">{exploring ? t("still_exploring") : tx(goal)}</h2>
        <div className="hero-split">
          <div className="hero-block priority" key={currentPriority?.id}>
            <p className="hero-label">{t("hero_priority")}</p>
            <p className="hero-value">{currentPriority ? tx(currentPriority.name) : "—"}</p>
          </div>
          <div className="hero-block next">
            <p className="hero-label">{t("hero_next")}</p>
            <p className="hero-value">
            {nextStep ? t("home_start", { x: tx(nextStep.action) }) : t("home_build_evidence")}
          </p>
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
          {t("home_open_path")}
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
          <p className="action-title">{nextStep ? tx(nextStep.action) : t("home_build_evidence")}</p>
          <p className="action-sub">
            {t("home_evidence_target", { x: nextStep ? tx(nextStep.evidenceTarget) : "—" })}
          </p>
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
          <p className="action-title">{tx(opportunity.title)}</p>
          <p className="action-sub">
            {tx(opportunity.deadline ?? "")} · {t("addresses")}: {tx(opportunity.addresses)}
          </p>
        </div>
        <span className="chevron">›</span>
      </div>

      <SectionTitle>{t("home_progress")}</SectionTitle>
      <div className="card">
        <p className="action-title" style={{ marginBottom: 6 }}>
          {tx(student.projects[0]?.name ?? "")}
        </p>
        <p className="action-sub">{t("home_added_evidence")}</p>
      </div>

      <div className="nudge-card">
        <Mascot size={38} />
        <div>
          <p className="nudge-label">{t("home_nudge")}</p>
          <p className="nudge-text">
            {currentPriority
              ? t("home_nudge_text", { x: tx(currentPriority.name) })
              : t("home_nudge_done")}
          </p>
          <button className="btn-small" onClick={() => go("path")}>
            {t("home_open_path")}
          </button>
        </div>
      </div>

      <SectionTitle>{t("home_quick")}</SectionTitle>
      <div className="quick-row">
        {["q_track", "q_qualified", "q_learn_next"].map((q) => (
          <button key={q} className="quick-chip" onClick={() => go("ai")}>
            {t(q)}
          </button>
        ))}
      </div>

      <div className="mini-links">
        <button onClick={() => go("calendar")}>{t("nav_calendar")}</button>
        <button onClick={() => go("graph")}>{t("nav_graph")}</button>
        <button onClick={() => go("privacy")}>{t("nav_privacy")}</button>
      </div>
    </div>
  );
}
