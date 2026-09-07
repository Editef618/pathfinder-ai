import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { ByeolProvider } from "@/lib/store";
import { Toasts } from "@/components/ui";
import { MobileView, WebView } from "@/views/StudentApp";
import { EmployerPreview, UniversityAdmin } from "@/views/AdminViews";
import "@/byeol.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Byeol — Academic-to-career pathways for students" },
      {
        name: "description",
        content:
          "Byeol connects what students learn with where they want to go: skills, evidence, gaps and a personalised pathway, plus aggregated insights for universities.",
      },
      { property: "og:title", content: "Byeol — Academic-to-career pathways for students" },
      {
        property: "og:description",
        content:
          "An interactive prototype: student profile, My Path roadmap, career graph, Byeol AI and privacy-first university insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ByeolApp,
});

const VIEWS = [
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "university", label: "University admin" },
  { id: "employer", label: "Employer preview" },
];

function ByeolApp() {
  const [view, setView] = useState("mobile");
  return (
    <LanguageProvider>
      <ByeolProvider>
        <div className="byeol-root">
          <div className="topbar">
            <div className="view-switch">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  className={view === v.id ? "active" : ""}
                  onClick={() => setView(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <p className="root-tagline">Byeol connects what students learn with where they want to go.</p>
          <div className="stage">
            {view === "mobile" && <MobileView />}
            {view === "web" && <WebView />}
            {view === "university" && <UniversityAdmin />}
            {view === "employer" && <EmployerPreview />}
          </div>
          <Toasts />
        </div>
      </ByeolProvider>
    </LanguageProvider>
  );
}
