import { useLang } from "@/lib/i18n";
import { calendarEvents } from "@/data/demo";
import { useByeol } from "@/lib/store";

export function CalendarScreen() {
  const { t } = useLang();
  const { nextStep } = useByeol();
  const marks = new Set(calendarEvents.map((e) => e.day));

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="stack">
      <h1 className="screen-title">{t("calendar_title")}</h1>
      <p className="feed-sub">Connected to your pathway — milestones come from My Path.</p>
      <div className="cal-card">
        <div className="cal-head">
          <span>September 2026</span>
        </div>
        <div className="cal-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div className="dow" key={i}>
              {d}
            </div>
          ))}
          <div className="day dim">30</div>
          <div className="day dim">31</div>
          {days.map((d) => (
            <div key={d} className={`day ${d === 15 ? "today" : ""} ${marks.has(d) ? "mark" : ""}`}>
              {d}
            </div>
          ))}
        </div>
      </div>

      <p className="section-title">{t("calendar_upcoming")}</p>
      {nextStep && (
        <div className="agenda-item">
          <div className="agenda-dot" />
          <div>
            <p className="agenda-title">{nextStep.action} — milestone</p>
            <p className="agenda-sub">From My Path · this week</p>
          </div>
        </div>
      )}
      {calendarEvents.map((e) => (
        <div className="agenda-item" key={e.title}>
          <div className={`agenda-dot ${e.kind === "review" ? "blue" : ""}`} />
          <div>
            <p className="agenda-title">{e.title}</p>
            <p className="agenda-sub">{e.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
