import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import WorkEx from './components/sections/WorkEx';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Loader from './components/ui/Loader';
import './App.css';

// Admin editor: only loaded on its unlisted route, so visitors never download it.
const AdminPage = lazy(() => import('./admin/AdminPage'));

function App() {
  return (
    <Routes>
      <Route
        path="/k3th"
        element={
          <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <AdminPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Site />} />
    </Routes>
  );
}

function Site() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <WorkEx />
            <Contact />
          </main>
          <Footer />
          <ScrollToTop />
        </motion.div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
