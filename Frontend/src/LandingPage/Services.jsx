import React from 'react';
import styles from './Services.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';

const Services = () => {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]); // Adjust opacity based on scroll

    return (
        <motion.div
            style={{ opacity }} // Apply the dynamic opacity
            className={styles.background}
        >
            <div className={styles.heading}>
                <h1>Our Services</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h2>01</h2>
                    <h3>Buying</h3>
                    <p>Discover your perfect home with ease. Our expert team guides you through every step of the buying process, ensuring you find a property that matches your needs and budget.</p>
                </div>
                <div className={styles.box}>
                    <h2>02</h2>
                    <h3>Selling</h3>
                    <p>Sell your property for the best price with our dedicated services. We handle everything from marketing to negotiations, making the selling process smooth and profitable.</p>
                </div>
                <div className={styles.box}>
                    <h2>03</h2>
                    <h3>Renting</h3>
                    <p>Find the ideal rental property or tenants with our comprehensive renting services. We connect landlords with reliable tenants and help renters find the perfect place to call home.</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Services;
