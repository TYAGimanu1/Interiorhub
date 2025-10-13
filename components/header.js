import React, { useState } from 'react';
import Link from 'next/link';
// Import the CSS Module
import { useRouter } from 'next/router';
import styles from '@/styles/page.module.css'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const router = useRouter();
const closeMenu = () => {
    setIsMenuOpen(false);
    console.log('Menu closed automatically.'); 
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  // Refresh the page to ensure styles are applied
    console.log('Menu open state:', !isMenuOpen); // Debugging log
  };

  return (

       <div>
       <header className={styles.header} aria-label="Main Navigation">
    <div className={styles.headerContent}>
      <div className={styles.logo} aria-label="Ashleys Logo">
        ASHLEYS
      </div>
      <button
          className={styles.menuToggle}
          aria-label="Toggle Navigation Menu"
          onClick={toggleMenu}
        >
          ☰
        </button>
      <nav
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Primary Navigation"
        >
        {console.log('Nav class:', `${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`)} {/* Debugging log */}
        <Link onClick={closeMenu} href="/" className={styles.navLink}>Home</Link>
        <Link onClick={closeMenu} href="/work" className={styles.navLink}>Work</Link>
        <Link onClick={closeMenu} href="/testimonials" className={styles.navLink}>Testimonials</Link>
        <Link onClick={closeMenu} href="/blog" className={styles.navLink}>News & Blog</Link>
        <Link onClick={closeMenu} href="/contact" className={styles.navLink}>Contact</Link>
      </nav>
      
    </div>
  </header>
    
    </div>
  )
}

export default Header
