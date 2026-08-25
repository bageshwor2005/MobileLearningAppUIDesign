import { useState, useEffect } from "react";

type Screen = "splash" | "onboarding" | "home" | "subjects" | "chapters" | "notes" | "search" | "bookmarks" | "profile" | "themeSelect";

interface Faculty {
  id: string;
  name: string;
  nameNe: string;
  icon: string;
  subjects: number;
  color: string;
  bgColor: string;
}

interface Subject {
  id: string;
  name: string;
  nameNe: string;
  chapters: number;
  progress: number;
  facultyId: string;
}

interface Chapter {
  id: string;
  title: string;
  titleNe: string;
  description: string;
  read: boolean;
  subjectId: string;
  number: number;
}

interface Theme {
  id: string;
  name: string;
  nameNe: string;
  primary: string;
  primaryFg: string;
  secondary: string;
  secondaryFg: string;
  accent: string;
  bg: string;
  card: string;
  border: string;
  muted: string;
  mutedFg: string;
  darkPrimary: string;
  darkBg: string;
  darkCard: string;
  darkBorder: string;
  darkMuted: string;
  darkMutedFg: string;
  preview: string;
}

const themes: Theme[] = [
  {
    id: "teal",
    name: "Teal Forest",
    nameNe: "हरियो वन",
    primary: "#1a7a6e",
    primaryFg: "#ffffff",
    secondary: "#e8f4f2",
    secondaryFg: "#1a7a6e",
    accent: "#2b9d8f",
    bg: "#f0f4f8",
    card: "#ffffff",
    border: "#d0dde8",
    muted: "#e2eaf0",
    mutedFg: "#5c7085",
    darkPrimary: "#2bb5a6",
    darkBg: "#0c1117",
    darkCard: "#151c25",
    darkBorder: "#243040",
    darkMuted: "#1a2535",
    darkMutedFg: "#7a95ab",
    preview: "linear-gradient(135deg, #1a7a6e 0%, #2b9d8f 100%)",
  },
  {
    id: "saffron",
    name: "Saffron Dawn",
    nameNe: "केसरी उषा",
    primary: "#c2410c",
    primaryFg: "#ffffff",
    secondary: "#fff7ed",
    secondaryFg: "#c2410c",
    accent: "#ea580c",
    bg: "#fdf6f0",
    card: "#ffffff",
    border: "#f5d5c0",
    muted: "#fde8d8",
    mutedFg: "#7c5340",
    darkPrimary: "#fb923c",
    darkBg: "#130c08",
    darkCard: "#1f1008",
    darkBorder: "#3d1f0a",
    darkMuted: "#2a1508",
    darkMutedFg: "#a87c60",
    preview: "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
  },
  {
    id: "indigo",
    name: "Himalayan Sky",
    nameNe: "हिमाली आकाश",
    primary: "#3730a3",
    primaryFg: "#ffffff",
    secondary: "#eef2ff",
    secondaryFg: "#3730a3",
    accent: "#4f46e5",
    bg: "#f1f3fb",
    card: "#ffffff",
    border: "#c7d2fe",
    muted: "#e0e7ff",
    mutedFg: "#5b6094",
    darkPrimary: "#818cf8",
    darkBg: "#08080f",
    darkCard: "#10111e",
    darkBorder: "#1e2040",
    darkMuted: "#161830",
    darkMutedFg: "#8b91c4",
    preview: "linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)",
  },
  {
    id: "crimson",
    name: "Rhododendron",
    nameNe: "लालीगुराँस",
    primary: "#9f1239",
    primaryFg: "#ffffff",
    secondary: "#fff1f2",
    secondaryFg: "#9f1239",
    accent: "#be123c",
    bg: "#fdf2f5",
    card: "#ffffff",
    border: "#fecdd3",
    muted: "#ffe4e6",
    mutedFg: "#7c3040",
    darkPrimary: "#fb7185",
    darkBg: "#100508",
    darkCard: "#1c0812",
    darkBorder: "#3d1020",
    darkMuted: "#250c18",
    darkMutedFg: "#b08090",
    preview: "linear-gradient(135deg, #9f1239 0%, #be123c 100%)",
  },
  {
    id: "earth",
    name: "Mustang Earth",
    nameNe: "मुस्ताङ माटो",
    primary: "#78350f",
    primaryFg: "#ffffff",
    secondary: "#fefce8",
    secondaryFg: "#78350f",
    accent: "#92400e",
    bg: "#fafaf5",
    card: "#ffffff",
    border: "#e7d5b0",
    muted: "#fef3c7",
    mutedFg: "#7c6040",
    darkPrimary: "#fbbf24",
    darkBg: "#0d0c08",
    darkCard: "#18160a",
    darkBorder: "#3d3010",
    darkMuted: "#252010",
    darkMutedFg: "#aa9460",
    preview: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
  },
  {
    id: "sage",
    name: "Terai Sage",
    nameNe: "तराई हरियो",
    primary: "#166534",
    primaryFg: "#ffffff",
    secondary: "#f0fdf4",
    secondaryFg: "#166534",
    accent: "#15803d",
    bg: "#f0faf3",
    card: "#ffffff",
    border: "#bbf7d0",
    muted: "#dcfce7",
    mutedFg: "#3d6e50",
    darkPrimary: "#4ade80",
    darkBg: "#04100a",
    darkCard: "#081a10",
    darkBorder: "#14401e",
    darkMuted: "#0c2a16",
    darkMutedFg: "#60a878",
    preview: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
  },
];

const faculties: Faculty[] = [
  { id: "sci", name: "Science", nameNe: "विज्ञान", icon: "⚗️", subjects: 12, color: "#1a7a6e", bgColor: "#e8f4f2" },
  { id: "mgt", name: "Management", nameNe: "व्यवस्थापन", icon: "📊", subjects: 8, color: "#2563eb", bgColor: "#eff6ff" },
  { id: "hum", name: "Humanities", nameNe: "मानविकी", icon: "🏛️", subjects: 10, color: "#7c3aed", bgColor: "#f5f3ff" },
  { id: "law", name: "Law", nameNe: "कानून", icon: "⚖️", subjects: 6, color: "#b45309", bgColor: "#fffbeb" },
  { id: "eng", name: "Engineering", nameNe: "इन्जिनियरिङ", icon: "⚙️", subjects: 14, color: "#0369a1", bgColor: "#f0f9ff" },
  { id: "med", name: "Medicine", nameNe: "चिकित्सा", icon: "🩺", subjects: 9, color: "#be185d", bgColor: "#fdf2f8" },
  { id: "arts", name: "Fine Arts", nameNe: "ललितकला", icon: "🎨", subjects: 7, color: "#059669", bgColor: "#ecfdf5" },
  { id: "edu", name: "Education", nameNe: "शिक्षा", icon: "📚", subjects: 11, color: "#dc2626", bgColor: "#fef2f2" },
];

const subjects: Subject[] = [
  { id: "bio", name: "Biology", nameNe: "जीवविज्ञान", chapters: 14, progress: 64, facultyId: "sci" },
  { id: "chem", name: "Chemistry", nameNe: "रसायनशास्त्र", chapters: 12, progress: 40, facultyId: "sci" },
  { id: "phys", name: "Physics", nameNe: "भौतिकशास्त्र", chapters: 16, progress: 25, facultyId: "sci" },
  { id: "math", name: "Mathematics", nameNe: "गणित", chapters: 18, progress: 80, facultyId: "sci" },
  { id: "bot", name: "Botany", nameNe: "वनस्पतिशास्त्र", chapters: 10, progress: 55, facultyId: "sci" },
  { id: "zoo", name: "Zoology", nameNe: "प्राणीशास्त्र", chapters: 11, progress: 30, facultyId: "sci" },
];

const chapters: Chapter[] = [
  { id: "c1", number: 1, title: "The Cell: Unit of Life", titleNe: "कोशिका: जीवनको एकाइ", description: "Cell theory, prokaryotic vs eukaryotic cells, organelles.", read: true, subjectId: "bio" },
  { id: "c2", number: 2, title: "Biomolecules", titleNe: "जैविक अणुहरू", description: "Carbohydrates, proteins, lipids, nucleic acids.", read: true, subjectId: "bio" },
  { id: "c3", number: 3, title: "Cell Cycle and Division", titleNe: "कोशिका चक्र र विभाजन", description: "Mitosis, meiosis, checkpoints, and significance.", read: true, subjectId: "bio" },
  { id: "c4", number: 4, title: "Transport in Plants", titleNe: "बिरुवामा यातायात", description: "Water potential, osmosis, plasmolysis, long-distance transport.", read: false, subjectId: "bio" },
  { id: "c5", number: 5, title: "Mineral Nutrition", titleNe: "खनिज पोषण", description: "Essential elements, hydroponics, nitrogen fixation.", read: false, subjectId: "bio" },
  { id: "c6", number: 6, title: "Photosynthesis", titleNe: "प्रकाशसंश्लेषण", description: "Light reactions, Calvin cycle, C3 and C4 pathways.", read: false, subjectId: "bio" },
  { id: "c7", number: 7, title: "Respiration in Plants", titleNe: "बिरुवामा श्वासप्रश्वास", description: "Glycolysis, Krebs cycle, electron transport chain.", read: false, subjectId: "bio" },
  { id: "c8", number: 8, title: "Plant Growth and Development", titleNe: "बिरुवाको वृद्धि र विकास", description: "Growth regulators, photoperiodism, vernalization.", read: false, subjectId: "bio" },
];

const notesContent = {
  title: "Photosynthesis",
  titleNe: "प्रकाशसंश्लेषण",
  chapter: "Chapter 6",
  subject: "Biology",
  faculty: "Science",
  readTime: "18 min read",
  readTimeNe: "१८ मिनेट पढ्नुहोस्",
  sections: [
    { heading: "Overview", body: "Photosynthesis is the process by which green plants and certain other organisms use sunlight to synthesize nutrients from carbon dioxide and water. It is the primary source of all food and oxygen on Earth." },
    { heading: "Light Reactions (Photo Phase)", body: "The light-dependent reactions occur in the thylakoid membranes. Light energy is captured by photosystems I and II, water molecules are split (photolysis), and ATP and NADPH are produced.", bullets: ["Photosystem II (P680) absorbs light at 680 nm", "Photosystem I (P700) absorbs light at 700 nm", "Electron transport chain produces a proton gradient", "ATP synthase uses the proton gradient to form ATP (photophosphorylation)", "Net output: ATP, NADPH, and O₂ released"] },
    { heading: "Dark Reactions (Calvin Cycle)", body: "The light-independent reactions (Calvin cycle) take place in the stroma. CO₂ is fixed into organic molecules using the ATP and NADPH from the light reactions.", bullets: ["CO₂ fixation: RuBisCO catalyzes CO₂ + RuBP → 2 molecules of 3-PGA", "Reduction: 3-PGA is reduced to G3P using ATP and NADPH", "Regeneration: RuBP is regenerated using ATP", "For every 3 CO₂ fixed, 1 molecule of G3P is produced"] },
    { heading: "C₃ vs C₄ Plants", body: "Plants are classified based on the first stable product of CO₂ fixation. C₄ plants have evolved a mechanism to concentrate CO₂ around RuBisCO, minimizing photorespiration.", bullets: ["C₃ plants: first stable product is 3-phosphoglycerate — e.g., wheat (गहुँ), rice (चामल)", "C₄ plants: first stable product is oxaloacetate — e.g., sugarcane (उखु), maize (मकै)", "C₄ plants have bundle sheath cells with modified chloroplasts", "CAM plants fix CO₂ at night to reduce water loss — e.g., cacti"] },
  ],
};

const greetingsNe = ["नमस्ते! 🙏", "सुप्रभात! ☀️", "शुभ दिन! 🌸"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [bookmarked, setBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [themeId, setThemeId] = useState("teal");
  const [nepaliMode, setNepaliMode] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [profile, setProfile] = useState<{ name: string; avatar: string }>({ name: "Ananya Sharma", avatar: "🎓" });
  const [editingProfile, setEditingProfile] = useState(false);

  const theme = themes.find((t) => t.id === themeId)!;

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty("--background", theme.darkBg);
      root.style.setProperty("--foreground", "#e8edf2");
      root.style.setProperty("--card", theme.darkCard);
      root.style.setProperty("--card-foreground", "#e8edf2");
      root.style.setProperty("--primary", theme.darkPrimary);
      root.style.setProperty("--primary-foreground", theme.darkBg);
      root.style.setProperty("--secondary", theme.darkMuted);
      root.style.setProperty("--secondary-foreground", theme.darkPrimary);
      root.style.setProperty("--muted", theme.darkMuted);
      root.style.setProperty("--muted-foreground", theme.darkMutedFg);
      root.style.setProperty("--accent", theme.darkPrimary);
      root.style.setProperty("--accent-foreground", theme.darkBg);
      root.style.setProperty("--border", theme.darkBorder);
      root.style.setProperty("--ring", theme.darkPrimary);
    } else {
      root.style.setProperty("--background", theme.bg);
      root.style.setProperty("--foreground", "#0f1923");
      root.style.setProperty("--card", theme.card);
      root.style.setProperty("--card-foreground", "#0f1923");
      root.style.setProperty("--primary", theme.primary);
      root.style.setProperty("--primary-foreground", theme.primaryFg);
      root.style.setProperty("--secondary", theme.secondary);
      root.style.setProperty("--secondary-foreground", theme.secondaryFg);
      root.style.setProperty("--muted", theme.muted);
      root.style.setProperty("--muted-foreground", theme.mutedFg);
      root.style.setProperty("--accent", theme.accent);
      root.style.setProperty("--accent-foreground", theme.primaryFg);
      root.style.setProperty("--border", theme.border);
      root.style.setProperty("--ring", theme.primary);
    }
  }, [theme, darkMode]);

  const navItems: { id: Screen; label: string; labelNe: string; icon: string }[] = [
    { id: "home", label: "Home", labelNe: "गृह", icon: "🏠" },
    { id: "search", label: "Search", labelNe: "खोज्नुस्", icon: "🔍" },
    { id: "bookmarks", label: "Saved", labelNe: "सुरक्षित", icon: "🔖" },
    { id: "profile", label: "Profile", labelNe: "प्रोफाइल", icon: "👤" },
  ];

  if (screen === "splash") {
    return <SplashScreen onDone={() => setScreen("onboarding")} />;
  }

  if (screen === "onboarding") {
    return (
      <OnboardingScreen
        onComplete={() => setScreen("home")}
        theme={theme}
      />
    );
  }

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      <div
        className="min-h-screen max-w-md mx-auto relative flex flex-col"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <div className="flex-1 overflow-y-auto pb-20">
          {screen === "home" && (
            <HomeScreen
              faculties={faculties}
              darkMode={darkMode}
              profile={profile}
              onToggleDark={() => setDarkMode(!darkMode)}
              onSelectFaculty={(f) => { setSelectedFaculty(f); setScreen("subjects"); }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              nepaliMode={nepaliMode}
              theme={theme}
            />
          )}
          {screen === "subjects" && selectedFaculty && (
            <SubjectsScreen
              faculty={selectedFaculty}
              subjects={subjects.filter((s) => s.facultyId === selectedFaculty.id && s.name.toLowerCase().includes(searchQuery.toLowerCase()))}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onBack={() => { setScreen("home"); setSearchQuery(""); }}
              onSelect={(s) => { setSelectedSubject(s); setScreen("chapters"); }}
              nepaliMode={nepaliMode}
            />
          )}
          {screen === "chapters" && selectedSubject && selectedFaculty && (
            <ChaptersScreen
              faculty={selectedFaculty}
              subject={selectedSubject}
              chapters={chapters.filter((c) => c.subjectId === selectedSubject.id && c.title.toLowerCase().includes(searchQuery.toLowerCase()))}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onBack={() => { setScreen("subjects"); setSearchQuery(""); }}
              onSelect={(c) => { setSelectedChapter(c); setScreen("notes"); }}
              nepaliMode={nepaliMode}
            />
          )}
          {screen === "notes" && selectedChapter && (
            <NotesScreen
              chapter={selectedChapter}
              faculty={selectedFaculty!}
              subject={selectedSubject!}
              fontSize={fontSize}
              bookmarked={bookmarked}
              onToggleBookmark={() => setBookmarked(!bookmarked)}
              onFontSize={setFontSize}
              onBack={() => setScreen("chapters")}
              nepaliMode={nepaliMode}
            />
          )}
          {screen === "search" && (
            <SearchScreen
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              subjects={subjects}
              chapters={chapters}
              onSelectSubject={(s) => { const fac = faculties.find((f) => f.id === s.facultyId)!; setSelectedFaculty(fac); setSelectedSubject(s); setScreen("chapters"); }}
              onSelectChapter={(c) => { const sub = subjects.find((s) => s.id === c.subjectId)!; const fac = faculties.find((f) => f.id === sub.facultyId)!; setSelectedFaculty(fac); setSelectedSubject(sub); setSelectedChapter(c); setScreen("notes"); }}
              nepaliMode={nepaliMode}
            />
          )}
          {screen === "bookmarks" && <BookmarksScreen bookmarked={bookmarked} nepaliMode={nepaliMode} />}
          {screen === "profile" && (
            <ProfileScreen
              darkMode={darkMode}
              onToggleDark={() => setDarkMode(!darkMode)}
              onThemeSelect={() => setScreen("themeSelect")}
              onEditProfile={() => setEditingProfile(true)}
              nepaliMode={nepaliMode}
              onToggleNepali={() => setNepaliMode(!nepaliMode)}
              profile={profile}
              theme={theme}
            />
          )}
          {screen === "themeSelect" && (
            <ThemeSelectScreen
              themes={themes}
              currentTheme={themeId}
              onSelect={(id) => { setThemeId(id); }}
              onBack={() => setScreen("profile")}
              nepaliMode={nepaliMode}
              darkMode={darkMode}
            />
          )}

          {/* Edit profile modal overlay */}
          {editingProfile && (
            <EditProfileModal
              profile={profile}
              onSave={(p) => { setProfile(p); setEditingProfile(false); }}
              onClose={() => setEditingProfile(false)}
              nepaliMode={nepaliMode}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex border-t"
          style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="flex-1 flex flex-col items-center gap-0.5 py-3 relative transition-all"
              style={{ color: screen === item.id ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[11px] font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {nepaliMode ? item.labelNe : item.label}
              </span>
              {screen === item.id && (
                <div className="absolute bottom-0 w-8 h-0.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ─── SPLASH SCREEN ─── */
function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="min-h-screen max-w-md mx-auto flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a7a6e 0%, #0f4d44 50%, #083330 100%)",
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.6s ease" : phase === "in" ? "opacity 0.5s ease" : "none",
      }}
    >
      {/* Decorative dhaka-inspired stripe */}
      <div className="absolute top-0 left-0 right-0 h-2 flex overflow-hidden">
        {["#e63946","#f4a261","#2a9d8f","#e9c46a","#264653","#e63946","#f4a261","#2a9d8f","#e9c46a","#264653","#e63946","#f4a261"].map((c, i) => (
          <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 flex overflow-hidden">
        {["#e9c46a","#2a9d8f","#f4a261","#e63946","#264653","#e9c46a","#2a9d8f","#f4a261","#e63946","#264653","#e9c46a","#2a9d8f"].map((c, i) => (
          <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* Mandala / decorative background circle */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      />

      <div
        className="flex flex-col items-center gap-4 px-8 text-center"
        style={{
          transform: phase === "in" ? "translateY(20px)" : "translateY(0)",
          transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* App icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          📖
        </div>

        {/* Devanagari logo text */}
        <div>
          <p
            className="text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
          >
            विद्यार्थी
          </p>
          <p className="text-lg text-white/70 mt-1 font-light tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>
            VIDYARTHI
          </p>
        </div>

        <p className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          ज्ञान नै शक्ति हो · Knowledge is Power
        </p>

        {/* Nepali flag inspired dots */}
        <div className="flex gap-2 mt-2">
          {["#e63946","#ffffff","#e9c46a"].map((c, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c, opacity: 0.8 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ONBOARDING SCREEN ─── */
function OnboardingScreen({ onComplete, theme }: { onComplete: () => void; theme: Theme }) {
  const [step, setStep] = useState(0);

  const slides = [
    { emoji: "📚", titleNe: "स्वागत छ!", title: "Welcome!", desc: "Your personal study companion for all faculties and subjects.", descNe: "सबै संकाय र विषयहरूको लागि तपाईंको व्यक्तिगत अध्ययन सहायक।" },
    { emoji: "🗂️", titleNe: "व्यवस्थित अध्ययन", title: "Organized Learning", desc: "Navigate Faculty → Subject → Chapter → Notes in seconds.", descNe: "संकाय → विषय → अध्याय → नोट्समा सजिलै नेभिगेट गर्नुहोस्।" },
    { emoji: "🌙", titleNe: "तपाईंको रोजाइ", title: "Your Preference", desc: "Dark mode, custom themes, and Nepali language support.", descNe: "डार्क मोड, कस्टम थिम, र नेपाली भाषा समर्थन।" },
  ];

  const slide = slides[step];
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <DhakaStripe />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
        <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl" style={{ background: theme.preview }}>{slide.emoji}</div>
        <div>
          <p className="text-2xl font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{slide.titleNe}</p>
          <p className="text-base font-semibold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}>{slide.title}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{slide.desc}</p>
          <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--muted-foreground)" }}>{slide.descNe}</p>
        </div>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className="h-2 rounded-full transition-all" style={{ width: i === step ? "24px" : "8px", backgroundColor: i === step ? "var(--primary)" : "var(--border)" }} />
          ))}
        </div>
      </div>
      <div className="px-6 pb-10 flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="flex-1 py-3.5 rounded-2xl text-sm font-semibold" style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>Back</button>
        )}
        <button
          onClick={() => step < slides.length - 1 ? setStep(step + 1) : onComplete()}
          className="flex-1 py-3.5 rounded-2xl text-sm font-semibold"
          style={{ background: theme.preview, color: "#fff", fontFamily: "'Outfit', sans-serif" }}
        >
          {step === slides.length - 1 ? "Get Started 🚀" : "Next →"}
        </button>
      </div>
    </div>
  );
}

/* ─── HOME SCREEN ─── */
function HomeScreen({ faculties, darkMode, profile, onToggleDark, onSelectFaculty, searchQuery, onSearchChange, nepaliMode, theme }: {
  faculties: Faculty[]; darkMode: boolean; profile: { name: string; avatar: string };
  onToggleDark: () => void; onSelectFaculty: (f: Faculty) => void; searchQuery: string; onSearchChange: (v: string) => void; nepaliMode: boolean; theme: Theme;
}) {
  const filtered = faculties.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.nameNe.includes(searchQuery));
  const greeting = greetingsNe[new Date().getHours() < 12 ? 1 : new Date().getHours() < 17 ? 0 : 2];

  return (
    <div className="px-4 pt-12 pb-4">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
            {nepaliMode ? greeting : "Good morning 👋"}
          </p>
          <h1 className="text-2xl font-bold mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {nepaliMode ? `${profile.avatar} ${profile.name}` : `Hello, ${profile.name.split(" ")[0]}`}
          </h1>
        </div>
        <button onClick={onToggleDark} className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: "var(--muted)" }}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Dhaka-inspired banner */}
      <div className="rounded-2xl overflow-hidden mb-5" style={{ background: theme.preview }}>
        <div className="px-4 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {nepaliMode ? "नेपालको राष्ट्रिय पुष्प" : "Nepal's National Flower"}
            </p>
            <p className="text-white font-bold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {nepaliMode ? "लालीगुराँस 🌸" : "Rhododendron 🌸"}
            </p>
          </div>
          <div className="flex gap-1">
            {["#e63946","#f4a261","#e9c46a","#2a9d8f","#264653"].map((c, i) => (
              <div key={i} className="w-2 h-8 rounded-full" style={{ backgroundColor: c, opacity: 0.8 }} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        {[
          { label: nepaliMode ? "संकाय" : "Faculties", value: "८" },
          { label: nepaliMode ? "विषय" : "Subjects", value: "८७" },
          { label: nepaliMode ? "अध्याय" : "Chapters", value: "४१२" },
        ].map((s) => (
          <div key={s.label} className="flex-1 rounded-2xl p-3 text-center" style={{ backgroundColor: "var(--secondary)" }}>
            <p className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder={nepaliMode ? "संकाय खोज्नुस्..." : "Search faculties..."} />

      <h2 className="text-base font-semibold mb-3 mt-5" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {nepaliMode ? "संकायहरू" : "Faculties"}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((f) => (
          <button key={f.id} onClick={() => onSelectFaculty(f)} className="rounded-2xl p-4 text-left transition-all active:scale-95" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ backgroundColor: f.bgColor }}>
              {f.icon}
            </div>
            <p className="font-semibold text-sm leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? f.nameNe : f.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              {nepaliMode ? `${toNepaliNum(f.subjects)} विषय` : `${f.subjects} subjects`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── SUBJECTS SCREEN ─── */
function SubjectsScreen({ faculty, subjects, searchQuery, onSearchChange, onBack, onSelect, nepaliMode }: {
  faculty: Faculty; subjects: Subject[]; searchQuery: string; onSearchChange: (v: string) => void;
  onBack: () => void; onSelect: (s: Subject) => void; nepaliMode: boolean;
}) {
  return (
    <div className="px-4 pt-12 pb-4">
      <ScreenHeader onBack={onBack} title={nepaliMode ? faculty.nameNe : faculty.name} subtitle={nepaliMode ? `${toNepaliNum(subjects.length)} विषय` : `${subjects.length} subjects`} />
      <Breadcrumb crumbs={[{ label: nepaliMode ? faculty.nameNe : faculty.name }]} />
      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder={nepaliMode ? "विषय खोज्नुस्..." : "Search subjects..."} />
      <div className="mt-4 flex flex-col gap-3">
        {subjects.map((s) => (
          <button key={s.id} onClick={() => onSelect(s)} className="rounded-2xl p-4 text-left flex items-center gap-4 transition-all active:scale-[0.98]" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: faculty.bgColor }}>📖</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? s.nameNe : s.name}</p>
              <p className="text-xs mt-0.5 mb-2" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? `${toNepaliNum(s.chapters)} अध्याय` : `${s.chapters} chapters`}</p>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--muted)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${s.progress}%`, backgroundColor: faculty.color }} />
              </div>
              <p className="text-[11px] mt-1" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? `${toNepaliNum(s.progress)}% पूरा` : `${s.progress}% complete`}</p>
            </div>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── CHAPTERS SCREEN ─── */
function ChaptersScreen({ faculty, subject, chapters, searchQuery, onSearchChange, onBack, onSelect, nepaliMode }: {
  faculty: Faculty; subject: Subject; chapters: Chapter[]; searchQuery: string; onSearchChange: (v: string) => void;
  onBack: () => void; onSelect: (c: Chapter) => void; nepaliMode: boolean;
}) {
  const readCount = chapters.filter((c) => c.read).length;
  return (
    <div className="px-4 pt-12 pb-4">
      <ScreenHeader onBack={onBack} title={nepaliMode ? subject.nameNe : subject.name} subtitle={nepaliMode ? `${toNepaliNum(chapters.length)} अध्याय` : `${chapters.length} chapters`} />
      <Breadcrumb crumbs={[{ label: nepaliMode ? faculty.nameNe : faculty.name }, { label: nepaliMode ? subject.nameNe : subject.name }]} />
      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder={nepaliMode ? "अध्याय खोज्नुस्..." : "Search chapters..."} />
      <div className="mt-4 rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: faculty.bgColor }}>
        <div className="flex-1">
          <p className="text-xs font-medium mb-1.5" style={{ color: faculty.color, fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "तपाईंको प्रगति" : "Your Progress"}</p>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: `${subject.progress}%`, backgroundColor: faculty.color }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: faculty.color }}>{nepaliMode ? `${toNepaliNum(readCount)} / ${toNepaliNum(chapters.length)} अध्याय पढ्नुभयो` : `${readCount} of ${chapters.length} chapters read`}</p>
        </div>
        <div className="text-3xl font-bold" style={{ color: faculty.color, fontFamily: "'Outfit', sans-serif" }}>{subject.progress}%</div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {chapters.map((c) => (
          <button key={c.id} onClick={() => onSelect(c)} className="rounded-2xl p-4 text-left flex gap-3 transition-all active:scale-[0.98]" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ backgroundColor: c.read ? faculty.color : "var(--muted)", color: c.read ? "#fff" : "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
              {nepaliMode ? toNepaliNum(c.number) : c.number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm leading-snug" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? c.titleNe : c.title}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: c.read ? faculty.bgColor : "var(--muted)", color: c.read ? faculty.color : "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
                  {nepaliMode ? (c.read ? "पढ्नुभयो" : "नपढेको") : (c.read ? "Read" : "Unread")}
                </span>
              </div>
              <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "var(--muted-foreground)" }}>{c.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── NOTES SCREEN ─── */
function NotesScreen({ chapter, faculty, subject, fontSize, bookmarked, onToggleBookmark, onFontSize, onBack, nepaliMode }: {
  chapter: Chapter; faculty: Faculty; subject: Subject; fontSize: "sm" | "base" | "lg"; bookmarked: boolean;
  onToggleBookmark: () => void; onFontSize: (s: "sm" | "base" | "lg") => void; onBack: () => void; nepaliMode: boolean;
}) {
  const fontSizeMap = { sm: "13px", base: "15px", lg: "17px" };
  const [showFontPanel, setShowFontPanel] = useState(false);

  return (
    <div>
      <div className="sticky top-0 z-10 px-4 pt-10 pb-3 flex items-center gap-3" style={{ backgroundColor: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <button onClick={onBack} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--card)" }}>←</button>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] truncate" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
            {nepaliMode ? `${faculty.nameNe} › ${subject.nameNe}` : `${faculty.name} › ${subject.name}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFontPanel(!showFontPanel)} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: "var(--card)", fontFamily: "'Outfit', sans-serif" }}>Aa</button>
          <button onClick={onToggleBookmark} className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ backgroundColor: bookmarked ? "var(--secondary)" : "var(--card)", color: bookmarked ? "var(--primary)" : "var(--foreground)" }}>
            {bookmarked ? "🔖" : "📌"}
          </button>
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{ backgroundColor: "var(--card)" }}>⬆️</button>
        </div>
      </div>

      {showFontPanel && (
        <div className="mx-4 mt-2 rounded-2xl p-3 flex items-center gap-2" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <span className="text-xs mr-1" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "अक्षर" : "Size"}</span>
          {(["sm", "base", "lg"] as const).map((s) => (
            <button key={s} onClick={() => onFontSize(s)} className="flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all" style={{ backgroundColor: fontSize === s ? "var(--primary)" : "var(--muted)", color: fontSize === s ? "var(--primary-foreground)" : "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
              {nepaliMode ? (s === "sm" ? "सानो" : s === "base" ? "सामान्य" : "ठूलो") : (s === "sm" ? "Small" : s === "base" ? "Default" : "Large")}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 pt-3">
        <Breadcrumb crumbs={[{ label: nepaliMode ? faculty.nameNe : faculty.name }, { label: nepaliMode ? subject.nameNe : subject.name }, { label: nepaliMode ? `अ. ${toNepaliNum(chapter.number)}` : `Ch. ${chapter.number}` }]} />
      </div>

      <div className="px-4 pt-2 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: faculty.bgColor, color: faculty.color, fontFamily: "'Outfit', sans-serif" }}>
            {nepaliMode ? `अध्याय ${toNepaliNum(chapter.number)}` : notesContent.chapter}
          </span>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? notesContent.readTimeNe : notesContent.readTime}</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? notesContent.titleNe : notesContent.title}</h1>
        {nepaliMode && <p className="text-base mb-4" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{notesContent.title}</p>}

        <div className="rounded-2xl h-44 mb-6 overflow-hidden" style={{ backgroundColor: faculty.bgColor }}>
          <img src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=600&h=300&fit=crop&auto=format" alt="Photosynthesis — sunlight through green leaves" className="w-full h-full object-cover rounded-2xl" />
        </div>

        {notesContent.sections.map((sec, i) => (
          <div key={i} className="mb-6">
            <h2 className="font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: fontSize === "sm" ? "15px" : fontSize === "base" ? "17px" : "19px" }}>{sec.heading}</h2>
            <p className="leading-relaxed mb-3" style={{ fontSize: fontSizeMap[fontSize], opacity: 0.85 }}>{sec.body}</p>
            {sec.bullets && (
              <ul className="space-y-2">
                {sec.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: faculty.color }} />
                    <span style={{ fontSize: fontSizeMap[fontSize], opacity: 0.85 }}>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <button className="flex-1 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'Outfit', sans-serif" }}>
            ⬇️ {nepaliMode ? "PDF डाउनलोड" : "Download PDF"}
          </button>
          <button className="py-3 px-4 rounded-2xl text-sm font-semibold" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", fontFamily: "'Outfit', sans-serif" }}>
            📤 {nepaliMode ? "शेयर" : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SEARCH SCREEN ─── */
function SearchScreen({ searchQuery, onSearchChange, subjects, chapters, onSelectSubject, onSelectChapter, nepaliMode }: {
  searchQuery: string; onSearchChange: (v: string) => void; subjects: Subject[]; chapters: Chapter[];
  onSelectSubject: (s: Subject) => void; onSelectChapter: (c: Chapter) => void; nepaliMode: boolean;
}) {
  const q = searchQuery.toLowerCase();
  const ms = q ? subjects.filter((s) => s.name.toLowerCase().includes(q) || s.nameNe.includes(q)) : [];
  const mc = q ? chapters.filter((c) => c.title.toLowerCase().includes(q) || c.titleNe.includes(q)) : [];

  return (
    <div className="px-4 pt-12 pb-4">
      <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "खोज्नुस्" : "Search"}</h1>
      <SearchBar value={searchQuery} onChange={onSearchChange} placeholder={nepaliMode ? "विषय, अध्याय खोज्नुस्..." : "Subjects, chapters, topics..."} autoFocus />
      {!q && <div className="mt-8 text-center" style={{ color: "var(--muted-foreground)" }}><p className="text-4xl mb-3">🔍</p><p className="text-sm">{nepaliMode ? "सबै विषय र अध्यायमा खोज्नुस्" : "Search across all subjects and chapters"}</p></div>}
      {q && ms.length === 0 && mc.length === 0 && <div className="mt-8 text-center" style={{ color: "var(--muted-foreground)" }}><p className="text-4xl mb-3">🤷</p><p className="text-sm">No results for "{searchQuery}"</p></div>}
      {ms.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "विषयहरू" : "Subjects"}</p>
          <div className="flex flex-col gap-2">
            {ms.map((s) => (
              <button key={s.id} onClick={() => onSelectSubject(s)} className="rounded-2xl p-3.5 text-left flex items-center gap-3" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                <span className="text-xl">📖</span>
                <div><p className="text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? s.nameNe : s.name}</p><p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.chapters} chapters</p></div>
              </button>
            ))}
          </div>
        </div>
      )}
      {mc.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "अध्यायहरू" : "Chapters"}</p>
          <div className="flex flex-col gap-2">
            {mc.map((c) => (
              <button key={c.id} onClick={() => onSelectChapter(c)} className="rounded-2xl p-3.5 text-left flex items-center gap-3" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
                <span className="text-xl">📄</span>
                <div><p className="text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? c.titleNe : c.title}</p><p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Chapter {c.number}</p></div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── BOOKMARKS SCREEN ─── */
function BookmarksScreen({ bookmarked, nepaliMode }: { bookmarked: boolean; nepaliMode: boolean }) {
  return (
    <div className="px-4 pt-12 pb-4">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "सुरक्षित नोट्स" : "Saved Notes"}</h1>
      {bookmarked ? (
        <div className="rounded-2xl p-4 flex gap-3 items-start" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: "#e8f4f2" }}>🔖</div>
          <div>
            <p className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "प्रकाशसंश्लेषण" : "Photosynthesis"}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? "जीवविज्ञान · अध्याय ६" : "Biology · Chapter 6"}</p>
          </div>
        </div>
      ) : (
        <div className="mt-12 text-center" style={{ color: "var(--muted-foreground)" }}>
          <p className="text-5xl mb-3">🔖</p>
          <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "अहिले सम्म सुरक्षित नोट्स छैन" : "No saved notes yet"}</p>
          <p className="text-xs">{nepaliMode ? "पछि पढ्न नोट्स बुकमार्क गर्नुहोस्" : "Bookmark notes to read them later"}</p>
        </div>
      )}
    </div>
  );
}

/* ─── PROFILE SCREEN ─── */
function ProfileScreen({ darkMode, onToggleDark, onThemeSelect, onEditProfile, nepaliMode, onToggleNepali, profile, theme }: {
  darkMode: boolean; onToggleDark: () => void; onThemeSelect: () => void; onEditProfile: () => void;
  nepaliMode: boolean; onToggleNepali: () => void; profile: { name: string; avatar: string }; theme: Theme;
}) {
  return (
    <div className="px-4 pt-12 pb-4">
      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "प्रोफाइल" : "Profile"}</h1>

      {/* Avatar card */}
      <div className="rounded-2xl p-5 flex items-center gap-4 mb-3" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: theme.preview }}>{profile.avatar}</div>
        <div className="flex-1">
          <p className="font-bold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>{profile.name}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? "विद्यार्थी" : "Student"}</p>
        </div>
        <button onClick={onEditProfile} className="text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", fontFamily: "'Outfit', sans-serif" }}>
          {nepaliMode ? "सम्पादन" : "Edit"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: nepaliMode ? "पढेको" : "Chapters Read", value: nepaliMode ? "३८" : "38" },
          { label: nepaliMode ? "बुकमार्क" : "Bookmarks", value: nepaliMode ? "१२" : "12" },
          { label: nepaliMode ? "लगातार" : "Streak", value: nepaliMode ? "७ दिन" : "7d" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-3 text-center" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "var(--primary)" }}>{s.value}</p>
            <p className="text-[10px] mt-0.5 leading-tight" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Theme selector preview */}
      <button onClick={onThemeSelect} className="w-full rounded-2xl p-4 flex items-center gap-3 mb-3 transition-all active:scale-[0.98]" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: theme.preview }}>🎨</div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? "थिम परिवर्तन" : "Change Theme"}</p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? theme.nameNe : theme.name}</p>
        </div>
        <ChevronRight />
      </button>

      {/* Settings */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        {[
          { icon: "🌙", label: nepaliMode ? "डार्क मोड" : "Dark Mode", action: <ToggleSwitch on={darkMode} onToggle={onToggleDark} /> },
          { icon: "🇳🇵", label: nepaliMode ? "नेपाली भाषा" : "Nepali Language", action: <ToggleSwitch on={nepaliMode} onToggle={onToggleNepali} /> },
          { icon: "🔔", label: nepaliMode ? "सूचना" : "Notifications", action: <ToggleSwitch on={true} onToggle={() => {}} /> },
          { icon: "📥", label: nepaliMode ? "अफलाइन" : "Offline Downloads", action: <ChevronRight /> },
        ].map((item, i, arr) => (
          <div key={item.label} className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
            <span className="text-base">{item.icon}</span>
            <span className="flex-1 text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
            {item.action}
          </div>
        ))}
      </div>

      {/* Nepali cultural footer */}
      <div className="mt-5 rounded-2xl p-4 text-center" style={{ backgroundColor: "var(--secondary)" }}>
        <p className="text-lg mb-1">🏔️ 🌸 🇳🇵</p>
        <p className="text-xs font-medium" style={{ color: "var(--primary)", fontFamily: "'Outfit', sans-serif" }}>
          सगरमाथाको देश · Land of Everest
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>Vidyarthi v1.0 · Made in Nepal 🇳🇵</p>
      </div>
    </div>
  );
}

/* ─── THEME SELECT SCREEN ─── */
function ThemeSelectScreen({ themes, currentTheme, onSelect, onBack, nepaliMode, darkMode }: {
  themes: Theme[]; currentTheme: string; onSelect: (id: string) => void; onBack: () => void; nepaliMode: boolean; darkMode: boolean;
}) {
  return (
    <div className="px-4 pt-12 pb-4">
      <ScreenHeader onBack={onBack} title={nepaliMode ? "थिम छान्नुस्" : "Choose Theme"} subtitle={nepaliMode ? "आफ्नो मनपर्ने रङ छान्नुस्" : "Pick your color theme"} />

      <div className="mt-4 flex flex-col gap-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="rounded-2xl p-4 flex items-center gap-4 transition-all active:scale-[0.98]"
            style={{ backgroundColor: "var(--card)", border: `2px solid ${currentTheme === t.id ? "var(--primary)" : "var(--border)"}` }}
          >
            {/* Gradient swatch */}
            <div className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center" style={{ background: t.preview }}>
              {currentTheme === t.id && <span className="text-white text-xl">✓</span>}
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{nepaliMode ? t.nameNe : t.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{nepaliMode ? t.name : t.nameNe}</p>
              {/* Color dot row */}
              <div className="flex gap-1.5 mt-2">
                {[darkMode ? t.darkPrimary : t.primary, t.accent, darkMode ? t.darkCard : t.secondary].map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c, border: "1.5px solid rgba(0,0,0,0.08)" }} />
                ))}
              </div>
            </div>
            {currentTheme === t.id && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--secondary)", color: "var(--primary)", fontFamily: "'Outfit', sans-serif" }}>
                {nepaliMode ? "सक्रिय" : "Active"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── EDIT PROFILE MODAL ─── */
function EditProfileModal({ profile, onSave, onClose, nepaliMode }: {
  profile: { name: string; avatar: string };
  onSave: (p: { name: string; avatar: string }) => void;
  onClose: () => void;
  nepaliMode: boolean;
}) {
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const avatars = ["🎓", "👩‍🎓", "👨‍🎓", "🦁", "🐯", "🦋", "🌸", "⭐", "🦅", "🏔️", "🌺", "🦚"];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center max-w-md mx-auto" style={{ left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "28rem" }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Sheet */}
      <div className="relative w-full rounded-t-3xl px-5 pt-5 pb-8" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: "var(--border)" }} />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {nepaliMode ? "प्रोफाइल सम्पादन" : "Edit Profile"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}>✕</button>
        </div>

        {/* Current avatar large preview */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: "var(--secondary)" }}>{avatar}</div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
          {nepaliMode ? "अवतार छान्नुस्" : "Choose Avatar"}
        </p>
        <div className="flex gap-2 mb-5 flex-wrap">
          {avatars.map((a) => (
            <button key={a} onClick={() => setAvatar(a)} className="w-11 h-11 rounded-xl text-2xl flex items-center justify-center transition-all" style={{ backgroundColor: avatar === a ? "var(--secondary)" : "var(--muted)", border: `2px solid ${avatar === a ? "var(--primary)" : "transparent"}` }}>
              {a}
            </button>
          ))}
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>
          {nepaliMode ? "नाम" : "Name"}
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={nepaliMode ? "तपाईंको नाम" : "Your name"}
          className="w-full px-4 py-3 rounded-2xl text-sm outline-none mb-5"
          style={{ backgroundColor: "var(--muted)", border: "1.5px solid var(--border)", color: "var(--foreground)", fontFamily: "'Source Sans 3', sans-serif" }}
        />

        <button
          onClick={() => { if (name.trim()) onSave({ name, avatar }); }}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all"
          style={{ backgroundColor: name.trim() ? "var(--primary)" : "var(--muted)", color: name.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}
        >
          {nepaliMode ? "सुरक्षित गर्नुस् ✓" : "Save Changes ✓"}
        </button>
      </div>
    </div>
  );
}

/* ─── SHARED COMPONENTS ─── */
function DhakaStripe() {
  const colors = ["#e63946","#f4a261","#e9c46a","#2a9d8f","#264653","#e63946","#f4a261","#e9c46a","#2a9d8f","#264653","#e63946","#f4a261","#e9c46a","#2a9d8f","#264653"];
  return (
    <div className="h-1.5 flex overflow-hidden">
      {colors.map((c, i) => <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />)}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder, autoFocus }: { value: string; onChange: (v: string) => void; placeholder: string; autoFocus?: boolean }) {
  return (
    <div className="relative mt-3">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--muted-foreground)" }}>🔍</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus} className="w-full pl-9 pr-4 py-3 rounded-2xl text-sm outline-none" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)", fontFamily: "'Source Sans 3', sans-serif" }} />
    </div>
  );
}

function ScreenHeader({ onBack, title, subtitle }: { onBack: () => void; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-2">
      <button onClick={onBack} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>←</button>
      <div>
        <h1 className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>{title}</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function Breadcrumb({ crumbs }: { crumbs: { label: string }[] }) {
  return (
    <div className="flex items-center gap-1 mb-3 flex-wrap">
      <span className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>🏠</span>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="text-xs" style={{ color: "var(--border)" }}>›</span>
          <span className="text-xs font-medium" style={{ color: i === crumbs.length - 1 ? "var(--primary)" : "var(--muted-foreground)", fontFamily: "'Outfit', sans-serif" }}>{c.label}</span>
        </span>
      ))}
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--muted-foreground)" }}>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToggleSwitch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="w-10 h-6 rounded-full relative transition-colors" style={{ backgroundColor: on ? "var(--primary)" : "var(--muted)" }}>
      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: on ? "calc(100% - 22px)" : "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

function toNepaliNum(n: number): string {
  const ne = ["०","१","२","३","४","५","६","७","८","९"];
  return String(n).split("").map((d) => ne[parseInt(d)] ?? d).join("");
}
