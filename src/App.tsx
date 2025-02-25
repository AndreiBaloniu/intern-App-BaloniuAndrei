import { NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Users from 'pages/users';
import logo from './assets/images/logo.webp';
import './App.scss';

const Layout = () => (
  <div className="layout-container">
    <header className="header">
      <img alt="Company Logo" className="logo" src={logo} />
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'navButton navButtonActive' : 'navButton'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/users" 
              className={({ isActive }) => isActive ? 'navButton navButtonActive' : 'navButton'}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <Outlet />
  </div>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route element={<Home />} path="/" />
      <Route element={<Users />} path="/users" />
    </Route>
  </Routes>
);

export default App;
