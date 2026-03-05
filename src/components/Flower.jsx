import React, { useEffect, useRef } from 'react';

// -----------------------------------------------------------
// Canvas-based Flower Animation – ported from standalone HTML
// Transparent background, earth-tone color palette
// -----------------------------------------------------------

const easeOutQuad = (t) => t * (2 - t);
const easeOutCubic = (t) => (--t) * t * t + 1;

const REALISTIC_PALETTES = [
    { name: "Sunflower", outer: "#fbc02d", outerDark: "#d4a017", inner: "#4e342e", glowHue: 45 },
    { name: "Wild Rose", outer: "#f06292", outerDark: "#c2185b", inner: "#fce4ec", glowHue: 340 },
    { name: "Poppy", outer: "#ff5252", outerDark: "#b71c1c", inner: "#1a1a1a", glowHue: 0 },
    { name: "Lavender", outer: "#9575cd", outerDark: "#5e35b1", inner: "#fff59d", glowHue: 270 },
    { name: "Coral Blossom", outer: "#ff7043", outerDark: "#bf360c", inner: "#ffd54f", glowHue: 18 },
    { name: "Marigold", outer: "#fb8c00", outerDark: "#e65100", inner: "#4e342e", glowHue: 35 },
    { name: "Cherry Bloom", outer: "#e91e63", outerDark: "#880e4f", inner: "#fce4ec", glowHue: 330 },
    { name: "Violet Iris", outer: "#7b1fa2", outerDark: "#4a148c", inner: "#ffe082", glowHue: 285 },
];

const BUTTERFLY_PALETTES = [
    { primary: "#ff8c00", secondary: "#e65100", accent: "#000000" },
    { primary: "#00b0ff", secondary: "#0091ea", accent: "#01579b" },
    { primary: "#ffee58", secondary: "#fdd835", accent: "#fbc02d" },
    { primary: "#9575cd", secondary: "#7986cb", accent: "#3f51b5" },
];

const FlowerCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width, height, animId;
        let flower;
        let butterflies = [];
        let particles = [];

        // ── Particle ───────────────────────────────────────
        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = -Math.random() * 0.5 - 0.2;
                this.opacity = Math.random() * 0.4;
            }
            update() {
                this.x += this.speedX + Math.sin(Date.now() / 2000) * 0.2;
                this.y += this.speedY;
                if (this.y < -10) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(139, 111, 71, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ── Butterfly ──────────────────────────────────────
        class Butterfly {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.size = 3.5 + Math.random() * 2;
                this.palette = BUTTERFLY_PALETTES[Math.floor(Math.random() * BUTTERFLY_PALETTES.length)];
                this.flap = Math.random() * Math.PI * 2;
                this.flapSpeed = 0.08 + Math.random() * 0.05;
            }
            update(targetX, targetY) {
                const dx = targetX - this.x;
                const dy = targetY - this.y;
                const d = Math.sqrt(dx * dx + dy * dy) || 1;
                this.vx += (dx / d) * 0.04 + (Math.random() - 0.5) * 0.7;
                this.vy += (dy / d) * 0.04 + (Math.random() - 0.5) * 0.7;
                const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (spd > 1.8) { this.vx = (this.vx / spd) * 1.8; this.vy = (this.vy / spd) * 1.8; }
                this.x += this.vx;
                this.y += this.vy;
                this.flap += this.flapSpeed;
            }
            draw() {
                const ww = Math.abs(Math.sin(this.flap)) * this.size * 2.8;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(Math.atan2(this.vy, this.vx) + Math.PI / 2);
                ctx.globalAlpha = 0.65;
                ctx.fillStyle = this.palette.primary;
                ctx.beginPath();
                ctx.ellipse(-ww / 2, 0, ww / 2, this.size * 1.2, 0, 0, Math.PI * 2);
                ctx.ellipse(ww / 2, 0, ww / 2, this.size * 1.2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = this.palette.accent;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.restore();
            }
        }

        // ── Flower ─────────────────────────────────────────
        class Flower {
            constructor() { this.init(); }
            init() {
                this.growth = 0;
                this.bloom = 0;
                this.seedX = width / 2;
                this.seedY = height * 0.94;
                this.maxHeight = height * 0.60;
                this.palette = REALISTIC_PALETTES[Math.floor(Math.random() * REALISTIC_PALETTES.length)];
                this.stemColor = '#5d8a3c';   // green stem
                this.dirtColor = '#6d4c41';   // brown earth
                this.leafNodes = [
                    { pos: 0.25, side: -1, angle: -1.3 },
                    { pos: 0.45, side: 1, angle: 1.3 },
                ];
                this.headPos = { x: this.seedX, y: this.seedY };
            }
            update() {
                if (this.growth < 1) this.growth += 0.030;
                else if (this.bloom < 1) this.bloom += 0.040;
            }
            draw() {
                const g = easeOutQuad(this.growth);
                const b = easeOutCubic(this.bloom);
                const time = Date.now() / 1500;
                const wind = Math.sin(time) * 4 + Math.sin(time * 0.5) * 2;

                const endY = this.seedY - g * this.maxHeight;
                const endX = this.seedX + wind * g;
                this.headPos = { x: endX, y: endY };

                this.drawDirt(g);
                this.drawStem(g, endX, endY);
                this.drawLeaves(g, wind);
                if (this.growth > 0.85) this.drawBloom(endX, endY, b);
            }
            drawDirt(g) {
                ctx.save();
                const sz = 110 * Math.min(1, g * 1.8);
                const baseY = this.seedY + 18;
                ctx.beginPath();
                // arch top
                ctx.moveTo(this.seedX - sz * 1.5, baseY);
                ctx.quadraticCurveTo(this.seedX, this.seedY - sz * 0.30, this.seedX + sz * 1.5, baseY);
                // fill rectangle all the way to canvas bottom — no gap possible
                ctx.lineTo(this.seedX + sz * 1.5, height + 10);
                ctx.lineTo(this.seedX - sz * 1.5, height + 10);
                ctx.closePath();
                ctx.fillStyle = this.dirtColor;
                ctx.globalAlpha = 0.55;
                ctx.fill();
                ctx.restore();
            }
            drawStem(g, endX, endY) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(this.seedX, this.seedY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = this.stemColor;
                ctx.lineWidth = 13 * (1.1 - g * 0.4);
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.restore();
            }
            drawLeaves(g, wind) {
                this.leafNodes.forEach(node => {
                    if (g < node.pos) return;
                    const progress = Math.min(1, (g - node.pos) * 6);
                    const lx = this.seedX + wind * node.pos;
                    const ly = this.seedY - node.pos * this.maxHeight;
                    ctx.save();
                    ctx.translate(lx, ly);
                    ctx.rotate(node.angle + wind * 0.03);
                    const ll = 70 * progress;
                    const lw = 26 * progress;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(-lw * 0.8, -ll * 0.2, -lw * 1.2, -ll * 0.8, 0, -ll);
                    ctx.bezierCurveTo(lw * 1.2, -ll * 0.8, lw * 0.8, -ll * 0.2, 0, 0);
                    const grad = ctx.createLinearGradient(0, 0, 0, -ll);
                    grad.addColorStop(0, this.stemColor);
                    grad.addColorStop(1, '#a9c5ce');
                    ctx.fillStyle = grad;
                    ctx.fill();
                    ctx.restore();
                });
            }
            drawBloom(x, y, b) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.sin(Date.now() / 2000) * 0.06);

                // Ambient glow
                const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 110 * b);
                glow.addColorStop(0, `hsla(${this.palette.glowHue}, 80%, 85%, 0.28)`);
                glow.addColorStop(1, 'transparent');
                ctx.fillStyle = glow;
                ctx.beginPath(); ctx.arc(0, 0, 110 * b, 0, Math.PI * 2); ctx.fill();

                // Outer petals
                const petalCount = 14;
                const outerH = 130 * b;
                const outerW = 36 * b;
                for (let i = 0; i < petalCount; i++) {
                    ctx.save();
                    ctx.rotate((i * Math.PI * 2) / petalCount);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(-outerW * 1.5, -outerH * 0.4, -outerW, -outerH * 1.1, 0, -outerH);
                    ctx.bezierCurveTo(outerW, -outerH * 1.1, outerW * 1.5, -outerH * 0.4, 0, 0);
                    const pGrad = ctx.createLinearGradient(0, 0, 0, -outerH);
                    pGrad.addColorStop(0, this.palette.outerDark);
                    pGrad.addColorStop(1, this.palette.outer);
                    ctx.fillStyle = pGrad;
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.restore();
                }

                // Center
                if (b > 0.4) {
                    const ib = Math.min(1, (b - 0.4) * 2.5);
                    ctx.beginPath(); ctx.arc(0, 0, 34 * ib, 0, Math.PI * 2);
                    ctx.fillStyle = this.palette.inner; ctx.fill();
                    for (let i = 0; i < 8; i++) {
                        const ang = i * Math.PI / 4 + Date.now() / 1000;
                        ctx.beginPath();
                        ctx.arc(Math.cos(ang) * 14 * ib, Math.sin(ang) * 14 * ib, 2.5 * ib, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill();
                    }
                }
                ctx.restore();
            }
        }

        // ── Setup & Loop ───────────────────────────────────
        function resize() {
            const parent = canvas.parentElement;
            width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
            height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
            if (flower) flower.init();
            particles = Array.from({ length: 30 }, () => new Particle());
        }

        function animate() {
            // Transparent clear — shows portfolio background through the canvas
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => { p.update(); p.draw(); });

            if (flower) {
                flower.update();
                flower.draw();
                butterflies.forEach(b => {
                    b.update(flower.headPos.x, flower.headPos.y);
                    b.draw();
                });
            }
            animId = requestAnimationFrame(animate);
        }

        const onResize = () => resize();
        window.addEventListener('resize', onResize);

        resize();
        flower = new Flower();
        butterflies = Array.from({ length: 3 }, () => new Butterfly());
        animate();

        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', height: '100%' }}
        />
    );
};

export default FlowerCanvas;
