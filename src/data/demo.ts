/**
 * DEMO / MOCK DATA ONLY.
 * All figures here are illustrative prototype data — not real Byeol traction,
 * partnerships, customers or validated outcomes. Product logic lives in
 * src/lib/store.tsx and never assumes these values are real.
 */

export type SkillStatus = "DEMONSTRATED" | "DEVELOPING" | "INTRODUCED" | "PRIORITY GAP";

export type Evidence = { label: string; has: boolean };

export type Skill = {
  id: string;
  name: string;
  status: SkillStatus;
  evidence: Evidence[];
  why: string;
};

export const student = {
  name: "Jiwoo Han",
  initials: "JH",
  university: "Demo University (prototype environment)",
  major: "AI & Big Data",
  year: "Year 2",
  goal: "Robotics / AI Engineer",
  interests: ["Autonomous systems", "Computer vision", "Applied research"],
  learningPreferences: ["Project-based", "Short weekly sessions", "English + Korean materials"],
  courses: [
    { name: "Programming with Python", term: "Y1 S1", status: "Completed" },
    { name: "Introduction to C++", term: "Y1 S2", status: "Completed" },
    { name: "Machine Learning Foundations", term: "Y2 S1", status: "Completed" },
    { name: "Linear Algebra", term: "Y1 S2", status: "Completed" },
    { name: "Data Structures", term: "Y2 S1", status: "In progress" },
  ],
  projects: [
    { name: "Image classifier for campus waste sorting", skills: ["Python", "Machine Learning"] },
    { name: "Sensor data analysis mini-project", skills: ["Python"] },
  ],
  certifications: [{ name: "Deep Learning Specialization (audit)", status: "In progress" }],
  portfolio: "github.com/jiwoo-demo (prototype placeholder)",
};

export const initialSkills: Skill[] = [
  {
    id: "python",
    name: "Python",
    status: "DEMONSTRATED",
    evidence: [
      { label: "Programming with Python course", has: true },
      { label: "Machine learning project", has: true },
      { label: "Student-added sensor data project", has: true },
    ],
    why: "Python appears in your coursework and in two projects, so it is supported by practical evidence.",
  },
  {
    id: "ml",
    name: "Machine Learning",
    status: "DEMONSTRATED",
    evidence: [
      { label: "Machine Learning Foundations course", has: true },
      { label: "Image classifier project", has: true },
    ],
    why: "Coursework plus a completed project give this capability practical evidence.",
  },
  {
    id: "cpp",
    name: "C++",
    status: "DEVELOPING",
    evidence: [
      { label: "Introductory coursework", has: true },
      { label: "No substantial project evidence yet", has: false },
    ],
    why: "C++ is common in robotics stacks. You have introductory coursework, but no project evidence yet — a course alone does not equal mastery.",
  },
  {
    id: "control",
    name: "Control Systems",
    status: "PRIORITY GAP",
    evidence: [{ label: "Not represented in courses, projects or other evidence", has: false }],
    why: "Control Systems is a priority capability for your Robotics/AI career goal and is not currently represented in your courses, projects, or other evidence.",
  },
  {
    id: "ros",
    name: "ROS",
    status: "PRIORITY GAP",
    evidence: [{ label: "No ROS coursework or project evidence", has: false }],
    why: "ROS is the standard robotics middleware in most Robotics/AI Engineer role descriptions, and your profile contains no ROS evidence yet.",
  },
  {
    id: "slam",
    name: "SLAM",
    status: "PRIORITY GAP",
    evidence: [{ label: "No mapping/navigation evidence", has: false }],
    why: "SLAM underpins navigation work in robotics. It builds on Control Systems and ROS, so it sits later in your path.",
  },
];

export type RoadmapStep = {
  id: string;
  order: number;
  title: string;
  action: string;
  evidenceTarget: string;
  skillId: string;
};

export const roadmap: RoadmapStep[] = [
  {
    id: "s1",
    order: 1,
    title: "Strengthen C++",
    action: "Intermediate C++ learning",
    evidenceTarget: "Build a C++ project",
    skillId: "cpp",
  },
  {
    id: "s2",
    order: 2,
    title: "Learn Control Systems",
    action: "Control Systems Fundamentals",
    evidenceTarget: "Course + small control project",
    skillId: "control",
  },
  {
    id: "s3",
    order: 3,
    title: "Learn ROS",
    action: "ROS Fundamentals",
    evidenceTarget: "Build a ROS robotics project",
    skillId: "ros",
  },
  {
    id: "s4",
    order: 4,
    title: "Learn SLAM",
    action: "SLAM fundamentals",
    evidenceTarget: "Navigation / mapping project",
    skillId: "slam",
  },
  {
    id: "s5",
    order: 5,
    title: "Build career evidence",
    action: "Robotics project · research experience · portfolio",
    evidenceTarget: "Internship-ready portfolio",
    skillId: "",
  },
];

export type ExploreItem = {
  id: string;
  category:
    | "Learning resource"
    | "Course"
    | "Certification"
    | "Project"
    | "Research"
    | "Internship"
    | "Competition"
    | "Scholarship"
    | "Career event";
  title: string;
  source: string;
  addresses: string;
  creates: string;
  why: string;
  deadline?: string;
};

export const exploreItems: ExploreItem[] = [
  {
    id: "e1",
    category: "Course",
    title: "Control Systems Fundamentals",
    source: "OPEN EDUCATIONAL RESOURCE (DEMO)",
    addresses: "Control Systems priority gap",
    creates: "Coursework evidence + small control project",
    why: "Control Systems is a priority capability for your Robotics/AI career goal and is not currently represented in your courses, projects, or other evidence.",
  },
  {
    id: "e2",
    category: "Project",
    title: "ROS beginner robotics project",
    source: "DEMO PROJECT LIBRARY",
    addresses: "ROS priority gap",
    creates: "Robotics project evidence",
    why: "ROS is a priority skill gap, and completing this project can create practical evidence of the skill.",
  },
  {
    id: "e3",
    category: "Learning resource",
    title: "Intermediate C++ for robotics",
    source: "OPEN EDUCATIONAL RESOURCE (DEMO)",
    addresses: "C++ developing capability",
    creates: "A C++ project you can show",
    why: "You have introductory C++ coursework but no project evidence, and robotics stacks are C++ heavy.",
  },
  {
    id: "e4",
    category: "Certification",
    title: "Robotics software developer certificate",
    source: "DEMO PROVIDER CATALOG",
    addresses: "ROS + SLAM gaps",
    creates: "Certification evidence",
    why: "Your target roles frequently list ROS-based software experience.",
    deadline: "Enrolment closes Oct 12",
  },
  {
    id: "e5",
    category: "Research",
    title: "Undergraduate research assistant — mobile robotics lab",
    source: "DEMO UNIVERSITY CATALOG",
    addresses: "SLAM + Control Systems gaps",
    creates: "Research experience evidence",
    why: "Lab work is one of the few ways to build navigation evidence during Year 2.",
    deadline: "Applications close Oct 2",
  },
  {
    id: "e6",
    category: "Internship",
    title: "Robotics AI engineering internship (summer)",
    source: "SAMPLE OPPORTUNITY",
    addresses: "ROS, SLAM, C++",
    creates: "Industry experience evidence",
    why: "Requirements overlap with your goal; two of its requirements are currently gaps in your profile.",
    deadline: "Applications open Nov 1",
  },
  {
    id: "e7",
    category: "Competition",
    title: "Autonomous mobile robot challenge",
    source: "ILLUSTRATIVE UNIVERSITY OPPORTUNITY",
    addresses: "ROS, Control Systems",
    creates: "Team project evidence",
    why: "A time-boxed way to turn ROS learning into demonstrable work.",
    deadline: "Team registration Nov 20",
  },
  {
    id: "e8",
    category: "Scholarship",
    title: "AI & robotics study scholarship",
    source: "DEMO UNIVERSITY CATALOG",
    addresses: "Supports pathway continuation",
    creates: "Funding for certification / hardware",
    why: "Matches your major and stated career direction.",
    deadline: "Oct 30",
  },
  {
    id: "e9",
    category: "Career event",
    title: "Robotics & AI career fair",
    source: "DEMO UNIVERSITY CATALOG",
    addresses: "Career exploration",
    creates: "Employer conversations",
    why: "Lets you check role requirements against your current evidence.",
    deadline: "Sep 25",
  },
];

export const alternativeGoals = [
  {
    goal: "Robotics / AI Engineer",
    because: "Python + Machine Learning evidence, AI & Big Data major, autonomous systems interest",
  },
  { goal: "Machine Learning Engineer", because: "Strong ML coursework and a completed ML project" },
  { goal: "Computer Vision Engineer", because: "Image classifier project + linear algebra coursework" },
  { goal: "Data Scientist", because: "Python, statistics coursework, sensor data analysis project" },
];

export type CalendarEvent = {
  day: number;
  title: string;
  sub: string;
  kind: "path" | "deadline" | "review";
};

export const calendarEvents: CalendarEvent[] = [
  { day: 17, title: "Weekly Byeol path review", sub: "Sep 17, 6:00 PM", kind: "review" },
  { day: 20, title: "Control Systems learning milestone", sub: "Finish module 1 — Sep 20", kind: "path" },
  { day: 25, title: "Robotics & AI career fair", sub: "Demo University campus — Sep 25", kind: "deadline" },
  { day: 30, title: "Scholarship application deadline", sub: "AI & robotics study scholarship — Oct 30", kind: "deadline" },
  { day: 2, title: "Research application", sub: "Mobile robotics lab — Oct 2", kind: "deadline" },
];

/* ---------- Career graph (mock) ---------- */
export const careerGraph = {
  layers: [
    { id: "student", label: "Student", nodes: ["Jiwoo Han · Year 2"] },
    { id: "major", label: "Major", nodes: ["AI & Big Data"] },
    { id: "courses", label: "Courses", nodes: ["Python", "Intro C++", "ML Foundations", "Linear Algebra"] },
    { id: "skills", label: "Skills", nodes: ["Python", "Machine Learning", "C++"] },
    { id: "evidence", label: "Projects / evidence", nodes: ["Image classifier", "Sensor analysis"] },
    { id: "requirements", label: "Career requirements", nodes: ["Python", "ML", "C++", "Control Systems", "ROS", "SLAM"] },
    { id: "gaps", label: "Skill gaps", nodes: ["Control Systems", "ROS", "SLAM"] },
    { id: "actions", label: "Recommended actions", nodes: ["Control Systems Fundamentals", "ROS project", "Intermediate C++"] },
    { id: "opportunities", label: "Opportunities", nodes: ["Robotics lab research", "Robot challenge", "Summer internship"] },
  ],
};

/* ---------- University admin (ILLUSTRATIVE) ---------- */
export const universityDemo = {
  metrics: [
    { label: "Active students", value: "1,240" },
    { label: "Weekly active students", value: "610" },
    { label: "4-week retention", value: "48%" },
    { label: "Recommendation action rate", value: "37%" },
    { label: "Students with defined career goals", value: "72%" },
    { label: "Students with identified priority gaps", value: "81%" },
  ],
  skillGaps: [
    { skill: "Cloud infrastructure", share: 62, response: "Create workshop" },
    { skill: "Data analysis", share: 54, response: "Promote existing course" },
    { skill: "AI / ML", share: 47, response: "Add elective" },
    { skill: "Public speaking", share: 39, response: "Connect students with career support" },
    { skill: "Statistical methods", share: 31, response: "Recommend certification" },
  ],
  topRecommendations: [
    { item: "Control Systems Fundamentals", added: "310 pathway adds" },
    { item: "Cloud practitioner certification", added: "268 pathway adds" },
    { item: "Undergraduate research placements", added: "154 pathway adds" },
  ],
  departments: [
    { dept: "Engineering", goalClarity: "High", topGap: "Control systems", pathwayActivity: "Strong" },
    { dept: "Business", goalClarity: "Medium", topGap: "Data analysis", pathwayActivity: "Moderate" },
    { dept: "Life sciences", goalClarity: "Medium", topGap: "Statistical methods", pathwayActivity: "Moderate" },
    { dept: "Humanities", goalClarity: "Developing", topGap: "Public speaking", pathwayActivity: "Emerging" },
  ],
  network: ["University A", "University B", "University C"],
};

/* ---------- Employer preview (FUTURE ECOSYSTEM) ---------- */
export const employerDemo = {
  trends: [
    { label: "Aggregate talent trend", value: "Robotics-adjacent interest rising in illustrative cohort" },
    { label: "Most common gap", value: "Control systems" },
    { label: "Most sought skill", value: "Practical ROS experience" },
  ],
  campaign: {
    name: "Robotics internship interest campaign (concept)",
    reach: "Aggregate, de-identified cohort only",
  },
};

/* ---------- Gap → recommended action → opportunity (ILLUSTRATIVE) ---------- */
export const gapActions: Record<string, { action: string; opportunity: string }> = {
  "Control Systems": {
    action: "Control Systems Fundamentals",
    opportunity: "Mobile robotics lab research (demo)",
  },
  ROS: { action: "ROS Robotics Project", opportunity: "Autonomous robot challenge (demo)" },
  SLAM: { action: "SLAM Learning Path", opportunity: "Robotics internship preparation (demo)" },
  "C++": { action: "Intermediate C++ for robotics", opportunity: "Robotics internship preparation (demo)" },
};

/* ---------- University value framing (ILLUSTRATIVE) ---------- */
export const universityValue = {
  engagement: [
    { label: "Active students", value: "1,240", note: "Illustrative" },
    { label: "Weekly active students", value: "610", note: "Illustrative" },
    { label: "4-week retention", value: "48%", note: "Illustrative" },
  ],
  intelligence: [
    { label: "Students with defined career goals", value: "72%", note: "Illustrative" },
    { label: "Students with identified priority gaps", value: "81%", note: "Illustrative" },
    { label: "Recommendation action rate", value: "37%", note: "Illustrative" },
  ],
  decisions: [
    {
      skill: "Control Systems",
      insight: "Common priority gap",
      responses: [
        "Promote existing elective",
        "Offer workshop",
        "Recommend learning resource",
        "Create project opportunity",
      ],
    },
    {
      skill: "ROS",
      insight: "Emerging career skill gap",
      responses: ["Create robotics workshop", "Promote existing robotics opportunities"],
    },
  ],
};
