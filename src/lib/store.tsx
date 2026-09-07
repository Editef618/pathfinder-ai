import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialSkills, roadmap, type Skill, type SkillStatus } from "@/data/demo";

export type Feedback = "added" | "interested" | "completed" | "not_relevant" | "later";

export type Toast = { id: number; title: string; body?: string };

type Ctx = {
  skills: Skill[];
  goal: string;
  exploring: boolean;
  setGoal: (g: string) => void;
  setExploring: (v: boolean) => void;
  feedback: Record<string, Feedback>;
  setItemFeedback: (id: string, f: Feedback) => void;
  pathItems: string[];
  completeLearning: (skillId: string) => void;
  currentPriority: Skill | undefined;
  nextStep: (typeof roadmap)[number] | undefined;
  counts: Record<"demonstrated" | "developing" | "gaps", number>;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
  employerMatching: boolean;
  setEmployerMatching: (v: boolean) => void;
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
};

const StoreContext = createContext<Ctx | null>(null);

const ORDER: SkillStatus[] = ["PRIORITY GAP", "INTRODUCED", "DEVELOPING", "DEMONSTRATED"];

export function ByeolProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [goal, setGoal] = useState("Robotics / AI Engineer");
  const [exploring, setExploring] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const [pathItems, setPathItems] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [employerMatching, setEmployerMatching] = useState(false);
  const [onboarded, setOnboarded] = useState(true);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 6000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setItemFeedback = useCallback(
    (id: string, f: Feedback) => {
      setFeedback((prev) => ({ ...prev, [id]: f }));
      if (f === "added") setPathItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
      if (f === "not_relevant") setPathItems((prev) => prev.filter((x) => x !== id));
    },
    [],
  );

  /** The one functional adaptation: completing learning promotes a skill and
   *  re-prioritises the path. */
  const completeLearning = useCallback(
    (skillId: string) => {
      let promotedName = "";
      let nextName = "";
      setSkills((prev) => {
        const next = prev.map((s) => {
          if (s.id !== skillId) return s;
          promotedName = s.name;
          const nextStatus: SkillStatus =
            s.status === "PRIORITY GAP" ? "DEVELOPING" : "DEMONSTRATED";
          return {
            ...s,
            status: nextStatus,
            evidence: [
              ...s.evidence.filter((e) => e.has),
              { label: "Learning completed in Byeol", has: true },
              ...(nextStatus === "DEVELOPING"
                ? [{ label: "Project evidence still needed", has: false }]
                : []),
            ],
          };
        });
        const remaining = next.find((s) => s.status === "PRIORITY GAP");
        nextName = remaining?.name ?? "";
        return next;
      });
      pushToast({
        title: "Your profile changed, so Byeol updated your path.",
        body: nextName
          ? `${promotedName} is now Developing. New priority: ${nextName}.`
          : `${promotedName} is now Developing.`,
      });
    },
    [pushToast],
  );

  const sorted = useMemo(
    () => [...skills].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status)),
    [skills],
  );

  const currentPriority = sorted.find((s) => s.status === "PRIORITY GAP") ?? sorted[0];

  const nextStep = useMemo(
    () =>
      roadmap.find((r) => r.skillId === currentPriority?.id) ??
      roadmap.find((r) => {
        const sk = skills.find((s) => s.id === r.skillId);
        return sk && sk.status !== "DEMONSTRATED";
      }),
    [currentPriority, skills],
  );

  const counts = useMemo(
    () => ({
      demonstrated: skills.filter((s) => s.status === "DEMONSTRATED").length,
      developing: skills.filter((s) => s.status === "DEVELOPING" || s.status === "INTRODUCED").length,
      gaps: skills.filter((s) => s.status === "PRIORITY GAP").length,
    }),
    [skills],
  );

  const value: Ctx = {
    skills,
    goal,
    exploring,
    setGoal,
    setExploring,
    feedback,
    setItemFeedback,
    pathItems,
    completeLearning,
    currentPriority,
    nextStep,
    counts,
    toasts,
    pushToast,
    dismissToast,
    employerMatching,
    setEmployerMatching,
    onboarded,
    setOnboarded,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useByeol() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useByeol must be used inside ByeolProvider");
  return ctx;
}
