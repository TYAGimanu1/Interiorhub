// app/contact/page.js
'use client'; // Essential for client-side interactivity like form handling

import React, { useState } from 'react';
import styles from '@/styles/contact.module.css';

// --- Contact Form Component ---
const ContactForm = () => {
    // State to handle form submission (optional, but good practice)
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Submitting...');
        
        // --- REAL FORM LOGIC GOES HERE ---
        // In a real Next.js application, you would use 'fetch' to send this data 
        // to an API route (e.g., /api/contact) or an external service (Formspree, etc.)
        
        setTimeout(() => {
            setStatus('Thank you for your enquiry. We will be in touch shortly!');
            // e.target.reset(); // Uncomment to clear form fields after success
        }, 2000);
    };

    return (
        <div className={styles.contactFormContainer}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '400' }}>
                SEND US AN ENQUIRY
            </h2>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input type="text" placeholder="First Name *" className={styles.input} required />
                    <input type="text" placeholder="Last Name *" className={styles.input} required />
                </div>
                
                <input type="email" placeholder="Email *" className={styles.input} required />
                <input type="tel" placeholder="Phone *" className={styles.input} required />
                
                <div className={styles.formGroup}>
                    <input type="text" placeholder="City" className={styles.input} />
                    <select className={styles.select}>
                        <option value="">Select Category *</option>
                        <option value="residence">Residence</option>
                        <option value="office">Office</option>
                        <option value="clubhouse">Clubhouse / Show flat</option>
                        <option value="architecture">Architecture</option>
                    </select>
                </div>

                <textarea placeholder="Your Message / Project Details" className={styles.textarea}></textarea>
                
                <button type="submit" className={styles.submitButton}>
                    SUBMIT ENQUIRY
                </button>
            </form>
            
            {/* Display submission status */}
            {status && (
                <p style={{ marginTop: '1rem', fontSize: '1rem', color: status.startsWith('Thank') ? 'green' : 'red' }}>
                    {status}
                </p>
            )}
        </div>
    );
};

// --- Contact Info Block Component ---
const ContactInfo = () => (
    <div className={styles.contactInfoContainer}>
        <div className={styles.infoBlock}>
            <h3>For Clients & Media</h3>
            <p>
                Phone: <a href="tel:+917710010617" className={styles.phoneLink}>+91 22200 10617</a>
            </p>
            <p>
                Email: <a href="mailto:rebecca@ashleys.co.in" className={styles.emailLink}>rebecca@ashleys.co.in</a>
            </p>
        </div>

        <div className={styles.infoBlock}>
            <h3>For Vendors / General Enquiries</h3>
            <p>
                Phone: <a href="tel:+912225002411" className={styles.phoneLink}>+91 22 25002411</a>
            </p>
        </div>

        <div className={styles.infoBlock}>
            <h3>For Careers</h3>
            <p>
                Email: <a href="mailto:reach@theashleys.co.in" className={styles.emailLink}>reach@theashleys.co.in</a>
            </p>
        </div>

        <div className={styles.addressMap}>
            <h3>Our Location</h3>
            <p>Ashleys Studio, Mumbai, India</p>
            {/* Placeholder for a Google Maps or iframe embed */}
            <div style={{ width: '100%', height: '200px', backgroundColor: '#e9e9e9', marginTop: '1rem' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56952.96355055215!2d75.7213813873058!3d26.853936607563785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db500273e196d%3A0x918a37842bf2bb43!2sMansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1760182899770!5m2!1sen!2sin" ></iframe>
            </div>
        </div>
    </div>
);


// --- Main Contact Page Component ---
export default function ContactPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Contact Us</h1>
            
            <div className={styles.contactGrid}>
                <ContactForm />
                <ContactInfo />
            </div>
        </div>
    );
}