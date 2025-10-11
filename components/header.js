import React from 'react'
import Link from 'next/link';
// Import the CSS Module
import styles from '@/styles/page.module.css'; 
const header = () => {
  return (

       <div>
       <header className={styles.header} aria-label="Main Navigation">
    <div className={styles.headerContent}>
      <div className={styles.logo} aria-label="Ashleys Logo">
        ASHLEYS
      </div>
      <nav className={styles.nav} aria-label="Primary Navigation">
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/work" className={styles.navLink}>Work</Link>
        <Link href="/testimonials" className={styles.navLink}>Testimonials</Link>
        <Link href="/blog" className={styles.navLink}>News & Blog</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
      </nav>
      
    </div>
  </header>
    
    </div>
  )
}

export default header
