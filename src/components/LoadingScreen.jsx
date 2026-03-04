import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Loading Screen
 * Phase 1 'loading'  (0 – 2s):   "Parul" centered, black bar fills
 * Phase 2 'fly'      (2 – 3.2s): "Parul" travels (no fade) to .nav-logo position
 * Phase 3 'fadeout'  (3.2 – 3.7s): overlay fades, site fades in behind it
 * Phase 4 'done'     (3.7s+):    component unmounts
 */
const LoadingScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState('loading');
    const [target, setTarget] = useState(null); // null until measured

    // Delay measuring until after first paint so nav-logo has real dims
    useEffect(() => {
        const measureId = requestAnimationFrame(() => {
            const logo = document.querySelector('.nav-logo');
            if (logo) {
                const rect = logo.getBoundingClientRect();
                setTarget({
                    x: (rect.left + rect.width / 2) - window.innerWidth / 2,
                    y: (rect.top + rect.height / 2) - window.innerHeight / 2,
                });
            }
        });
        return () => cancelAnimationFrame(measureId);
    }, []);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('fly'), 2000);  // start flying
        const t2 = setTimeout(() => setPhase('fadeout'), 3200);  // arrived → fade overlay
        const t3 = setTimeout(() => {
            setPhase('done');
            onComplete?.();
        }, 3700);                                                  // fully done
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    // Scale so the flying text visually matches the nav-logo size
    // nav-logo font ≈ 1.3rem ≈ 20.8px; loading font ≈ 10vw capped at 7rem
    const loadingFontSize = Math.min(window.innerWidth * 0.10, 112); // px
    const navFontSize = 20.8; // approx px
    const flyScale = navFontSize / loadingFontSize;

    const flyTarget = target
        ? { x: target.x, y: target.y, scale: flyScale }
        : { x: 0, y: 0, scale: 1 };

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    key="loader"
                    style={styles.overlay}
                    animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* "Parul" — moves clean with NO opacity change */}
                    <motion.div
                        style={styles.nameWrapper}
                        animate={
                            phase === 'fly' || phase === 'fadeout'
                                ? flyTarget
                                : { x: 0, y: 0, scale: 1 }
                        }
                        transition={{
                            duration: 1.1,       // slow enough to look natural
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        Parul
                    </motion.div>

                    {/* Black loading bar — only during 'loading' phase */}
                    {phase === 'loading' && (
                        <div style={styles.barTrack}>
                            <motion.div
                                style={styles.barFill}
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#f7f3ee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
    },
    nameWrapper: {
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(3rem, 10vw, 7rem)',
        fontWeight: 700,
        color: '#2c2420',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        transformOrigin: 'center center',
        userSelect: 'none',
        whiteSpace: 'nowrap',
    },
    barTrack: {
        width: 'min(320px, 60vw)',
        height: '3px',
        background: 'rgba(44,36,32,0.12)',
        borderRadius: '2px',
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        background: '#2c2420',
        borderRadius: '2px',
    },
};

export default LoadingScreen;
