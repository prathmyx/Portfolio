import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const fadeInUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Projects() {
    return (
        <motion.section
            id="projects"
            className="section section-shell"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            variants={fadeInUp}
        >
            <div className="section-heading">
                <span className="eyebrow">Projects</span>
                <h2>Featured work</h2>
            </div>

            <div className="project-grid">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.name}
                        className="project-card glass-panel"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                        whileHover={{ y: -8, scale: 1.01 }}
                    >
                        <div className="project-preview" style={{ background: project.preview }}>
                            <div className="project-preview-inner" />
                        </div>

                        <div className="project-body">
                            <div className="project-meta">
                                <span>{project.label}</span>
                            </div>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>

                            <div className="skill-badges project-tags">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="skill-badge small-badge">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="project-links">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="project-link"
                                >
                                    GitHub
                                </a>

                                {project.demo ? (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-link project-link-secondary"
                                    >
                                        Live Demo
                                    </a>
                                ) : (
                                    <span className="project-link project-link-secondary disabled-link">
                                        Demo unavailable
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
