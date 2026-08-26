import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
    const { scrollY } = useScroll();

    const greetingOpacity = useTransform(scrollY, [0, 250], [1, 0]);

    const nameScale = useTransform(scrollY, [0, 400], [1, 0.25]);

    // const nameLeft = useTransform(scrollY, [0, 400], ["50%", "20px"]);
    // const nameTop = useTransform(scrollY, [0, 400], ["50%", "20px"]);

    const nameX = useTransform(scrollY, [0, 400], ["0", "-40vw"]);
    const nameY = useTransform(scrollY, [0, 400], ["0", "-45vh"]);

    const name = "Pratham Yadav";

    return (
        <motion.div id="head-container" style={styles.container}
            initial={{
                y: 60,
            }}
            animate={{
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
            }}>
                
            <motion.div
                style={{
                    ...styles.hero,
                    scale: nameScale,
                    x: nameX,
                    y: nameY,
                }}
                initial={{
                    opacity: 0,
                    filter: "blur(10px)",
                }}
                animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                }}
                transition={{
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                }}>

                <motion.span
                    style={{
                        ...styles.greeting,
                        opacity: greetingOpacity,
                    }}>
                    Hi, I'm
                </motion.span>



                <motion.h1 style={styles.name}>
                    {name.split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            style={styles.letter}
                            initial={{
                                opacity: 0,
                                x: -30,
                                filter: "blur(8px)",
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>
            </motion.div>
        </motion.div>
    );
}

const styles = {
    container: {
        position: "fixed",
        inset: 0,
        zIndex: -1,
    },

    hero: {
        position: 'absolute',
        willChange: "transform",
        top: '50%',
        left: '50%',
        translate: '-50% -50%',
        whiteSpace: 'nowrap',
    },

    greeting: {
        display: "block",
        fontSize: "clamp(2rem, 5vw, 4rem)",
        fontFamily: '"Poppins", sans-serif',
        paddingLeft: '2%',
        fontWeight: 600,
        color: "#afafaf",
        letterSpacing: "0",
        marginBottom: "0.5rem",
    },

    name: {
        fontSize: "clamp(4rem, 12vw, 7rem)",
        lineHeight: 1.5,
        fontFamily: '"Borel", cursive',
        fontWeight: 400,
        letterSpacing: "-0.08em",
        pointerEvents: 'none',
    },
};