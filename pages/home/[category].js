// pages/home/[category].js
import { useRouter } from 'next/router';
import styles from '@/styles/category.module.css';
import Link from 'next/link';
import Image from 'next/image';

const CategoryPage = ({ projects }) => {
  const router = useRouter();
  const { category } = router.query;
  
  // Filter projects based on the category from the router query
  const filteredProjects = projects.filter(
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
  const url = `https://interiorhub.vercel.app/api/projects`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`[getStaticPaths in [category].js] API Failure. Status: ${res.status}`);
      return { paths: [], fallback: true }; // Enable fallback for dynamic generation
    }

    const projects = await res.json();

    const categories = [...new Set(projects.map((project) => project.category).filter(Boolean))];

    const paths = categories.map((category) => ({
      params: { category },
    }));

    return { paths, fallback: true }; // Enable fallback for dynamic generation
  } catch (error) {
    console.error(`[getStaticPaths in [category].js] Network Error: ${error.message}`);
    return { paths: [], fallback: true }; // Enable fallback for dynamic generation
  }
}

// --- Build Function: Provides all project data as props ---
export async function getStaticProps({ params }) {
  const { category } = params;
  const url = `https://interiorhub.vercel.app/api/projects?category=${category}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`[getStaticProps in [category].js] API Failure. Status: ${res.status}`);
      return { props: { projects: [] }, revalidate: 60 };
    }

    const projects = await res.json();

    return { props: { projects }, revalidate: 60 };
  } catch (error) {
    console.error(`[getStaticProps in [category].js] Network Error: ${error.message}`);
    return { props: { projects: [] }, revalidate: 60 };
  }
}

export default CategoryPage;