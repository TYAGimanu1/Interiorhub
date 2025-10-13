import { useRouter } from 'next/router';
import styles from '@/styles/category.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseUrl } from '@/lib/utils'; // Utility to handle Vercel's environment URL

const CategoryPage = ({ projects }) => {
  const router = useRouter();
  const { category } = router.query;

  // Filter projects based on the category from the router query
  const filteredProjects = projects.filter(
    // Compare lowercased versions for safer matching
    (project) => project.category && category && project.category.toLowerCase() === category.toLowerCase()
  );

  // Fallback state if data fetching failed or no category was found
  if (!category || filteredProjects.length === 0) {
    return (
        <div className={styles.categoryPage} style={{ textAlign: 'center', padding: '50px' }}>
            <h1 className={styles.categoryTitle}>Loading or Not Found</h1>
            <p>No projects found for this category, or the category data is unavailable.</p>
        </div>
    );
  }

  return (
    <div className={styles.categoryPage}>
      <h1 className={styles.categoryTitle}>{category} Projects</h1>
      <div className={styles.projectList}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <Link href={`/work/${project.slug}`}>
             
                <Image
                  src={project.imageurl}
                  alt={project.title}
                  className={styles.projectImage}
                  width={300}
                  height={200}
                  // The 'Image' component needs explicit width/height
                />
                <h2 className={styles.projectTitle}>{project.title}</h2>
             
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Build Function: Generates all unique category paths at build time ---
export async function getStaticPaths() {
  // FIX 1: Use getBaseUrl() utility to get the correct build-time domain
  const url = `${getBaseUrl()}/api/projects`; 
  
  try {
    const res = await fetch(url);
    
    // CRITICAL FIX: Check for successful response BEFORE parsing JSON
    if (!res.ok) {
        console.error(`[getStaticPaths in [category].js] API Failure. Status: ${res.status}`);
        return { paths: [], fallback: false };
    }
    
    const projects = await res.json();

    // Collect all unique categories
    const categories = [...new Set(projects.map((project) => project.category).filter(Boolean))];

    // Generate paths using the categories as params
    const paths = categories.map((category) => ({
      params: { category },
    }));

    return { paths: paths.length > 0 ? paths : [], fallback: false };

  } catch (error) {
    console.error(`[getStaticPaths in [category].js] Network Error: ${error.message}`);
    return { paths: [], fallback: false };
  }
}

// --- Build Function: Provides all project data as props ---
export async function getStaticProps() {
  // FIX 2: Correct URL construction: remove the leading '$' and use getBaseUrl()
  const url = `${getBaseUrl()}/api/projects`;
  
  try {
    const res = await fetch(url);
  
    // CRITICAL FIX: Check for successful response BEFORE parsing JSON
    if (!res.ok) {
       console.error(`[getStaticProps in [category].js] API Failure. Status: ${res.status}`);
       return { 
           props: { projects: [] },
           revalidate: 60,
       };
    }

    const projects = await res.json();

    return { 
      props: { projects }, 
      revalidate: 60,
    };
  } catch (error) {
    console.error(`[getStaticProps in [category].js] Network Error: ${error.message}`);
    return { props: { projects: [] }, revalidate: 60 };
  }
}

export default CategoryPage;