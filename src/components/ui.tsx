import { useState, type ReactNode } from "react";
import byeolMascot from "@/assets/byeol-mascot.jpg";
import gilMascot from "@/assets/gil-mascot.jpg";
import { LANGS, useLang } from "@/lib/i18n";
import { useByeol, type Feedback } from "@/lib/store";
import type { SkillStatus } from "@/data/demo";

export const BYEOL_SRC = byeolAsset.url;
export const GIL_SRC = gilAsset.url;

export function Mascot({ size = 34, gil = false }: { size?: number; gil?: boolean }) {
  return (
    <img
      className="avatar-round"
      src={gil ? GIL_SRC : BYEOL_SRC}
      alt={gil ? "Gil" : "Byeol"}
      style={{ width: size, height: size, objectFit: "cover" }}
    />
  );
}

export function StatusPill({ status }: { status: SkillStatus }) {
  const key = status.toLowerCase().replace(" ", "-");
  const { ts } = useLang();
  return <span className={`status-pill ${key}`}>{ts(status)}</span>;
}

export function DemoBadge({ text }: { text?: string }) {
  const { t } = useLang();
  return <span className="demo-badge">{text ?? t("demo_badge")}</span>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="section-title">{children}</p>;
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      className={`toggle ${on ? "on" : ""}`}
      onClick={() => onChange(!on)}
      style={{ border: "none", padding: 0 }}
    >
      <span className="knob" />
    </button>
  );
}

export function WhyThis({
  text,
  basedOn,
  defaultOpen = false,
}: {
  text: string;
  basedOn?: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { t } = useLang();
  return (
    <div className={`why-box ${open ? "open" : ""}`}>
      <button className="why-toggle" onClick={() => setOpen((o) => !o)}>
        {t("why_this")} <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="why-body">
          <p>{text}</p>
          <p className="based-on">
            <strong>{t("based_on")}:</strong>{" "}
            {(basedOn ?? [
              t("bo_profile"),
              t("bo_courses"),
              t("bo_projects"),
              t("bo_goal"),
              t("bo_requirements"),
              t("bo_official"),
            ]).join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}

const FEEDBACK_LABELS: Record<Feedback, string> = {
  added: "act_add",
  interested: "act_interested",
  completed: "act_done",
  not_relevant: "act_not_relevant",
  later: "act_later",
};

export function RecActions({ id }: { id: string }) {
  const { feedback, setItemFeedback } = useByeol();
  const { t } = useLang();
  const current = feedback[id];
  return (
    <div className="rec-actions">
      {(Object.keys(FEEDBACK_LABELS) as Feedback[]).map((f) => (
        <button
          key={f}
          className={`rec-btn ${f === "added" ? "primary" : ""} ${current === f ? "chosen" : ""}`}
          onClick={() => setItemFeedback(id, f)}
        >
          {t(FEEDBACK_LABELS[f])}
        </button>
      ))}
      {current && (
        <span className="rec-state">
          {t(
            current === "added"
              ? "rec_added"
              : current === "completed"
                ? "rec_completed"
                : current === "not_relevant"
                  ? "rec_hidden"
                  : current === "interested"
                    ? "rec_interested"
                    : "rec_later",
          )}
        </span>
      )}
    </div>
  );
}

export function LangPicker() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const active = LANGS.find((l) => l.code === lang)!;
  return (
    <div className="lang-control">
      <button className="lang-trigger" onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15 0 18M12 3c-2.5 2.7-2.5 15 0 18" />
        </svg>
        {active.label}
      </button>
      <div className={`lang-menu ${open ? "open" : ""}`}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            className={l.code === lang ? "active" : ""}
            onClick={() => {
              setLang(l.code);
              setOpen(false);
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toasts() {
  const { toasts, dismissToast } = useByeol();
  const { t, tx } = useLang();
  if (!toasts.length) return null;
  const vars = (params?: Record<string, string>) =>
    params
      ? Object.fromEntries(Object.entries(params).map(([k, v]) => [k, tx(v)]))
      : undefined;
  return (
    <div className="toast-wrap">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id} onClick={() => dismissToast(toast.id)}>
          <Mascot size={28} />
          <div>
            <p className="toast-title">{t(toast.title, vars(toast.params))}</p>
            {toast.body && <p className="toast-body">{t(toast.body, vars(toast.params))}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
