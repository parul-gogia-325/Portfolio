import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div id="content">
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Achievements />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
