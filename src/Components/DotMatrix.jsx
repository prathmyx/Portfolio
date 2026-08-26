import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

export default function DotMatrix() {
    const canvasRef = useRef(null);

    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width,
            height,
            gap = 20,
            baseRadius = 1.5,
            maxRadius = 2,
            baseAlpha = 0.2,
            maxAlpha = 0.8,
            maxDistance = 100,
            maxRepulsion = 20,
            ease = 0.05,
            invert = 1;

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
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = this.originX;
                let targetY = this.originY;
                let targetRadius = baseRadius;
                let targetAlpha = baseAlpha;

                this.color =
                    theme === 'dark'
                        ? `rgba(255, 255, 255, ${this.alpha})`
                        : `rgba(15, 20, 40, ${this.alpha})`;

                if (dist < maxDistance) {
                    let factor = 1 - dist / maxDistance;

                    let repel = maxRepulsion * factor,
                        angle = Math.atan2(dy, dx);
                    targetX -= Math.cos(angle) * repel * invert;
                    targetY -= Math.sin(angle) * repel * invert;

                    targetRadius += (maxRadius - baseRadius) * factor;
                    targetAlpha += maxAlpha * factor;

                    this.color = `rgba(55, 190, 260, ${this.alpha})`;
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

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleMouseDown = () => {
            invert *= -1;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousedown', handleMouseDown);

        resize();

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < dots.length; i++) {
                dots[i].update();
                dots[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        }

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