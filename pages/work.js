import { useEffect, useState } from 'react';
import Link from 'next/link';
// Removed unused 'Image' import from 'next/image' as you are using <img> tags
import styles from '@/styles/work.module.css';
import { getBaseUrl } from '@/lib/utils'; // Uses the utility for correct base URL

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
    {/* CRITICAL CHECK: Ensure src={project.imageurl} matches the lowercase field name 
        returned by PostgreSQL, which is guaranteed to be 'imageurl' */}
    <img
      src={project.imageurl} 
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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProjects = async () => {
      // FIX: Use the resilient utility for the fetch URL
      const apiUrl = `${getBaseUrl()}/api/projects`; 

      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        // FIX 1: Throw error OR handle non-OK status
        if (!response.ok) {
          console.error(`Client Fetch Failed. Status: ${response.status}`);
          setProjects([]);
          return;
        }
        
        const data = await response.json();

        // FIX 2: CRITICAL: Ensure the response is an array before setting state
        if (Array.isArray(data)) {
            setProjects(data);
        } else {
            console.error('API response was not a valid array:', data);
            setProjects([]); 
        }

      } catch (error) {
        console.error('Error fetching projects in work.js:', error);
        setProjects([]);
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map((project) => project.category).filter(Boolean))];

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
          {loading ? (
             <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Loading projects...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
             <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
               No projects found in this category.
             </p>
          )}
        </div>
      </div>
    </>
  );
}