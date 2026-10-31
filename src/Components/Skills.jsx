import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

const fadeInUp = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Skills() {
    return (
        <motion.section
            id="skills"
            className="section section-shell"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            variants={fadeInUp}
        >
            <div className="section-heading">
                <span className="eyebrow">Skills</span>
                <h2>Tools, languages and ideas I keep exploring</h2>
            </div>

            <div className="skills-grid">
                {skillsData.map((group, index) => (
                    <motion.div
                        key={group.title}
                        className="skill-group glass-panel"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                        <h3>{group.title}</h3>
                        <div className="skill-badges">
                            {group.items.map((skill) => (
                                <span key={skill} className="skill-badge">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
