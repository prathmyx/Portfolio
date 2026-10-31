import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const navOpacity = useTransform(scrollY, [0, 400], [0, 1]);
    const nameOpacity = useTransform(scrollY, [350, 400], [0, 1]);
    const navY = useTransform(scrollY, [0, 400], [-20, 0]);
    const navVisibility = useTransform(scrollY, [0, 399, 400], ['hidden', 'hidden', 'visible']);
    const isDark = theme === 'dark';

    const scrollToSection = (href) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <motion.nav
            aria-label="Main navigation"
            style={{
                position: 'fixed',
                top: '16px',
                left: '50%',
                x: '-50%',
                width: isMobile ? '92vw' : 'auto',
                maxWidth: '680px',
                opacity: navOpacity,
                y: navY,
                visibility: navVisibility,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '0.6rem' : '1.25rem',
                padding: isMobile ? '10px 16px' : '12px 22px',
                borderRadius: '999px',
                fontSize: isMobile ? '0.85rem' : '1rem',
                color: isDark ? '#ffffff' : '#0f172a',
                background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: isDark ? '0 8px 32px rgba(255, 255, 255, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
                whiteSpace: 'nowrap',
                overflowX: 'auto',
                transition: 'all 0.3s ease',
                zIndex: 20,
            }}
        >
            <motion.span
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: '"Borel", cursive',
                    lineHeight: 1,
                    transform: 'translateY(6px)',
                    fontWeight: 500,
                    opacity: nameOpacity,
                    fontSize: isMobile ? '0.95rem' : '1.2rem',
                    flexShrink: 0,
                }}
            >
                Pratham Yadav
            </motion.span>

            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
                {navItems.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        className="nav-link"
                        onClick={(event) => {
                            event.preventDefault();
                            scrollToSection(href);
                        }}
                        style={{
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            padding: isMobile ? '0.2rem 0.5rem' : '0.35rem 0.65rem',
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
                        width: isMobile ? '30px' : '36px',
                        height: isMobile ? '30px' : '36px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isDark ? '#7dd3fc' : '#facc15',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.15)',
                        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                    }}
                >
                    <ThemeToggleIcon isDark={isDark} />
                </button>
            </div>
        </motion.nav>
    );
}
