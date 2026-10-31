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

export default function App() {
    return (
        <ThemeProvider>
            <DotMatrix />
            <Header />
            <Nav />

            {/* Reserve the first viewport for the centered hero name. */}
            <div className="hero-spacer" aria-hidden="true" />

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
