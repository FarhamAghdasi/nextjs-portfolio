'use client'
import { useEffect , useRef } from "react";

const ParticleCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const depth = 400;
        const perspective = 600;
        const particleCount = 60;
        const maxParticles = 100;
        const particles: any[] = [];

        class Particle {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            radius: number;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
                this.z = Math.random() * depth;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.vz = (Math.random() - 0.5) * 0.2;
                this.radius = 2 + Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;

                if (this.z < 0 || this.z > depth) this.vz *= -1;
                if (this.x < -width / 2 || this.x > width / 2) this.vx *= -1;
                if (this.y < -height / 2 || this.y > height / 2) this.vy *= -1;

                if (Math.random() < 0.001 && particles.length < maxParticles) {
                    particles.push(new Particle());
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                const scale = perspective / (perspective + this.z);
                const x2D = width / 2 + this.x * scale;
                const y2D = height / 2 + this.y * scale;
                const r = this.radius * scale;

                ctx.save();
                ctx.shadowColor = 'rgba(255,255,255,0.9)';
                ctx.shadowBlur = 10 * scale;
                ctx.beginPath();
                ctx.arc(x2D, y2D, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${0.7 * scale})`;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                const scale1 = perspective / (perspective + p1.z);
                const x1 = width / 2 + p1.x * scale1;
                const y1 = height / 2 + p1.y * scale1;

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const scale2 = perspective / (perspective + p2.z);
                    const x2 = width / 2 + p2.x * scale2;
                    const y2 = height / 2 + p2.y * scale2;

                    const dx = x1 - x2;
                    const dy = y1 - y2;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const alpha = (120 - dist) / 120;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let p of particles) {
                p.update();

                const dx = (mouse.current.x - width / 2) - p.x;
                const dy = (mouse.current.y - height / 2) - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    p.vx += dx / dist * 0.05;
                    p.vy += dy / dist * 0.05;
                }

                p.draw(ctx);
            }

            drawConnections();
            requestAnimationFrame(animate);
        };

        const handleMouse = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', handleMouse);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                background: 'transparent',
                pointerEvents: 'none',
            }}
        />
    );
};

export default ParticleCanvas