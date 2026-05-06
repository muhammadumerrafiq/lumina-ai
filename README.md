# 📚 Lumina AI: Intelligent Library Assistant

Lumina AI is a premium, AI-powered library management dashboard designed for the modern reader. It features seamless **OCR (Optical Character Recognition)** for scanning book covers and an intelligent categorization system, all wrapped in a stunning glassmorphic interface.

<p align="center">
  <img src="https://img.shields.io/badge/AI-OCR%20Scanning-6366f1?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Tech-Tesseract.js-white?style=for-the-badge" />
  <img src="https://img.shields.io/badge/UI-Glassmorphism-22d3ee?style=for-the-badge" />
</p>

---

## ✨ Features

- **🔍 AI Smart Scan**: Point your camera or upload a book cover to automatically extract titles and authors using **Tesseract.js**.
- **💎 Glassmorphic Design**: A state-of-the-art UI featuring backdrop-blur panels, neon accents, and smooth micro-interactions.
- **📖 Digital Library**: Manage your physical book collection with a clean, grid-based dashboard.
- **✨ Smooth Transitions**: Implemented with Framer Motion for a premium user experience.
- **AI-Ready Architecture**: Built to integrate with LLMs for automatic book summaries and recommendations.

---

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **AI/ML Engine**: Tesseract.js
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System: "Lumina")

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammadumerrafiq/lumina-ai.git
   cd lumina-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture

Lumina AI follows a clean component-based architecture:

- **OCR Engine**: A dedicated worker thread manages Tesseract.js processing to prevent UI blocking during image analysis.
- **Design System**: A robust set of CSS variables and utility classes defined in `index.css` for a consistent "Lumina" aesthetic.
- **State Management**: React hooks manage the live library state and scanning progress.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Created with ❤️ by <a href="https://github.com/muhammadumerrafiq">Muhammad Umer Rafiq</a>
</p>
