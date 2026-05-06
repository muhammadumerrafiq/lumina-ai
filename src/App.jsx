import React, { useState, useEffect } from 'react';
import { 
  Library, 
  Search, 
  Camera, 
  BookOpen, 
  Sparkles, 
  Layers,
  Settings,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tesseract from 'tesseract.js';
import './App.css';

const MOCK_BOOKS = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", rating: 4.8 },
  { id: 2, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", rating: 4.9 },
  { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self-Help", rating: 4.7 },
  { id: 4, title: "Neuromancer", author: "William Gibson", category: "Cyberpunk", rating: 4.5 },
];

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanStatus('Analyzing book cover...');
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      console.log('Recognized text:', text);
      // In a real app, we'd parse this text or use an LLM to identify the book
      setScanStatus('Book identified: ' + text.substring(0, 30) + '...');
      
      // Simulate adding to library after a delay
      setTimeout(() => {
        setIsScanning(false);
        setScanStatus('');
      }, 2000);
    } catch (err) {
      console.error(err);
      setScanStatus('Error reading book cover.');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <Sparkles size={28} color="#22d3ee" />
          LUMINA AI
        </div>
        
        <nav className="nav-links">
          <a href="#" className="nav-item active"><Library size={20} /> Library</a>
          <a href="#" className="nav-item"><BookOpen size={20} /> Reading Now</a>
          <a href="#" className="nav-item"><Layers size={20} /> Collections</a>
          <a href="#" className="nav-item"><Settings size={20} /> Settings</a>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Upgrade to Lumina Pro for unlimited AI insights.
            </p>
            <button className="btn-primary" style={{ width: '100%' }}>Upgrade Now</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search by title, author, or vibe..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '3rem' }}
            />
          </div>
          
          <button className="btn-primary" onClick={() => setIsScanning(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Add Book
          </button>
        </header>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '2rem' }}>My Library</h2>
            <div className="ai-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={12} /> AI Curation Active
            </div>
          </div>

          <div className="book-grid">
            {books.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())).map((book, index) => (
              <motion.div 
                key={book.id}
                className="glass-card book-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="book-cover">
                  {/* Image placeholder */}
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                    <BookOpen size={48} />
                  </div>
                </div>
                <div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                   <div style={{ color: '#fbbf24', fontSize: '0.9rem' }}>★ {book.rating}</div>
                   <div className="ai-tag">{book.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Scan Modal */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            className="scan-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-card scan-window"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3>AI Smart Scan</h3>
                <button onClick={() => setIsScanning(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed var(--glass-border)', borderRadius: '1rem', marginBottom: '2rem' }}>
                <Camera size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-secondary)' }}>Upload a photo of a book cover to add it automatically.</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleScan}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="btn-primary" style={{ display: 'inline-block', marginTop: '1.5rem', cursor: 'pointer' }}>
                  Select Image
                </label>
              </div>

              {scanStatus && (
                <div style={{ textAlign: 'center', color: 'var(--accent-secondary)' }}>
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {scanStatus}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
