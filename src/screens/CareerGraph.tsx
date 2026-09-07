import { useState } from "react";
import { careerGraph, gapActions, student } from "@/data/demo";
import { useByeol } from "@/lib/store";
import { useLang } from "@/lib/i18n";
import { DemoBadge } from "@/components/ui";

const STATUS_CLASS: Record<string, string> = {
  DEMONSTRATED: "demo",
  DEVELOPING: "dev",
  INTRODUCED: "dev",
  "PRIORITY GAP": "gap",
};

export function CareerGraphScreen() {
  const { skills, goal } = useByeol();
  const { t, tx, ts } = useLang();
  const [selected, setSelected] = useState<string | null>(null);

  const gaps = skills.filter((s) => s.status === "PRIORITY GAP");
  const statusOf = (name: string) => skills.find((s) => s.name === name)?.status;

  const layerById = (id: string) => careerGraph.layers.find((l) => l.id === id)!;

  const selectedSkill = skills.find((s) => s.name === selected);

  return (
    <div className="stack graph-screen">
      <div className="graph-hero">
        <h1 className="screen-title" style={{ margin: 0 }}>
          {t("graph_title")}
        </h1>
        <p className="graph-statement">{t("graph_statement")}</p>
        <DemoBadge />
      </div>

      <div className="graph constellation">
        {["student", "major", "courses"].map((id, i) => {
          const layer = layerById(id);
          return (
            <div className="graph-layer" key={layer.id} style={{ animationDelay: `${i * 70}ms` }}>
              <p className="graph-label">{tx(layer.label)}</p>
              <div className="graph-nodes">
                {layer.nodes.map((n) => (
                  <span key={n} className="graph-node">
                    {tx(n)}
                  </span>
                ))}
              </div>
              <div className="graph-arrow">↓</div>
            </div>
          );
        })}

        <div className="graph-layer" style={{ animationDelay: "210ms" }}>
          <p className="graph-label">{t("graph_skills_live")}</p>
          <div className="graph-nodes">
            {skills
              .filter((s) => s.status !== "PRIORITY GAP")
              .map((s) => (
                <button
                  key={s.id}
                  className={`graph-node interactive ${STATUS_CLASS[s.status]} ${
                    selected === s.name ? "selected" : ""
                  }`}
                  onClick={() => setSelected(selected === s.name ? null : s.name)}
                >
                  {tx(s.name)} <em>{ts(s.status)}</em>
                </button>
              ))}
          </div>
          <div className="graph-arrow">↓</div>
        </div>

        <div className="graph-layer" style={{ animationDelay: "280ms" }}>
          <p className="graph-label">{tx("Projects / evidence")}</p>
          <div className="graph-nodes">
            {student.projects.map((p) => (
              <span key={p.name} className="graph-node evidence">
                {tx(p.name)}
              </span>
            ))}
          </div>
          <div className="graph-arrow">↓</div>
        </div>

        <div className="graph-layer" style={{ animationDelay: "350ms" }}>
          <p className="graph-label">{t("graph_requirements", { x: tx(goal) })}</p>
          <div className="graph-nodes">
            {layerById("requirements").nodes.map((n) => (
              <span
                key={n}
                className={`graph-node ${
                  statusOf(n) ? STATUS_CLASS[statusOf(n)!] : ""
                }`}
              >
                {tx(n)}
              </span>
            ))}
          </div>
          <div className="graph-arrow">↓</div>
        </div>

        <div className="graph-layer" style={{ animationDelay: "420ms" }}>
          <p className="graph-label">{t("graph_gaps_actions")}</p>
          {gaps.length === 0 && <span className="graph-node">{t("graph_no_gaps")}</span>}
          <div className="gap-flow">
            {gaps.map((g) => (
              <div className="gap-link" key={g.id}>
                <button
                  className={`graph-node interactive gap ${selected === g.name ? "selected" : ""}`}
                  onClick={() => setSelected(selected === g.name ? null : g.name)}
                >
                  {tx(g.name)} <em>{ts("PRIORITY GAP")}</em>
                </button>
                <span className="gap-connector">→</span>
                <span className="graph-node action">
                  {tx(gapActions[g.name]?.action ?? t("graph_default_action"))}
                </span>
              </div>
            ))}
          </div>
          <div className="graph-arrow">↓</div>
        </div>

        <div className="graph-layer" style={{ animationDelay: "490ms" }}>
          <p className="graph-label">{tx("Opportunities")}</p>
          <div className="graph-nodes">
            {layerById("opportunities").nodes.map((n) => (
              <span key={n} className="graph-node opportunity">
                {tx(n)}
              </span>
            ))}
          </div>
          <div className="graph-arrow">↓</div>
        </div>

        <div className="graph-layer" style={{ animationDelay: "560ms" }}>
          <p className="graph-label">{t("path_direction")}</p>
          <div className="graph-nodes">
            <span className="graph-node goal">{tx(goal)}</span>
          </div>
        </div>
      </div>

      {selectedSkill && (
        <div className="card graph-detail">
          <p className="action-title">
            {tx(selectedSkill.name)} · {ts(selectedSkill.status)}
          </p>
          <p className="feed-sub">{tx(selectedSkill.why)}</p>
          {gapActions[selectedSkill.name] && (
            <p className="feed-sub">
              <b>{t("graph_rec_action")}</b> {tx(gapActions[selectedSkill.name]!.action)} ·{" "}
              <b>{t("graph_leads_to")}</b> {tx(gapActions[selectedSkill.name]!.opportunity)}
            </p>
          )}
          <button className="link-btn" onClick={() => setSelected(null)}>
            {t("close")}
          </button>
        </div>
      )}
    </div>
  );
}
