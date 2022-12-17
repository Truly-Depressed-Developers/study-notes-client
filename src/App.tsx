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

function Inside() {
	return (
		<div className="App">
			<nav id="navigation">
				<div id="logo">logo</div>
				<div id="menu-items">
					<Link to="/">Home</Link>
					<Link to="/notes">Notes</Link>
					<Link to="/random">Random</Link>
				</div>
				<div id="user-stuff">
					<Link to="/login">Login</Link>
					<Link to="/registration">Registration</Link>
				</div>
			</nav>
			<div id="routes">
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/notes/:id' element={<NoteSingular />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
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
