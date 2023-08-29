import React from 'react';
import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css"
function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    console.log("user", user);
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
        <div>
            <nav className="header bg-gray-200 flex justify-between items-center px-8 py-4">
    <div className="logo text-2xl font-custom font-semibold text-white">
        <NavLink to="/">Todo App</NavLink>
    </div>
    <div className="flex items-center">
        {token ? (
            <div className="flex items-center space-x-4">
                <p className="mixed-color font-custom font-sans font-bold">Welcome, <span className="font-bold">{user.name}</span></p>
                <button
                    onClick={logout}
                    className="px-4 py-2 text-white bg-blue-400 rounded hover:bg-blue-500"
                >
                    Logout
                </button>
            </div>
        ) : (
            <ul className="flex space-x-4">
                <li>
                    <NavLink
                        to="/login"
                        className="text-gray"
                    >
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/register"
                        className=" px-4 py-2 text-gray"
                    >
                        Register
                    </NavLink>
                </li>
            </ul>
        )}
    </div>
</nav>

            <Outlet />
        </div>
    );
}

export default Header;