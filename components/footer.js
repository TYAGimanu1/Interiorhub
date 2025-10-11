import React from 'react'
import Link from 'next/link';   
import styles from '@/styles/page.module.css';
const footer = () => {
  return (
    <div>
     
    <footer className={styles.footer}>
        <div className={styles.footerGrid}>
            <div>
                <h4 className={styles.footerTitle}>NAV</h4>
                <ul className={styles.footerList}>
                    <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                    <li><Link href="/work" className={styles.footerLink}>Work</Link></li>
                    <li><Link href="/testimonials" className={styles.footerLink}>Testimonials</Link></li>
                    <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
                </ul>
            </div>
            
            <div>
                <h4 className={styles.footerTitle}>Contact</h4>
                <div className={styles.footerList}>
                    <p>For Clients & Media: <br/> **+91 21300 10617**</p>
                    <p>For Vendors: <br/> **+91 22 25002411**</p>
                </div>
            </div>
            
            <div>
                <h4 className={styles.footerTitle}>Careers</h4>
                <p className={styles.footerList}>reach@theashleys.co.in</p>
            </div>
            
            <div>
                <h4 className={styles.footerTitle}>Follow Us</h4>
                <div className={styles.socialIcons}>
                    <div className={styles.socialIcon}></div>
                    <div className={styles.socialIcon}></div>
                    <div className={styles.socialIcon}></div>
                </div>
            </div>
        </div>
        
        <div className={styles.copyright}>
            Copyright © 2025 Ashleys
        </div>
  </footer>
    </div>
  )
}

export default footer
