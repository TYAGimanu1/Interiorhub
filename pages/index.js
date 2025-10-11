// app/page.js
import React from 'react';
import Link from 'next/link';
// Import the CSS Module
import styles from './page.module.css'; 

// NOTE: In a real Next.js application, you would use 'next/image' for images 
// and handle video optimization.

const Navigation = () => (
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
);

const HeroSection = () => (
  <div className={styles.heroSection}>
    {/* Video Element (Placeholder for video optimization) */}
    <img className={styles.heroImage} src="https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=612x612&w=0&k=20&c=sigz2x-O26RYwC49hKqozEJxrFX4CR9zqiTCTSXx9e4=" alt="Luxury Interior Design"/>
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>
        Luxury Interior Designers In Mumbai
      </h1>
      <p className={styles.heroSubtitle}>ASHLEYS</p>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
    <h2 className={styles.sectionTitle}>
      {children}
    </h2>
)

const AboutSection = () => (
  <section className={`${styles.section} ${styles.aboutSection}`}>
    <SectionTitle>About Ashleys</SectionTitle>
    <div className={styles.aboutGrid}>
      <div className={styles.aboutText}>
        <p>Ashleys is a boutique firm set up by Pooja and Arbaysis Ashley, brilliant young professional luxury interior designers in Mumbai. Established in 2008, this architecture and interior design firm has been on a soaring trajectory ever since.</p>
        <p>Trained in Milan and India, Ashleys bring an international finesse and professionalism to their work. Their keen sense of detailing and strong design statements create a sense of exclusivity and surprise with every project.</p>
        <p>As interior designers in Mumbai, Ashleys have designed clubhouses, show flats, premium residences, luxury bungalows, retail spaces, and corporate offices.</p>
        <p className={styles.aboutQuote}>
          Ashleys&apos; signature style is minimalist sophistication, using statement accents to add dramatic flair and a strong individuality to each project.
        </p>
      </div>
      <div className="flex flex-col justify-between">
        
        <h1>Founder</h1>
        <div className={styles.founders}>
        
          <div className={styles.founder}>
            <div className={styles.founderImage}>
              <img className={styles.founderImage} src="https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=612x612&w=0&k=20&c=sigz2x-O26RYwC49hKqozEJxrFX4CR9zqiTCTSXx9e4=" alt="Luxury Interior Design"/>
              </div> {/* Image Placeholder */}
            <p className={styles.founderName}>Alankar Tyagi</p>
          </div>
          <div className={styles.founder}>
            <div className={styles.founderImage}>
              <img className={styles.founderImage} src="https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=612x612&w=0&k=20&c=sigz2x-O26RYwC49hKqozEJxrFX4CR9zqiTCTSXx9e4=" alt="Luxury Interior Design"/></div> {/* Image Placeholder */}
            <p className={styles.founderName}>Alankar Tyagi</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const categories = [
    { name: 'Residences', count: 12 },
    { name: 'Offices', count: 6 },
    { name: 'Clubhouses & Showflats', count: 4 },
    { name: 'Architecture', count: 3 },
     { name: 'Architecture', count: 8 },
  ];

  return (
    <section className={`${styles.section} ${styles.projectsSection}`}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle>Selected Projects</SectionTitle>
        <div className={styles.projectGrid}>
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href="/work" 
              className={styles.projectCard}
            >
              <div className={styles.projectOverlay}></div>
              
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>
                  {cat.name}
                </h3>
                <p className={styles.projectCount}>{cat.count} Projects</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFormSection = () => (
  <section className={styles.section} aria-labelledby="contact-form-title">
    <div className={styles.contactFormSection}>
      <SectionTitle id="contact-form-title">Design With Us</SectionTitle>
      <p className={styles.formDescription}>
        We&apos;re keen to start working with you. Please fill in your details so we can get back to you.
      </p>
      <form className={styles.form} aria-label="Contact Form">
        <div className={styles.formGroup}>
          <input type="text" placeholder="First Name *" className={styles.input} required aria-required="true" aria-label="First Name" />
          <input type="text" placeholder="Last Name *" className={styles.input} required aria-required="true" aria-label="Last Name" />
        </div>
        <input type="email" placeholder="Email *" className={styles.input} required aria-required="true" aria-label="Email Address" />
        <input type="tel" placeholder="Phone *" className={styles.input} required aria-required="true" aria-label="Phone Number" />
        <select className={styles.select} aria-label="Category">
          <option value="">Select Category (e.g., Residence, Office)</option>
          <option value="residence">Residence</option>
          <option value="office">Office</option>
          <option value="clubhouse">Clubhouse</option>
        </select>
        <button 
          type="submit" 
          className={styles.submitButton}
          aria-label="Submit Enquiry"
        >
          SUBMIT ENQUIRY
        </button>
      </form>
    </div>
  </section>
);
const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerGrid}>
            <div>
                <h4 className={styles.footerTitle}>Our Work</h4>
                <ul className={styles.footerList}>
                    <li><Link href="/work#residences" className={styles.footerLink}>Residences</Link></li>
                    <li><Link href="/work#offices" className={styles.footerLink}>Offices</Link></li>
                    <li><Link href="/work#clubhouses" className={styles.footerLink}>Clubhouses & Showflats</Link></li>
                    <li><Link href="/work#architecture" className={styles.footerLink}>Architecture</Link></li>
                </ul>
            </div>
            
            <div>
                <h4 className={styles.footerTitle}>Contact</h4>
                <div className={styles.footerList}>
                    <p>For Clients & Media: <br/> **+91 77100 10617**</p>
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
);

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactFormSection />
      <Footer />
    </>
  );
}



