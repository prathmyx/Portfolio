import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { ThemeToggleIcon } from "./ThemeToggle";

export default function Nav({ navNameRef }) {
    const { theme, toggleTheme } = useTheme();
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const navOpacity = useTransform(scrollY, [0, 400], [0, 1]);
    const nameOpacity = useTransform(scrollY, [350, 400], [0, 1]);
    const navY = useTransform(scrollY, [0, 400], [-20, 0]);

    const isDark = theme === "dark";

    return (
        <motion.nav
            style={{
                position: "fixed",
                top: "16px",
                left: "50%",
                x: "-50%",
                width: isMobile ? "90vw" : "auto",
                maxWidth: "600px",
                opacity: navOpacity,
                y: navY,

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: isMobile ? "0.75rem" : "1.75rem",

                padding: isMobile ? "10px 16px" : "12px 24px",
                borderRadius: "999px",
                fontSize: isMobile ? "0.85rem" : "1rem",

                color: isDark ? "#ffffff" : "#0f172a",
                background: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(255, 255, 255, 0.75)",
                border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.15)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: isDark
                    ? "0 8px 32px rgba(255, 255, 255, 0.08)"
                    : "0 8px 32px rgba(0, 0, 0, 0.08)",

                whiteSpace: "nowrap",
                overflowX: "auto",
                transition: "all 0.3s ease",
                zIndex: 10,
            }}
        >
            <motion.span
                ref={navNameRef}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: '"Borel", cursive',
                    lineHeight: 1,
                    transform: "translateY(6px)",
                    fontWeight: 500,
                    opacity: nameOpacity,
                    fontSize: isMobile ? "0.95rem" : "1.2rem",
                }}
            >
                Pratham Yadav
            </motion.span>

            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.75rem" : "1.5rem" }}>
                {!isMobile ? <span style={{ cursor: "pointer" }}>About</span> : ""}
                <span style={{ cursor: "pointer" }}>Skills</span>
                <span style={{ cursor: "pointer" }}>Projects</span>
                <span style={{ cursor: "pointer" }}>Contact</span>

                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    style={{
                        width: isMobile ? "30px" : "36px",
                        height: isMobile ? "30px" : "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isDark ? "rgb(25, 190, 260)" : "#facc15",
                        border: isDark
                            ? "1px solid rgba(255, 255, 255, 0.2)"
                            : "1px solid rgba(0, 0, 0, 0.15)",
                        background: isDark
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.05)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                    }}
                >
                    <ThemeToggleIcon isDark={isDark} />
                </button>
            </div>
        </motion.nav>
    );
}