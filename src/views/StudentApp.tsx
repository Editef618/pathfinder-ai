import { useState, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { LangPicker, Mascot } from "@/components/ui";
import { HomeScreen } from "@/screens/Home";
import { MyPathScreen } from "@/screens/MyPath";
import { ExploreScreen } from "@/screens/Explore";
import { ByeolAIScreen } from "@/screens/ByeolAI";
import { ProfileScreen } from "@/screens/Profile";
import { CalendarScreen } from "@/screens/CalendarScreen";
import { PrivacyScreen } from "@/screens/Privacy";
import { CareerGraphScreen } from "@/screens/CareerGraph";
import { OnboardingScreen } from "@/screens/Onboarding";

export const PRIMARY = ["home", "path", "explore", "ai", "profile"] as const;

const ICONS: Record<string, ReactNode> = {
  home: <path d="M4 11l8-7 8 7v8a2 2 0 01-2 2H6a2 2 0 01-2-2z" />,
  path: <path d="M6 20c0-6 12-4 12-10a4 4 0 00-8 0M6 20h12" />,
  explore: <path d="M12 2l2.2 6.8H21l-5.6 4.1 2.2 6.8L12 15.6l-5.6 4.1 2.2-6.8L3 8.8h6.8z" />,
  ai: <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-5 4z" />,
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0116 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </>
  ),
  graph: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  privacy: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />,
};

export function useScreens() {
  const [screen, setScreen] = useState<string>("home");
  return { screen, go: setScreen };
}

export function ScreenBody({ screen, go }: { screen: string; go: (s: string) => void }) {
  switch (screen) {
    case "path":
      return <MyPathScreen />;
    case "explore":
      return <ExploreScreen />;
    case "ai":
      return <ByeolAIScreen go={go} />;
    case "profile":
      return <ProfileScreen go={go} />;
    case "calendar":
      return <CalendarScreen />;
    case "privacy":
      return <PrivacyScreen />;
    case "graph":
      return <CareerGraphScreen />;
    case "onboarding":
      return <OnboardingScreen go={go} />;
    default:
      return <HomeScreen go={go} />;
  }
}

export function MobileView() {
  const { screen, go } = useScreens();
  const { t } = useLang();
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="notch" />
        <div className="screen-window">
          <div className="statusbar">
            <span>9:41</span>
            <LangPicker />
          </div>
          <div className="screens">
            <section className="screen active" key={screen}>
              <ScreenBody screen={screen} go={go} />
            </section>
          </div>
          <div className="tabbar">
            {PRIMARY.map((k) => (
              <button
                key={k}
                className={screen === k ? "active" : ""}
                onClick={() => go(k)}
              >
                <svg viewBox="0 0 24 24">{ICONS[k]}</svg>
                <span>{t(`nav_${k}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebView() {
  const { screen, go } = useScreens();
  const { t } = useLang();
  const items = [...PRIMARY, "calendar", "graph", "privacy"] as const;
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="traffic" style={{ background: "#FF6058" }} />
        <span className="traffic" style={{ background: "#FFBD2E" }} />
        <span className="traffic" style={{ background: "#28CA41" }} />
        <div className="browser-url">byeol.app/{screen}</div>
      </div>
      <div className="web-shell">
        <aside className="web-sidebar">
          <div className="logo-row">
            <Mascot size={30} />
            <span className="brand" style={{ fontSize: 17 }}>
              Byeol
            </span>
          </div>
          {items.map((k) => (
            <button
              key={k}
              className={`nav-item ${screen === k ? "active" : ""}`}
              onClick={() => go(k)}
            >
              <svg viewBox="0 0 24 24">{ICONS[k]}</svg>
              <span>{t(`nav_${k}`)}</span>
            </button>
          ))}
          <div className="sidebar-spacer" />
          <button className="nav-item" onClick={() => go("onboarding")}>
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>{t("nav_onboarding")}</span>
          </button>
          <LangPicker />
        </aside>
        <main className="web-main">
          <ScreenBody screen={screen} go={go} />
        </main>
      </div>
    </div>
  );
}
