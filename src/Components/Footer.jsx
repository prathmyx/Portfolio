import { motion } from 'framer-motion';

const contactLinks = [
    { label: 'GitHub', href: 'https://github.com/prathmyx' },
];

export default function Contact() {
    return (
        <motion.section
            id="contact"
            className="section section-shell"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="contact-panel glass-panel">
                <span className="eyebrow">Contact</span>
                <h2>Let’s build something meaningful together</h2>
                <p>
                    I’m always open to learning, collaboration, and opportunities to create
                    thoughtful software and experiences. If you’d like to connect, feel free
                    to reach out through the links below.
                </p>

                <div className="contact-links">
                    {contactLinks.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="contact-link">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="contact-meta">
                    <span>
                        <strong>Email:</strong> Available on request
                    </span>
                </div>
            </div>
        </motion.section>
    );
}
