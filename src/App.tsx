import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.scss';

function Inside() {
    return (
        <div className="App">
            <Button
                variant="contained"
            >
                Text
            </Button>
        </div>
    )
}

const theme = createTheme();

// Providers
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Inside />
        </ThemeProvider >
    );
}

export default App;
