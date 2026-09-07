import { useLang } from "@/lib/i18n";
import { calendarEvents } from "@/data/demo";
import { useByeol } from "@/lib/store";

export function CalendarScreen() {
  const { t, tx } = useLang();
  const { nextStep } = useByeol();
  const marks = new Set(calendarEvents.map((e) => e.day));

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="stack">
      <h1 className="screen-title">{t("calendar_title")}</h1>
      <p className="feed-sub">{t("cal_connected")}</p>
      <div className="cal-card">
        <div className="cal-head">
          <span>{tx("September 2026")}</span>
        </div>
        <div className="cal-grid">
          {t("cal_dows").split(",").map((d, i) => (
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
            <p className="agenda-title">{t("cal_milestone", { x: tx(nextStep.action) })}</p>
            <p className="agenda-sub">{t("cal_from_path")}</p>
          </div>
        </div>
      )}
      {calendarEvents.map((e) => (
        <div className="agenda-item" key={e.title}>
          <div className={`agenda-dot ${e.kind === "review" ? "blue" : ""}`} />
          <div>
            <p className="agenda-title">{tx(e.title)}</p>
            <p className="agenda-sub">{tx(e.sub)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
