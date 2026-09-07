import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { Mascot } from "@/components/ui";

/** `text` is an i18n key (or literal user input, which falls through untranslated). */
type Msg = { who: "me" | "byeol"; text: string; params?: Record<string, string>; comparison?: boolean };

const INTRO: Msg[] = [{ who: "byeol", text: "ai_intro" }];

export function ByeolAIScreen({ go }: { go: (s: string) => void }) {
  const { t, tx } = useLang();
  const { skills, setItemFeedback } = useByeol();
  const [msgs, setMsgs] = useState<Msg[]>(INTRO);
  const [input, setInput] = useState("");

  const statusOf = (id: string) => skills.find((s) => s.id === id)?.status ?? "PRIORITY GAP";

  const runInternshipCheck = () => {
    setMsgs((m) => [
      ...m,
      { who: "me", text: "ai_chip_ready" },
      { who: "byeol", text: "ai_compared", comparison: true },
    ]);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const lower = text.toLowerCase();
    if (
      lower.includes("internship") ||
      lower.includes("ready") ||
      lower.includes("인턴") ||
      lower.includes("インターン") ||
      lower.includes("stage") ||
      lower.includes("práctica") ||
      lower.includes("实习")
    ) {
      setMsgs((m) => [
        ...m,
        { who: "me", text },
        { who: "byeol", text: "ai_compared", comparison: true },
      ]);
      return;
    }
    const gap = skills.find((s) => s.status === "PRIORITY GAP");
    setMsgs((m) => [
      ...m,
      { who: "me", text },
      gap
        ? { who: "byeol" as const, text: "ai_answer_gap", params: { x: gap.name } }
        : { who: "byeol" as const, text: "ai_answer_none" },
    ]);
  };

  return (
    <div className="stack">
      <h1 className="screen-title">{t("ai_title")}</h1>
      <div className="banner">
        <div className="dot" />
        <p>{t("ai_banner")}</p>
      </div>

      {msgs.map((m, i) => (
        <div key={i}>
          <div className={`bubble-row ${m.who === "me" ? "me" : "bot"}`}>
            {m.who === "byeol" && <Mascot size={26} />}
            <div className="bubble">
              {t(m.text, m.params ? { x: tx(m.params.x) } : undefined)}
            </div>
          </div>
          {m.comparison && (
            <div className="card compare-card">
              <p className="compare-title">{t("ai_compare_title")}</p>
              {[
                { id: "python", label: "Python" },
                { id: "ml", label: "Machine Learning" },
                { id: "cpp", label: "C++" },
                { id: "ros", label: "ROS" },
                { id: "slam", label: "SLAM" },
              ].map((r) => {
                const st = statusOf(r.id);
                const verdict =
                  st === "DEMONSTRATED" ? "match" : st === "PRIORITY GAP" ? "gap" : "developing";
                return (
                  <div className="compare-row" key={r.id}>
                    <span>{tx(r.label)}</span>
                    <span className={`verdict ${verdict}`}>{t(`verdict_${verdict}`)}</span>
                  </div>
                );
              })}
              <p className="evidence-note">{t("ai_compare_note")}</p>
              <div className="rec-actions">
                <button className="rec-btn primary" onClick={() => go("path")}>
                  {t("ai_view_path")}
                </button>
                <button
                  className="rec-btn"
                  onClick={() => {
                    setItemFeedback("e2", "added");
                    go("path");
                  }}
                >
                  {t("ai_add_path")}
                </button>
                <button className="rec-btn" onClick={() => go("explore")}>
                  {t("ai_find_resource")}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="quick-row">
        <button className="quick-chip" onClick={runInternshipCheck}>
          {t("ai_chip_ready")}
        </button>
        <button
          className="quick-chip"
          onClick={() => {
            setInput(t("ai_chip_next"));
          }}
        >
          {t("ai_chip_next")}
        </button>
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={t("ai_input")}
        />
        <button className="send-btn" onClick={send}>
          <svg viewBox="0 0 24 24">
            <path d="M4 12l16-7-6 16-3-6-7-3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
