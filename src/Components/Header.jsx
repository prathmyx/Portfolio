import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Header() {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 600);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Keep the original scroll choreography: the centered hero name shrinks
    // and travels toward the navbar as the user scrolls through the intro.
    const nameOpacity = useTransform(scrollY, [0, 520], [1, 0]);
    const nameScale = useTransform(scrollY, [0, 520], [1, 0.08]);
    const nameX = useTransform(scrollY, [0, 520], ['0', isMobile ? '0vw' : '-14vw']);
    const nameY = useTransform(scrollY, [0, 520], ['0', '-45vh']);

    return (
        <motion.div
            id="head-container"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
            }}
            initial={{ y: 60 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    willChange: 'transform',
                    top: '50%',
                    left: '50%',
                    translate: '-50% -50%',
                    whiteSpace: 'nowrap',
                    scale: nameScale,
                    x: nameX,
                    y: nameY,
                }}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.h1
                    style={{
                        className: 'hero-title',
                        margin: 0,
                        fontSize: 'clamp(4rem, 12vw, 7rem)',
                        lineHeight: 1.5,
                        fontFamily: '"Borel", cursive',
                        fontWeight: 400,
                        letterSpacing: '-0.08em',
                        pointerEvents: 'none',
                        opacity: nameOpacity,
                    }}
                >
                    {Array.from('Pratham Yadav').map((letter, index) => (
                        <motion.span
                            key={`${letter}-${index}`}
                            style={{ display: 'inline-block' }}
                            initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>
            </motion.div>
        </motion.div>
    );
}
