# 📊 Smart Dashboard Builder
> **A high-performance, real-time data exploration tool built for modern web analytics.**

This isn't just a coding exercise—it's a **DashEngine**. It features a custom multi-gate filtering logic, deep-link persistence, and real-time data analysis. Built with a focus on speed, clean UI, and "SaaS-grade" engineering.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Key Features

### 🧠 Advanced Query Engine
Build complex logic chains using **AND/OR** gates. The engine supports multi-type filtering including exact matches, partial strings, and numeric comparisons ($>, <$).

### 🔗 Deep Linking & Persistence
* **Shareable URLs**: Every filter state is Base64 serialized into the URL. Copy the link and share a specific "view" with anyone.
* **Local Persistence**: Your query rules are automatically synced to `localStorage`, so your work survives page refreshes.

### 📊 Real-Time Analytics
A dynamic **Stats Bar** that recalculates KPIs (Total Spend, Active Ratios, Average Age) instantly as you filter, turning a simple table into a Business Intelligence tool.

### 📥 Enterprise Data Portability
One-click **CSV Export** functionality allows users to take their filtered segments out of the app and into Excel or Google Sheets.

### 🌐 Live API Integration
Fetches data from external REST APIs with a custom "Enrichment Layer" to simulate real-world data complexity, complete with loading skeletons and error handling.

---

## 🛠️ Tech Stack

* **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Optimized for ultra-fast dev builds)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly typed for rock-solid logic)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom "SaaS-modern" design language)
* **Icons**: [Lucide React](https://lucide.dev/) (Clean, consistent iconography)

---

## 📦 Project Structure

```text
src/
 ├── components/       # Atomic UI components (Table, FilterBuilder, Stats)
 ├── hooks/            # Custom logic (LocalStorage, URL Syncing hooks)
 ├── utils/            # The "Brain" (Filter Engine, CSV Export logic)
 ├── types/            # Centralized TypeScript interfaces
 └── data/             # Mock data & fallback sets

 ⚙️ Installation & Setup
Clone the repo

Bash
git clone [https://github.com/your-username/smart-dashboard-builder.git](https://github.com/your-username/smart-dashboard-builder.git)
Install dependencies

Bash
npm install
Run the development server

Bash
npm run dev
Build for production

Bash
npm run build
🧠 Engineering Decisions
Vite vs. Next.js: Since this is a Client-Side Heavy (CSH) application focused on state manipulation rather than SEO, Vite was chosen for its near-instant HMR (Hot Module Replacement) and smaller bundle size.

Base64 State Serialization: To handle complex sharing, the filter state is encoded into a Base64 string. This ensures the URL remains stable and doesn't break due to special characters in query parameters.

Lazy State Initialization: The app uses lazy initializers for state to prioritize URL parameters over LocalStorage, ensuring shared links always take precedence.
