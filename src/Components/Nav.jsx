import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { ThemeToggleIcon } from "./ThemeToggle";

export default function Nav() {
    const { theme, toggleTheme } = useTheme();
    const { scrollY } = useScroll();

    const navOpacity = useTransform(scrollY, [0, 400], [0, 1]);
    const nameOpacity = useTransform(scrollY, [350, 400], [0, 1]);
    const navY = useTransform(scrollY, [0, 400], [-20, 0]);

    const isDark = theme === "dark";

    return (
        <>
            <motion.nav
                style={{
                    position: "fixed",
                    top: "20px",
                    left: "50%",
                    x: "-50%",
                    opacity: navOpacity,
                    y: navY,

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",

                    padding: "12px 24px",
                    borderRadius: "999px",

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
                    transition: "all 0.3s ease",
                    zIndex: 1,
                }}
            >
                <motion.span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: '"Borel", cursive', 
                    lineHeight: 1,
                    transform: "translateY(6px)", 
                    fontWeight: 600,
                    opacity: nameOpacity,
                }}>Pratham Yadav</motion.span>
                <span style={{ cursor: "pointer" }}>About</span>
                <span style={{ cursor: "pointer" }}>Skills</span>
                <span style={{ cursor: "pointer" }}>Projects</span>
                <span style={{ cursor: "pointer" }}>Contact</span>

                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    style={{
                        width: "36px",
                        height: "36px",
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
                    }}
                >
                    <ThemeToggleIcon isDark={isDark} />
                </button>
            </motion.nav>
        </>
    );
}