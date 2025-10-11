// app/testimonials/page.js
import React from 'react';
// In a real Next.js app, you'd use 'next/image' for optimized images.
// import Image from 'next/image'; 
import styles from '@/styles/testimonials.module.css';

// --- Sample Data (with clientImage field) ---
const TESTIMONIALS = [
    {
        id: 1,
        quote: "Ashleys transformed our Mumbai apartment into a minimalist sanctuary. The detailing is impeccable, and their vision for the space was truly beyond our expectations. A masterclass in luxury design.",
        author: "Mr. and Mrs. Sharma",
        project: "Bandra Residence",
        clientImage: "/images/client-sharma.jpg" // Add client image path
    },
    {
        id: 2,
        quote: "Working with Pooja and Arbaysis was seamless. They captured the essence of our corporate identity and translated it into a sophisticated, highly functional office space. Highly recommended for commercial projects.",
        author: "Rajan Kapoor",
        project: "Corporate Office, BKC",
        clientImage: "https://image.pi7.org/static/img/circle_crop.webp"
    },
    {
        id: 3,
        quote: "From initial concepts to the final execution, the professionalism and artistic flair of the team stood out. They handled every aspect of our new show flat design with an international standard of quality.",
        author: "CEO, Prestige Developers",
        project: "Luxury Show Flat",
        clientImage: "/images/client-prestige.jpg"
    },
    {
        id: 4,
        quote: "The final design of our farmhouse is breathtaking. It's contemporary yet timeless, striking the perfect balance between comfort and drama. They are truly top architects and designers.",
        author: "A-List Celebrity Client",
        project: "Alibaug Farmhouse",
        clientImage: "/images/client-celebrity.jpg"
    },
    {
        id: 5,
        quote: "The attention to detail and personalized approach made our home renovation project a delightful experience. Ashleys truly understands luxury and comfort.",
        author: "Aditi Rao",
        project: "South Mumbai Apartment",
        clientImage: "/images/client-rao.jpg"
    },
];

// --- Testimonial Card Component ---
const TestimonialCard = ({ testimonial }) => (
    <div className={styles.testimonialCard}>
        <span className={styles.quoteIcon}>&ldquo;</span>
        <p className={styles.quoteText}>
            {testimonial.quote}
        </p>
        
        <div className={styles.authorInfo}>
            {/* Using a standard <img> tag for simplicity. 
                In a real Next.js app, always use <Image /> from 'next/image' for optimization. */}
            {testimonial.clientImage && (
                <img 
                    src={testimonial.clientImage} 
                    alt={testimonial.author} 
                    className={styles.clientImage} 
                    // width={60} // These props would be for next/image
                    // height={60}
                />
            )}
            <div className={styles.authorDetailsContainer}>
                <div className={styles.authorName}>
                    {testimonial.author}
                </div>
                <div className={styles.projectDetails}>
                    {testimonial.project}
                </div>
            </div>
        </div>
    </div>
);

// --- Main Testimonials Page Component ---
export default function TestimonialsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Client Testimonials</h1>
            
            <div className={styles.testimonialGrid}>
                {TESTIMONIALS.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </div>
            
        </div>
    );
}