import DotMatrix from './dotMatrix';
import Header from './Header';
import Nav from './Nav';
import { ThemeProvider } from './ThemeContext';
import {useRef} from 'react';

export default function App() {
    const navNameRef = useRef(null);

    return (
        <ThemeProvider>
            <DotMatrix/>
            <Nav navNameRef={navNameRef}/>
            <Header navNameRef={navNameRef}/>
        </ThemeProvider>
    );
}