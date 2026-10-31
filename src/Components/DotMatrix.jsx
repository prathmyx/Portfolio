import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

export default function DotMatrix() {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            const ctx = canvas.getContext('2d');
            if (!ctx) return undefined;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return undefined;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        let animationFrameId;
        let width = 0;
        let height = 0;
        const gap = 20;
        const baseRadius = 1.5;
        const maxRadius = 2.2;
        const baseAlpha = 0.2;
        const maxAlpha = 0.7;
        const maxDistance = 100;
        const maxRepulsion = 20;
        const ease = 0.05;
        let invert = 1;
        let mouse = { x: -1000, y: -1000 };
        let dots = [];

        class Dot {
            constructor(originX, originY) {
                this.originX = originX;
                this.originY = originY;
                this.x = originX;
                this.y = originY;
                this.radius = baseRadius;
                this.alpha = baseAlpha;
                this.color = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)';
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = this.originX;
                let targetY = this.originY;
                let targetRadius = baseRadius;
                let targetAlpha = baseAlpha;

                this.color = theme === 'dark'
                    ? `rgba(255, 255, 255, ${this.alpha})`
                    : `rgba(15, 20, 40, ${this.alpha})`;

                if (dist < maxDistance) {
                    const factor = 1 - dist / maxDistance;
                    const repel = maxRepulsion * factor;
                    const angle = Math.atan2(dy, dx);

                    targetX -= Math.cos(angle) * repel * invert;
                    targetY -= Math.sin(angle) * repel * invert;
                    targetRadius += (maxRadius - baseRadius) * factor;
                    targetAlpha += maxAlpha * factor;
                    this.color = `rgba(82, 184, 255, ${this.alpha})`;
                }

                this.x += (targetX - this.x) * ease;
                this.y += (targetY - this.y) * ease;
                this.radius += (targetRadius - this.radius) * ease;
                this.alpha += (targetAlpha - this.alpha) * ease;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initDots() {
            dots = [];
            for (let x = gap / 2; x < width; x += gap) {
                for (let y = gap / 2; y < height; y += gap) {
                    dots.push(new Dot(x, y));
                }
            }
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initDots();
        }

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleMouseDown = () => {
            invert *= -1;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < dots.length; i += 1) {
                dots[i].update();
                dots[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousedown', handleMouseDown);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousedown', handleMouseDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
            }}
        />
    );
}
