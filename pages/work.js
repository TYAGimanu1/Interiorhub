// app/work/page.js
'use client'; // This page uses client-side interactivity (useState, onClick)

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/work.module.css';


// --- Sample Data (Replace with real data fetching from API/CMS) ---
const ALL_PROJECTS = [
    { id: 1, title: "Skyline Penthouse", category: "Residences", slug: "skyline-penthouse", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlizPgyi4g0K1xjxfvLyz3rDsrdgkab4gFkA&s" },
    { id: 2, title: "The Capitol Tower", category: "Offices", slug: "capitol-tower", imageUrl: "https://i.pinimg.com/736x/fc/0c/64/fc0c64c697e8b4661135328ad7c1902b.jpg" },
    { id: 3, title: "Elite Members Club", category: "Clubhouse and Show Flat", slug: "elite-club", imageUrl: "https://5.imimg.com/data5/SELLER/Default/2021/11/EG/SV/PH/138882076/club-house-interior-designing.jpg" },
    { id: 4, title: "Contemporary Villa", category: "Architecture", slug: "contemp-villa", imageUrl: "https://thearchitectsdiary.com/wp-content/uploads/2025/03/villa-house-15.jpg" },
    { id: 5, title: "Modern Studio Apt", category: "Residences", slug: "modern-studio", imageUrl: "https://thearchitectsdiary.com/wp-content/uploads/2023/11/Monochrome-interiors-3-jpg.webp" },
    { id: 6, title: "Tech Startup HQ", category: "Offices", slug: "tech-hq", imageUrl: "https://thearchitectsdiary.com/wp-content/uploads/2024/08/IT-office-interior-design-3.jpg" },
    // Add more projects to test filtering
    { id: 7, title: "Luxury Show Flat", category: "Clubhouse and Show Flat", slug: "luxury-showflat", imageUrl: "https://i.pinimg.com/736x/4b/ab/5b/4bab5bcbcdb52d245d39b94f9117623d.jpg" },
    { id: 8, title: "Garden Home Design", category: "Architecture", slug: "garden-home", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-hfljhHR6Q0u3B89M_CcQNdxBQykPdXT8g&s" },
];

// Dynamically extract categories, ensure "All" is first
const CATEGORIES = [
    "All",
    ...Array.from(new Set(ALL_PROJECTS.map(p => p.category)))
];

const HeroSection = () => (
  <div className={styles.heroSection}>
    {/* Video Element (Placeholder for video optimization) */}
    <img className={styles.heroImage} src="https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=612x612&w=0&k=20&c=sigz2x-O26RYwC49hKqozEJxrFX4CR9zqiTCTSXx9e4=" alt="Luxury Interior Design"/>
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>
        Our Work
      </h1>
      <p className={styles.heroSubtitle}>ASHLEYS</p>
    </div>
  </div>
);
// --- Project Card Component ---
const ProjectCard = ({ project, index }) => (
    <Link 
        href={`/work/${project.slug}`} 
        className={styles.projectCard}
        // Apply animation delay for staggered effect
        style={{ animationDelay: `${index * 0.1}s` }} 
    >
        {/* Replace with Next.js Image component in a real app */}
        <img 
            src={project.imageUrl} 
            alt={project.title} 
            className={styles.projectImage} 
        />
        <div className={styles.projectInfo}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectCategory}>{project.category}</p>
        </div>
    </Link>
);


// --- Main Work Page Component ---
export default function WorkPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    // Filter the projects based on the active category
    const filteredProjects = ALL_PROJECTS.filter(project => 
        activeCategory === "All" || project.category === activeCategory
    );

    // Function to handle category click
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (<>
      <HeroSection/>
        <div className={styles.workContainer}>
            <h1 className={styles.pageTitle}>Our Work</h1>

            {/* Category Filter Tabs */}
            <div className={styles.categoryTabs}>
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        // Apply the activeButton class for styling and the underline animation
                        className={`${styles.categoryButton} ${activeCategory === category ? styles.activeButton : ''}`}
                    >
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Project Grid */}
            <div className={styles.projectGrid}>
                {filteredProjects.map((project, index) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        index={index} 
                    />
                ))}

                {filteredProjects.length === 0 && (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No projects found in this category.</p>
                )}
            </div>
        </div>
</>
    );
    
}