# AI Study Assistant for College Students 🎓

An intuitive, modern, and responsive web application designed as a first-year **B.Sc. Information Technology** pair project. Built with **React + Vite**, **Tailwind CSS**, **Recharts**, and **Browser LocalStorage** with a red-and-white theme.

🌐 **Live Public Deployment URL:** [https://aop-study-assistant-college.surge.sh](https://aop-study-assistant-college.surge.sh)

---

## 🚀 Key Project Highlights

- **100% Client-Side & Zero-Backend**: Operates without external database servers or complex microservices.
- **Persistent LocalStorage Engine**: Saves subjects, tasks, notes, exams, study logs, and AI conversations across page refreshes.
- **Red & White Theme with Dark Mode**: Styled with red and white palette, rounded card layouts, progress bars, and high-contrast dark mode.
- **Transparent AI Academic Assistant**: Includes an offline demo/mock academic engine covering B.Sc. IT topics (C Programming, Pointers, Discrete Math, Web Tech, Database Normalization, Computer Architecture, Networking) with zero external API keys or secrets exposed.
- **Interactive Live Study Timer**: Features an integrated stopwatch and 25-minute Pomodoro timer that automatically records sessions to study history with celebratory confetti.
- **Data-Driven Smart Insights**: Heuristic algorithms analyze student workload, impending exams, overdue tasks, and low-progress subjects to offer actionable study tips.

---

## 📂 Project Architecture

```
src/
├── components/
│   ├── ai/
│   │   ├── ChatMessage.jsx       # Academic chat bubble with syntax highlighting & copy
│   │   └── PromptChips.jsx       # Quick prompt suggestions (pointers, SQL, revision plans)
│   ├── common/
│   │   ├── Badge.jsx             # Semantic priority and status badges
│   │   ├── Button.jsx            # Reusable button with primary (red), outline & ghost variants
│   │   ├── ConfirmDialog.jsx     # Destructive action confirmation modal
│   │   ├── EmptyState.jsx        # Illustrated empty state placeholders
│   │   ├── Modal.jsx             # Accessible modal container with backdrop
│   │   └── StatCard.jsx          # Metric cards with trend indicators
│   ├── exams/
│   │   └── ExamModal.jsx         # Modal for scheduling midterms, quizzes, and vivas
│   ├── layout/
│   │   ├── MobileNav.jsx         # Responsive slide drawer and bottom navigation
│   │   ├── Navbar.jsx            # Top navbar with quick add and dark mode toggle
│   │   └── Sidebar.jsx           # Desktop sidebar with badges and student profile
│   ├── notes/
│   │   └── NoteModal.jsx         # Note and cheatsheet editor modal
│   ├── planner/
│   │   ├── ActiveTimer.jsx       # Live Stopwatch & Pomodoro study timer
│   │   ├── PlanModal.jsx         # Study goal setting modal
│   │   └── SessionModal.jsx      # Manual study session logger
│   ├── subjects/
│   │   ├── SubjectDetailModal.jsx# Subject drill-down (tasks, notes, exams, progress)
│   │   └── SubjectModal.jsx      # Subject create/edit modal with color palette
│   └── tasks/
│       └── TaskModal.jsx         # Task creation modal with priority and due date
├── context/
│   └── StudyContext.jsx          # Central React context with LocalStorage auto-sync
├── data/
│   ├── initialData.js            # Sample B.Sc. IT course data (CS101, IT102, MA103, etc.)
│   └── mockAIResponses.js        # Academic knowledge base & synthesizer
├── pages/
│   ├── Dashboard.jsx             # Student dashboard overview with Recharts activity graph
│   ├── AIAssistant.jsx           # AI academic chat with quick prompt chips
│   ├── SubjectsPage.jsx          # Course curriculum and syllabus tracker
│   ├── TasksPage.jsx             # Assignment manager with search, filter, and quick add
│   ├── NotesPage.jsx             # Study notes and cheatsheets with search
│   ├── ExamsPage.jsx             # Exam deadlines with countdown badges
│   ├── StudyPlannerPage.jsx      # Study planner & session logger
│   ├── ProgressPage.jsx          # Analytics with Recharts bar & pie charts
│   ├── SmartInsightsPage.jsx     # Rule-based study recommendations
│   └── SettingsPage.jsx          # Profile details, dark mode, and reset controls
├── utils/
│   ├── dateUtils.js              # Date formatting, countdowns, and relative days
│   └── insightsEngine.js         # Heuristics engine calculating workload suggestions
├── App.jsx                       # Main application shell and routing
├── main.jsx                      # React entrypoint
└── index.css                     # Tailwind directives and custom scrollbars
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ES6+ Modules)
- **Styling**: Tailwind CSS 3.4 (Red & White Theme + Dark Mode)
- **Icons**: Lucide React
- **Charts**: Recharts 3.10
- **Storage**: Browser LocalStorage API
- **Deployment**: Surge.sh Static Web Publishing

---

## 💻 Local Development Setup

To run this project on your local machine:

1. **Clone or navigate to the directory**:
   ```bash
   cd "AOP assignment"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🎓 Academic Submission Details

- **Program**: B.Sc. Information Technology (FY B.Sc. IT)
- **Course**: Advanced Object-Oriented Programming & Web Application Development
- **Project Structure**: Pair-programming team project (Two Students)
- **Theme**: Red (`#dc2626`) & White
- **Live URL**: [https://aop-study-assistant-college.surge.sh](https://aop-study-assistant-college.surge.sh)
