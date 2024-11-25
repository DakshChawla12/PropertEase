import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
    const token = localStorage.getItem('token'); // Check for token in localStorage
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

    // Check if current path is /buy, /details/*, /myListings, or /favourites
    const isDetailsPage = location.pathname.startsWith('/details/');
    const backgroundClass =
        location.pathname === '/buy' ||
        location.pathname === '/myListings' ||
        location.pathname === '/myFavorites' ||
        isDetailsPage
            ? styles.bgBlue
            : '';

    return (
        <div className={`${styles.navbar} ${backgroundClass}`}>
            {/* Container for image and list */}
            <div className={styles.container}>
                {/* Image container */}
                <div className={styles.logo_container}>
                    <div className={styles.logo} onClick={() => navigate('/')}>
                        {/* <img src='/logo.png' onClick={() => navigate('/')}></img> */}
                        <p>PropertEase</p>
                    </div>
                </div>

                {/* List container */}
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to='/buy' className={styles.navLink}>Buy</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to='/sell' className={styles.navLink}>Sell</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to='/' className={styles.navLink}>Calculate Mortgage</Link>
                    </li>
                </ul>
            </div>

            {/* Second inner div with Profile/Log In button */}
            <div className={styles.rightContainer}>
                {token ? (
                    <>
                        <span className={styles.aboutUs} onClick={() => navigate('/profile')}>Hi, {localStorage.getItem('loggedInUser')}</span>
                    </>
                ) : (
                    <button type="button" className={styles.LogOutBtn} onClick={() => navigate('/login')}>
                        Log In
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
