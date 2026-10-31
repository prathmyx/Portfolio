import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="site-footer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <span>Pratham Yadav</span>
            <span>© {currentYear}</span>
            <a href="https://github.com/prathmyx" target="_blank" rel="noreferrer">
                GitHub
            </a>
            <span>Building, learning, and iterating.</span>
        </motion.footer>
    );
}
