// app/contact/page.js
'use client'; // Essential for client-side interactivity like form handling

import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/contact.module.css';

// --- Contact Form Component ---
const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phn: '', // RENAMED: Changed from 'phone' to 'phn' to match DB column
        category: '',
        userdescription: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        try {
            // UPDATED: Corrected endpoint to lowercase '/api/saveuser'
            const response = await axios.post('/api/saveUser', formData); 
            
            // Success check using standard HTTP status codes
            if (response.status === 201 || response.status === 200) { 
                setStatus('Thank you! Your message has been sent.');
                // Clear form data using the correct keys
                setFormData({ firstname: '', lastname: '', email: '', phn: '', category: '', userdescription: '' }); 
            } else {
                setStatus('Failed to send your message. Server responded unexpectedly.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Grab detailed error message from the server response if available
            const errorMessage = error.response?.data?.details || 'An error occurred. Please try again later.';
            setStatus(errorMessage);
        }
    };

    return (
        <div className={styles.contactFormContainer}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '400' }}>
                SEND US AN ENQUIRY
            </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name *"
                        className={styles.input}
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name *"
                        className={styles.input}
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phn" // UPDATED: Name changed to 'phn'
                    placeholder="Phone *"
                    className={styles.input}
                    value={formData.phn} // UPDATED: Value changed to 'phn'
                    onChange={handleChange}
                    required
                />
                <div className={styles.formGroup}>
                    <select
                        name="category"
                        className={styles.select}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category *</option>
                        <option value="residence">Residence</option>
                        <option value="office">Office</option>
                        <option value="clubhouse">Clubhouse / Show flat</option>
                        <option value="architecture">Architecture</option>
                    </select>
                </div>
                <textarea
                    name="userdescription"
                    placeholder="Your Message / Project Details"
                    className={styles.textarea}
                    value={formData.userdescription}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit" className={styles.submitButton}>
                    SUBMIT ENQUIRY
                </button>
            </form>
            {status && (
                <p
                    style={{
                        marginTop: '1rem',
                        fontSize: '1rem',
                        color: status.startsWith('Thank') ? 'green' : 'red',
                    }}
                >
                    {status}
                </p>
            )}
        </div>
    );
};

// --- Contact Info Block Component (No changes needed) ---
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


// --- Main Contact Page Component (No changes needed) ---
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