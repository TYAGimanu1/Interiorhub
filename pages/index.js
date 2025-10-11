// app/page.js
import React from 'react';
import Link from 'next/link';
// Import the CSS Module
import styles from '@/styles/page.module.css'; 

// NOTE: In a real Next.js application, you would use 'next/image' for images 
// and handle video optimization.



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
              <img className={styles.founderImage} src="https://t4.ftcdn.net/jpg/03/78/43/25/360_F_378432516_6IlKiCLDAqSCGcfc6o8VqWhND51XqfFm.jpg"/>
              </div> {/* Image Placeholder */}
            <p className={styles.founderName}>Alankar Tyagi</p>
          </div>
          <div className={styles.founder}>
            <div className={styles.founderImage}>
              <img className={styles.founderImage} src="https://www.shutterstock.com/image-photo/biometric-passport-photo-attraktiv-female-260nw-2207163201.jpg"/></div> {/* Image Placeholder */}
            <p className={styles.founderName}>Alexa Tyagi</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const categories = [
    { name: 'Residences', count: 12, img: "https://www.squareyards.com/blog/wp-content/uploads/2023/11/what-is-Residential-Buildings.jpg" },
    { name: 'Offices', count: 6, img: "https://cdn.decorilla.com/online-decorating/wp-content/uploads/2024/10/Office-interior-design-services-contemporary-results-by-Decorilla-1024x683.jpeg?width=900" },
    { name: 'Clubhouses & Showflats', count: 4, img: "https://i.pinimg.com/originals/98/5d/71/985d7114e032ca660313cffbf0fa4e47.jpg" },
    { name: 'Architecture', count: 3, img: "https://thearchitectsdiary.com/wp-content/uploads/2024/05/interior-design-concept-5-jpg.webp" },
  
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
              <div className={styles.projectOverlay}>
                <img 
                  src={cat.img}
                  alt={cat.name}
                  style={{ width: '100%', height: '55vh', objectFit: 'cover' }}
                />
              </div>
              
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


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactFormSection />
     
    </>
  );
}



