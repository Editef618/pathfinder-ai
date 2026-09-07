import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { RecActions, WhyThis } from "@/components/ui";
import { exploreItems } from "@/data/demo";

const CATEGORIES = [
  "For you",
  "Learning resource",
  "Course",
  "Certification",
  "Project",
  "Research",
  "Internship",
  "Competition",
  "Scholarship",
  "Career event",
];

export function ExploreScreen() {
  const { t } = useLang();
  const [cat, setCat] = useState("For you");
  const [q, setQ] = useState("");

  const items = useMemo(
    () =>
      exploreItems.filter(
        (i) =>
          (cat === "For you" || i.category === cat) &&
          (q.trim() === "" ||
            (i.title + i.addresses + i.category).toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <div className="stack">
      <h1 className="screen-title">{t("explore_title")}</h1>
      <div className="search-bar">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("explore_search")} />
      </div>
      <div className="chip-row">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {items.map((i) => (
        <div className="card feed-card" key={i.id}>
          <span className="feed-tag">{i.category}</span>
          <p className="feed-title">{i.title}</p>
          <p className="feed-sub">Source: {i.source}</p>
          <div className="fit-lines">
            <p>
              <span>{t("addresses")}:</span> {i.addresses}
            </p>
            <p>
              <span>{t("creates")}:</span> {i.creates}
            </p>
            {i.deadline && (
              <p>
                <span>{t("deadline")}:</span> {i.deadline}
              </p>
            )}
          </div>
          <WhyThis text={i.why} />
          <RecActions id={i.id} />
        </div>
      ))}
      {items.length === 0 && <p className="feed-sub">Nothing matches that search yet.</p>}
    </div>
  );
}
