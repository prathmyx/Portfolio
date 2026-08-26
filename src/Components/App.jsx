import DotMatrix from './dotMatrix';
import Header from './Header';
import Nav from './Nav';
import { ThemeProvider } from './ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <DotMatrix/>
            <Nav />
            <Header />
        </ThemeProvider>
    );
}