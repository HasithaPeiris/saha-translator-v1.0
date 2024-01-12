import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import logo from '../images/logo.png'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white bg-opacity-5 text-black shadow-lg hidden md:block">
                <div className="container mx-auto flex items-center h-24">
                    <a href="/" class="flex items-center justify-center ml-5">
                        <img className="h-32" src={logo} alt="" />
                        {/* <span className="ml-4 uppercase font-black">SAHA<br/>Translator</span> */}
                    </a>
                    <nav className="contents font-semibold text-base lg:text-lg">
                        <ul className="mx-auto flex items-center">
                            <li className="p-5 xl:p-8 active">
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="p-5 xl:p-8">
                                <Link to="/translator">
                                    <span>Translator</span>
                                </Link>
                            </li>
                            <li className="p-5 xl:p-8">
                                <Link to="/dictionary">
                                    <span>Dictionary</span>
                                </Link>
                            </li>
                            <li className="p-5 xl:p-8">
                                <Link to="/grammerCheck">
                                    <span>Grammer Checker</span>
                                </Link>
                            </li>
                            <li className="p-5 xl:p-8">
                                <Link to="/contactUs">
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                            <li className="p-5 xl:p-8">
                                <Link to="/aboutUs">
                                    <span>About Us</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* <button className="border border-white rounded-full font-bold px-8 py-2">Login</button> */}
                    {/* <a href="#_" class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 mr-5 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
                    Log In</a> */}
                </div>
            </header>

            <div className="flex-grow">
                <Outlet />
            </div>

            <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">©2023 SLIIT SPM Project. 
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link to="/" class="mr-4 hover:underline md:mr-6 ">
                                    <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/aboutUs" class="mr-4 hover:underline md:mr-6 ">
                                    <span>About</span>
                            </Link>
                        </li>
                        <li>
                        <Link to="/contactUs" class="mr-4 hover:underline md:mr-6 ">
                                    <span>Contact Us</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}
