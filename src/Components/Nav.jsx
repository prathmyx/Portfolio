import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { ThemeToggleIcon } from './ThemeToggle';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const { theme, toggleTheme } = useTheme();
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    // Use a discrete visibility state; opacity alone leaves an invisible navbar
    // sitting over the hero and can make it receive pointer/keyboard interaction.
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsNavVisible(latest >= 260);
    });

    const navOpacity = useTransform(scrollY, [260, 520], [0, 1]);
    const navY = useTransform(scrollY, [260, 520], [-18, 0]);
    const nameOpacity = useTransform(scrollY, [400, 520], [0, 1]);
    const isDark = theme === 'dark';

    return (
        <motion.nav
            aria-label="Main navigation"
            aria-hidden={!isNavVisible}
            style={{
                position: 'fixed',
                top: '16px',
                left: '50%',
                x: '-50%',
                width: isMobile ? 'calc(100vw - 20px)' : 'auto',
                maxWidth: '760px',
                opacity: navOpacity,
                y: navY,
                visibility: isNavVisible ? 'visible' : 'hidden',
                pointerEvents: isNavVisible ? 'auto' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '0.25rem' : '1.25rem',
                padding: isMobile ? '8px 9px' : '12px 22px',
                borderRadius: '999px',
                fontSize: isMobile ? '0.68rem' : '1rem',
                color: isDark ? '#ffffff' : '#0f172a',
                background: isDark ? 'rgba(15, 15, 20, 0.82)' : 'rgba(255, 255, 255, 0.88)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(14px)',
                boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.28)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
                zIndex: 20,
            }}
        >
            <motion.span
                style={{
                    display: isMobile ? 'none' : 'inline-flex',
                    alignItems: 'center',
                    fontFamily: '"Borel", cursive',
                    lineHeight: 1,
                    transform: 'translateY(6px)',
                    fontWeight: 500,
                    opacity: nameOpacity,
                    fontSize: isMobile ? '0.88rem' : '1.2rem',
                    flexShrink: 0,
                }}
            >
                Pratham Yadav
            </motion.span>

            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.12rem' : '0.85rem' }}>
                {navItems.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="nav-link"
                        style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            padding: isMobile ? '0.25rem 0.28rem' : '0.35rem 0.55rem',
                        }}
                    >
                        {label}
                    </a>
                ))}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    type="button"
                    style={{
                        width: isMobile ? '27px' : '36px',
                        height: isMobile ? '27px' : '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDark ? '#7dd3fc' : '#facc15',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    <ThemeToggleIcon isDark={isDark} />
                </button>
            </div>
        </motion.nav>
    );
}
