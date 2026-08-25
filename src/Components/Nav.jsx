import { motion, useScroll, useTransform } from "framer-motion";

export default function Nav() {
    const { scrollY } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 400], [0, 1]);
    const navY = useTransform(scrollY, [0, 400], [-20, 0]);

    return (<>
        <motion.nav
            style={{
                position: "fixed",
                top: "20px",
                left: "50%",
                x: "-50%",
                opacity: navOpacity,
                y: navY,

                display: "flex",
                alignItems: "center",
                gap: "2rem",

                padding: "12px 24px",
                borderRadius: "999px",

                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",

                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",

                color: "#fff",
                zIndex: 100,

                whiteSpace: "nowrap",
            }}
        >
            <span>Pratham Yadav</span>
            <span>About</span>
            <span>Skills</span>
            <span>Projects</span>
            <span>Contact</span>

            <button style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    cursor: "pointer",
                }}>
                ☼
            </button>
        </motion.nav>
    </>)
}