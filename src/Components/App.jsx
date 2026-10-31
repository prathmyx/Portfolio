import DotMatrix from './DotMatrix';
import Header from './Header';
import Nav from './Nav';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Journey from './Journey';
import Contact from './Contact';
import Footer from './Footer';
import { ThemeProvider } from './ThemeContext';
import { useRef } from 'react';

export default function App() {
    const navNameRef = useRef(null);

    return (
        <ThemeProvider>
            <DotMatrix />
            <Nav navNameRef={navNameRef} />
            <Header navNameRef={navNameRef} />

            <main className="page-shell">
                <About />
                <Skills />
                <Projects />
                <Journey />
                <Contact />
            </main>

            <Footer />
        </ThemeProvider>
    );
}
