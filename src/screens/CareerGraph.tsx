import { careerGraph } from "@/data/demo";
import { useByeol } from "@/lib/store";

export function CareerGraphScreen() {
  const { skills, goal } = useByeol();
  const gaps = skills.filter((s) => s.status === "PRIORITY GAP").map((s) => s.name);

  return (
    <div className="stack">
      <h1 className="screen-title">Career graph</h1>
      <p className="feed-sub">
        Byeol connects your information over time instead of answering one prompt at a time.
        Prototype data.
      </p>
      <div className="graph">
        {careerGraph.layers.map((layer, i) => (
          <div className="graph-layer" key={layer.id}>
            <p className="graph-label">{layer.label}</p>
            <div className="graph-nodes">
              {(layer.id === "gaps" ? gaps : layer.nodes).map((n) => (
                <span
                  key={n}
                  className={`graph-node ${layer.id === "gaps" ? "gap" : ""} ${
                    layer.id === "requirements" && gaps.includes(n) ? "gap" : ""
                  } ${layer.id === "evidence" ? "evidence" : ""}`}
                >
                  {n}
                </span>
              ))}
              {layer.id === "gaps" && gaps.length === 0 && (
                <span className="graph-node">No priority gaps left</span>
              )}
            </div>
            {i < careerGraph.layers.length - 1 && <div className="graph-arrow">↓</div>}
          </div>
        ))}
        <div className="graph-layer">
          <p className="graph-label">Career direction</p>
          <div className="graph-nodes">
            <span className="graph-node goal">{goal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
