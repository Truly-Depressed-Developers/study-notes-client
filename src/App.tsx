import './App.scss';

import { ThemeProvider, createTheme } from '@mui/material';
import { Routes } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Notes } from './pages/Notes/Notes';
import { Registration } from './pages/Registration/Registration';
import { Login } from './pages/Login/Login';
import { NoteSingular } from './pages/NoteSingular/NoteSingular';
import { useState } from 'react';
import { PointDisplay } from './components/PointDisplay/PointDisplay';
import { Exercises } from './pages/Exercises/Exercises';
import { ExerciseSingular } from './pages/ExerciseSingular/ExerciseSingular';
import { AddNote } from './pages/AddNote/AddNote';
import { PROPERTY_TYPES } from '@babel/types';
import StarCircle from './components/PointDisplay/StarCircle';

function Inside() {
    const [userId, setUserId] = useState(-1);
    const [username, setUsername] = useState("");

    return (
        <div className="App">
            <nav id="navigation">
                <div id="logo"></div>
                <div id="menu-items">
                    <Link to="/">Home</Link>
                    <Link to="/notes">Notes</Link>
                    <Link to="/exercises">Exercises</Link>
                </div>
                <div id="user-stuff">
                    {userId === -1 ?
                        <div className="registration">
                            <Link to="/login">Login</Link>
                            <Link to="/registration">Register</Link>
                        </div>
                        :
                        <div className='logged-info'>
                            <StarCircle />
                            <span>2137</span>
                            <span>{username}</span>
                        </div>
                    }
                </div>
            </nav>
            <div id="routes">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/notes' element={<Notes />} />
                    <Route path='/exercises' element={<Exercises />} />
                    <Route path='/exercises/:id' element={<ExerciseSingular />} />
                    <Route path='/notes/:id' element={<NoteSingular />} />
                    <Route path='/addNote' element={<AddNote userId={userId} />} />
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/login' element={<Login onLogin={(userId, username) => { setUserId(userId); setUsername(username) }} />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )
}

const theme = createTheme();

// Providers
function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Inside />
            </BrowserRouter>
        </ThemeProvider >
    );
}

export default App;
