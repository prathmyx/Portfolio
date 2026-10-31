import { motion } from 'framer-motion';

const interests = [
    'Software development',
    'Web development',
    'Python programming',
    'Machine learning and AI',
    'Problem solving',
    'Understanding how things work internally',
];

const quickFacts = [
    { value: 'Build-first', label: 'learning style' },
    { value: 'Explore', label: 'new tools and ideas' },
    { value: 'Solve', label: 'real problems' },
    { value: 'Create', label: 'projects that teach' },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function About() {
    return (
        <motion.section
            id="about"
            className="section section-shell"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            variants={fadeInUp}
        >
            <div className="section-heading">
                <span className="eyebrow">About</span>
                <h2>I&apos;m Pratham Yadav</h2>
            </div>

            <div className="about-grid">
                <div className="about-copy">
                    <p>
                        I&apos;m a student and aspiring developer who enjoys exploring technology,
                        programming, and building things. I like taking ideas from concept to working
                        solutions and learning through the process of creating.
                    </p>
                    <p>
                        I enjoy learning by building projects rather than simply following tutorials.
                        That habit has shaped the way I approach software, web development, and problem
                        solving with curiosity, iteration, and a strong interest in the internals behind
                        the tools we use every day.
                    </p>
                </div>

                <div className="about-panel glass-panel">
                    <h3>Interests</h3>
                    <ul className="interest-list">
                        {interests.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="facts-grid">
                {quickFacts.map(({ value, label }) => (
                    <div key={label} className="fact-card glass-panel">
                        <strong>{value}</strong>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
