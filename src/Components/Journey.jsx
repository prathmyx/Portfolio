import { motion } from 'framer-motion';

const journeySteps = [
    {
        title: 'Learning by building',
        summary:
            'I started exploring programming with a practical mindset — learning through small projects, experiments, and real problems instead of only reading theory.',
    },
    {
        title: 'Exploring core concepts',
        summary:
            'My focus has grown toward understanding how systems work internally, from frontend interfaces to algorithms, data handling, and the logic behind applications.',
    },
    {
        title: 'Current direction',
        summary:
            'I am building projects around web development, Python, machine learning, and software problem solving while improving my ability to design and implement resilient solutions.',
    },
];

export default function Journey() {
    return (
        <motion.section
            id="journey"
            className="section section-shell"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="section-heading">
                <span className="eyebrow">My Journey</span>
                <h2>How my learning path is shaping my work</h2>
            </div>

            <div className="timeline">
                <div className="timeline-line" />
                {journeySteps.map((step, index) => (
                    <motion.div
                        key={step.title}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -18 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-content glass-panel">
                            <span className="timeline-tag">Stage {index + 1}</span>
                            <h3>{step.title}</h3>
                            <p>{step.summary}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
