import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useByeol } from "@/lib/store";
import { Mascot } from "@/components/ui";

type Msg = { who: "me" | "byeol"; text: string; comparison?: boolean };

const INTRO: Msg[] = [
  {
    who: "byeol",
    text: "Hi Jiwoo — I keep your profile, courses, projects and evidence in context, so ask me anything about your path.",
  },
];

export function ByeolAIScreen({ go }: { go: (s: string) => void }) {
  const { t } = useLang();
  const { skills, setItemFeedback } = useByeol();
  const [msgs, setMsgs] = useState<Msg[]>(INTRO);
  const [input, setInput] = useState("");

  const statusOf = (id: string) => skills.find((s) => s.id === id)?.status ?? "PRIORITY GAP";

  const runInternshipCheck = () => {
    setMsgs((m) => [
      ...m,
      { who: "me", text: "Am I ready for this Robotics AI internship?" },
      {
        who: "byeol",
        text: "I compared the internship requirements with your current profile and evidence.",
        comparison: true,
      },
    ]);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const lower = text.toLowerCase();
    if (lower.includes("internship") || lower.includes("ready")) {
      setMsgs((m) => [
        ...m,
        { who: "me", text },
        {
          who: "byeol",
          text: "I compared the internship requirements with your current profile and evidence.",
          comparison: true,
        },
      ]);
      return;
    }
    const gap = skills.find((s) => s.status === "PRIORITY GAP");
    setMsgs((m) => [
      ...m,
      { who: "me", text },
      {
        who: "byeol",
        text: gap
          ? `Based on your profile, ${gap.name} is your strongest next priority: your target career requires it and your evidence does not yet cover it.`
          : "Every priority capability now has evidence — the next useful step is deepening your portfolio.",
      },
    ]);
  };

  return (
    <div className="stack">
      <h1 className="screen-title">{t("ai_title")}</h1>
      <div className="banner">
        <div className="dot" />
        <p>
          Byeol answers using your persistent profile — courses, skills, projects, evidence and
          career goal — not just this message.
        </p>
      </div>

      {msgs.map((m, i) => (
        <div key={i}>
          <div className={`bubble-row ${m.who === "me" ? "me" : "bot"}`}>
            {m.who === "byeol" && <Mascot size={26} />}
            <div className="bubble">{m.text}</div>
          </div>
          {m.comparison && (
            <div className="card compare-card">
              <p className="compare-title">Requirement-by-requirement comparison</p>
              {[
                { id: "python", label: "Python" },
                { id: "ml", label: "Machine Learning" },
                { id: "cpp", label: "C++" },
                { id: "ros", label: "ROS" },
                { id: "slam", label: "SLAM" },
              ].map((r) => {
                const st = statusOf(r.id);
                const verdict =
                  st === "DEMONSTRATED" ? "MATCH" : st === "PRIORITY GAP" ? "GAP" : "DEVELOPING";
                return (
                  <div className="compare-row" key={r.id}>
                    <span>{r.label}</span>
                    <span className={`verdict ${verdict.toLowerCase()}`}>{verdict}</span>
                  </div>
                );
              })}
              <p className="evidence-note">
                ROS is currently one of your strongest next priorities because the internship
                requires it and your profile does not yet contain demonstrated ROS evidence.
              </p>
              <div className="rec-actions">
                <button className="rec-btn primary" onClick={() => go("path")}>
                  View My Path
                </button>
                <button
                  className="rec-btn"
                  onClick={() => {
                    setItemFeedback("e2", "added");
                    go("path");
                  }}
                >
                  Add to My Path
                </button>
                <button className="rec-btn" onClick={() => go("explore")}>
                  Find learning resource
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="quick-row">
        <button className="quick-chip" onClick={runInternshipCheck}>
          Am I ready for this Robotics AI internship?
        </button>
        <button
          className="quick-chip"
          onClick={() => {
            setInput("What should I learn next?");
          }}
        >
          What should I learn next?
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
