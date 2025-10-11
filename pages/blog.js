// app/blog/page.js
import React from 'react';
import Link from 'next/link';
import styles from "@/styles/blog.module.css";

// --- Sample Data (Replace with real data fetching from CMS/Markdown files) ---
const BLOG_POSTS = [
    {
        id: 1,
        title: "Ashleys Wins Luxury Lifestyle Award for Best Luxury Penthouse Interior Design in India",
        slug: "ashleys-wins-luxury-award-2024",
        category: "Awards / Press",
        date: "October 10, 2024",
        excerpt: "Luxury Lifestyle Awards, an esteemed authority recognized globally for honoring world-class luxury standards, thrilled to announce Ashleys has been marked as a trailblazer...",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsoLFE2zvMk6pb0SwSywF-er-vcdkn5sXUbg&s"
    },
    {
        id: 2,
        title: "Minimalist Sophistication: The Timeless Appeal of Clean Design",
        slug: "minimalist-sophistication-guide",
        category: "Design Insights",
        date: "September 15, 2024",
        excerpt: "We dive deep into our signature style—minimalist sophistication—exploring how strong design statements and exclusive detailing create drama and individuality in any space.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQ58nQm0taqkq75gdV3cpegB2PdV8yEHXAA&s"
    },
    {
        id: 3,
        title: "Designing for Wellness: Integrating Biophilic Elements into Luxury Spaces",
        slug: "designing-for-wellness-biophilic",
        category: "Architecture",
        date: "August 28, 2024",
        excerpt: "Learn how we integrate nature, light, and natural materials to create luxury residential and corporate spaces that promote health, productivity, and tranquility.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLN3mmixI5JglyrMLDWrPJkXfEQzvVvhM6Qw&s"
    },
    {
        id: 4,
        title: "Project Spotlight: The Capitol Tower - A Corporate Masterpiece",
        slug: "project-spotlight-capitol-tower",
        category: "News / Project",
        date: "July 20, 2024",
        excerpt: "A detailed look into our recent commercial venture, The Capitol Tower, showcasing innovative layouts and cutting-edge material use for a global corporate client.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAAA1_uSClekEUfFhLOMeYebFMNFYY8yDISQ&s"
    },
];

// --- Post Card Component ---
const PostCard = ({ post }) => (
    <Link 
        href={`/blog/${post.slug}`} 
        className={styles.postCard}
    >
        <div className={styles.imageContainer}>
            {/* Replace with Next.js Image component in a real app */}
            <img 
                src={post.imageUrl} 
                alt={post.title} 
                className={styles.postImage} 
            />
        </div>
        <div className={styles.postContent}>
            <p className={styles.postCategory}>{post.category}</p>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <p className={styles.postMeta}>Published on {post.date}</p>
        </div>
    </Link>
);

// --- Main Blog Index Page Component ---
export default function BlogPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>News & Blog</h1>
            
            <div className={styles.blogGrid}>
                {BLOG_POSTS.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            
            {BLOG_POSTS.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '4rem', fontSize: '1.25rem', color: '#666' }}>
                    No blog posts are available yet. Please check back later!
                </p>
            )}
        </div>
    );
}