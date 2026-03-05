import React, { useState } from 'react';
import {
  Code2, Cpu, Globe, Briefcase, Terminal,
  Files, ChevronRight, Maximize2, MousePointer2,
} from 'lucide-react';
import './Skills.css';

const skillsData = [
  { category: "Languages", icon: <Code2 className="w-5 h-5" />, skills: ["C", "C++", "Python"] },
  { category: "Core Concepts", icon: <Cpu className="w-5 h-5" />, skills: ["Data Structures", "Algorithms"] },
  { category: "Web Development", icon: <Globe className="w-5 h-5" />, skills: ["HTML", "CSS", "JavaScript"] },
  { category: "Enterprise Tools", icon: <Briefcase className="w-5 h-5" />, skills: ["Microsoft Dynamics 365", "Copilot Studio", "IVR Systems"] },
  { category: "Tools & Platforms", icon: <Terminal className="w-5 h-5" />, skills: ["Git", "GitHub", "VS Code"] },
];

const C = {
  bg: '#f7f3ee',
  text: '#2c2420',
  accent: '#8b6f47',
  cardBg: '#efe9e1',
  border: '#e0d5c5',
};

/* ── 1. Perspective Folders ──────────────────────────────── */
const GalleryStack = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-8">
    {skillsData.map((cat, idx) => (
      <div key={idx} className="group" style={{ perspective: '1000px' }}>
        <div className="relative transition-all duration-700" style={{ transformStyle: 'preserve-3d', height: '320px' }}>
          {/* Drop shadow */}
          <div className="absolute inset-x-2 top-2 h-full rounded-2xl transition-transform duration-500 group-hover:translate-y-2"
            style={{ background: 'rgba(0,0,0,0.05)', filter: 'blur(10px)', borderRadius: '16px' }} />

          {/* Card */}
          <div className="absolute inset-0 flex flex-col border transition-all duration-500"
            style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : C.cardBg, borderColor: C.border, borderRadius: '16px', padding: '28px', transform: 'translateZ(20px)', overflow: 'visible' }}>

            {/* Folder tab */}
            <div className="absolute top-0 left-0 flex items-center justify-center border-t border-x"
              style={{ width: '110px', height: '34px', borderRadius: '10px 10px 0 0', backgroundColor: idx % 2 === 0 ? '#ffffff' : C.cardBg, borderColor: C.border, transform: 'translateY(calc(-100% + 1px))' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '8px', opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.05em', fontStyle: 'italic' }}>
                Archive_{idx + 1}
              </span>
            </div>

            {/* Header: icon left, title right */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: C.bg, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cat.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 700, margin: 0, textAlign: 'right', lineHeight: 1.2 }}>
                {cat.category}
              </h3>
            </div>

            {/* Skills list — bullet point style */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              {cat.skills.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: C.accent, fontSize: '1.1rem', lineHeight: 1 }}>•</span>
                  <span style={{ fontSize: '1rem', fontWeight: 500, color: C.text, letterSpacing: '0.02em' }}>{s}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: `1px dashed ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '8px', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Technical_Core</span>
              <Maximize2 size={12} style={{ opacity: 0.2 }} className="group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ── 2. Blooming Skill Garden ────────────────────────────── */
const SkillGarden = () => (
  <div className="relative py-16 px-4" style={{ minHeight: '700px' }}>
    <style>{`
      @keyframes sk-sway { 0%,100%{transform:rotate(-3deg) translateX(-2px)} 50%{transform:rotate(3deg) translateX(2px)} }
      @keyframes sk-pollen { 0%{transform:translateY(0) scale(1);opacity:0} 50%{opacity:.8} 100%{transform:translateY(-36px) scale(0);opacity:0} }
      .sk-sway { animation: sk-sway 6s ease-in-out infinite; transform-origin: bottom center; }
    `}</style>

    <div className="flex flex-wrap justify-center" style={{ gap: '7rem 6rem', paddingBottom: '6rem' }}>
      {skillsData.map((cat, catIdx) => (
        <div key={catIdx} className="relative group sk-sway" style={{ animationDelay: `${catIdx * -1.2}s` }}>

          {/* Stem */}
          <svg className="absolute left-1/2 -translate-x-1/2 opacity-25"
            style={{ top: '92px', width: '56px', height: '180px', zIndex: -1 }}
            viewBox="0 0 100 200" fill="none">
            <path d="M50 0 C 50 50, 70 100, 50 200" stroke={C.accent} strokeWidth="5" strokeLinecap="round" />
            <path d="M55 80 Q 80 70 85 50 Q 75 65 55 80" fill={C.accent} />
            <path d="M45 120 Q 20 110 15 90 Q 25 105 45 120" fill={C.accent} />
          </svg>

          {/* Bloom */}
          <div className="relative flex items-center justify-center" style={{ width: '320px', height: '320px' }}>
            {cat.skills.map((skill, sIdx) => {
              const angle = (sIdx / cat.skills.length) * 360;
              return (
                <div key={sIdx} className="absolute" style={{ transform: `rotate(${angle}deg)`, opacity: 0.88 }}>
                  <div className="flex flex-col items-center justify-start border shadow-sm transition-all duration-700 group-hover:-translate-y-[85px] group-hover:scale-110"
                    style={{
                      width: '108px', height: '210px', paddingTop: '26px', paddingLeft: '10px', paddingRight: '10px',
                      borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%',
                      backgroundColor: sIdx % 2 === 0 ? '#fff' : C.cardBg,
                      borderColor: C.border, transformOrigin: 'bottom center',
                    }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3, transform: `rotate(${-angle}deg)` }}>
                      {skill}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Core */}
            <div className="z-10 rounded-full flex flex-col items-center justify-center border-[7px] shadow-xl transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110"
              style={{ width: '170px', height: '170px', backgroundColor: C.cardBg, borderColor: '#fff', color: C.text }}>
              <div style={{ color: C.accent, marginBottom: '6px', transform: 'scale(1.5)' }}>{cat.icon}</div>
              <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'center', padding: '0 12px', lineHeight: 1.3, opacity: 0.8, marginTop: '4px' }}>
                {cat.category}
              </span>
            </div>
          </div>

          {/* Pollen */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute rounded-full" style={{
                width: '4px', height: '4px',
                left: `${50 + Math.cos(i * 1.05) * 50}%`,
                top: `${50 + Math.sin(i * 1.05) * 50}%`,
                backgroundColor: C.accent,
                animation: `sk-pollen ${1.8 + i * 0.25}s ease-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── 3. IDE Mockup ───────────────────────────────────────── */
const IDEMockup = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="rounded-xl overflow-hidden shadow-xl flex flex-col border" style={{ height: '580px', borderColor: C.text, backgroundColor: '#fff' }}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: C.text, backgroundColor: C.cardBg }}>
        <div className="flex gap-1.5">
          {['#f87171', '#fbbf24', '#4ade80'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c, opacity: 0.7 }} />)}
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, opacity: 0.55, letterSpacing: '0.05em' }}>TECHNICAL_MANIFEST — editor</span>
        <div style={{ width: '48px' }} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="border-r overflow-y-auto" style={{ width: '180px', padding: '14px', borderColor: `${C.text}40`, backgroundColor: '#faf8f5' }}>
          <div className="flex items-center gap-1 mb-3" style={{ fontSize: '9px', fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            <Files style={{ width: '11px', height: '11px' }} /> Source
          </div>
          {skillsData.map((cat, idx) => (
            <button key={idx} onClick={() => setSelected(idx)}
              className={`w-full text-left flex items-center gap-1.5 truncate transition-colors ${selected === idx ? 'font-bold' : 'opacity-55 hover:opacity-80'}`}
              style={{ padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace', backgroundColor: selected === idx ? '#fff' : 'transparent', boxShadow: selected === idx ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', border: 'none', cursor: 'pointer', color: C.text, marginBottom: '2px' }}>
              <ChevronRight style={{ width: '11px', height: '11px', transform: selected === idx ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
              {cat.category.replace(/\s/g, '_').toLowerCase()}.sh
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto relative" style={{ padding: '2rem' }}>
          <div className="flex items-center gap-3 mb-6">
            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: C.cardBg, color: C.accent }}>{skillsData[selected].icon}</div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>{skillsData[selected].category}</h3>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', opacity: 0.4, fontStyle: 'italic', margin: '3px 0 0' }}>{'// initialized skills environment'}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontFamily: 'monospace', fontSize: '15px' }}>
            <div><span style={{ color: '#2563eb' }}>export const</span> <span style={{ color: '#b45309' }}>stack</span> = [</div>
            {skillsData[selected].skills.map((skill, i) => (
              <div key={i} style={{ paddingLeft: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ opacity: 0.2 }}>{i + 1}</span>
                <span style={{ padding: '3px 10px', borderRadius: '5px', backgroundColor: '#f0fdf4', color: '#166534' }}>"{skill}"</span>
              </div>
            ))}
            <div>];</div>
          </div>
          <MousePointer2 className="absolute bottom-6 right-6 opacity-10 animate-pulse" style={{ width: '20px', height: '20px' }} />
        </div>
      </div>
    </div>
  );
};

/* ── 4. Magazine Spread ──────────────────────────────────── */
const MagazineLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
    {skillsData.map((cat, idx) => (
      <div key={idx} style={{ display: 'flex', flexDirection: idx % 2 !== 0 ? 'row-reverse' : 'row', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px, 12vw, 120px)', lineHeight: 1, fontWeight: 900, opacity: 0.04, userSelect: 'none', marginBottom: '-55px', color: C.text }}>
            0{idx + 1}
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, margin: 0, paddingLeft: '1.2rem', borderLeft: `7px solid ${C.accent}`, position: 'relative', zIndex: 1 }}>
            {cat.category}
          </h3>
          <p style={{ marginTop: '1.2rem', fontSize: '0.85rem', lineHeight: 1.7, opacity: 0.55, fontStyle: 'italic', maxWidth: '24rem' }}>
            Exploring the foundations of {cat.category.toLowerCase()} through modern methodologies and rigorous implementation.
          </p>
        </div>
        <div style={{ flex: '0 0 55%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0 2rem' }}>
          {cat.skills.map((skill, sIdx) => (
            <div key={sIdx} className="group" style={{ paddingBottom: '1rem', borderBottom: `1px solid ${C.border}`, marginBottom: '2rem', cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="transition-all duration-300 group-hover:pl-3" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, letterSpacing: '-0.01em' }}>
                  {skill}
                </span>
                <Maximize2 className="opacity-0 group-hover:opacity-30 transition-opacity" style={{ width: '14px', height: '14px' }} />
              </div>
              <div className="w-0 group-hover:w-full transition-all duration-700" style={{ height: '2px', backgroundColor: C.accent }} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* ── Main ────────────────────────────────────────────────── */
const DESIGNS = [
  { name: 'IDE', component: <IDEMockup /> },
  { name: 'Folders', component: <GalleryStack /> },
  { name: 'Garden', component: <SkillGarden /> },
  { name: 'Magazine', component: <MagazineLayout /> },
];

const Skills = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner" style={{ maxWidth: '1400px' }}>
        {/* Header row */}
        <div className="skills-header">
          <div>
            <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 700, opacity: 0.4, marginBottom: '0.5rem' }}>
              Engineering Portfolio
            </p>
            <h2 className="section-title">Skills</h2>
            <div className="section-title-underline" />
          </div>

          {/* View toggles */}
          <div className="skills-toggles">
            {DESIGNS.map((d, idx) => (
              <button key={idx} onClick={() => setActive(idx)} className="skills-toggle-btn"
                style={{ borderBottomColor: active === idx ? C.accent : 'transparent', opacity: active === idx ? 1 : 0.35, color: C.text }}>
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div style={{ transition: 'opacity 0.4s' }}>
          {DESIGNS[active].component}
        </div>
      </div>
    </section>
  );
};

export default Skills;
