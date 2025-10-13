import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/work.module.css';
import { getBaseUrl } from '@/lib/utils';
const HeroSection = () => (
  <div className={styles.heroSection}>
    <img
      className={styles.heroImage}
      src="https://media.istockphoto.com/id/1145780239/photo/dark-interior-with-open-kitchen.jpg?s=612x612&w=0&k=20&c=sigz2x-O26RYwC49hKqozEJxrFX4CR9zqiTCTSXx9e4="
      alt="Luxury Interior Design"
    />
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>Our Work</h1>
      <p className={styles.heroSubtitle}>ASHLEYS</p>
    </div>
  </div>
);

const ProjectCard = ({ project, index }) => (
  <Link
    href={`/work/${project.slug}`}
    className={styles.projectCard}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
   
    <img
      src={project.imageurl} // Ensure this matches the field name in the API response
      alt={project.title}
      className={styles.projectImage}
    />
    <div className={styles.projectInfo}>
      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectCategory}>{project.category}</p>
    </div>
  </Link>
);

export default function WorkPage() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://interiorhub.vercel.app/api/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map((project) => project.category))];

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <>
      <HeroSection />
      
      <div className={styles.workContainer}>
        <h1 className={styles.pageTitle}>Our Work</h1>

        <div className={styles.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeButton : ''
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.projectGrid}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}

          {filteredProjects.length === 0 && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              No projects found in this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
}