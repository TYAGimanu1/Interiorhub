import { useRouter } from 'next/router';
import styles from '@/styles/category.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseUrl } from '@/lib/utils';
const CategoryPage = ({ projects }) => {
  const router = useRouter();
  const { category } = router.query;

  // Filter projects based on the category
  const filteredProjects = projects.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase()
  );

  if (filteredProjects.length === 0) {
    return <p>No projects found for this category.</p>;
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

export async function getStaticPaths() {
  // Fetch all unique categories to generate paths
  const res = await fetch(`${getBaseUrl()}/api/projects`);
  const projects = await res.json();

  const categories = [...new Set(projects.map((project) => project.category))];

  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps() {
  // Fetch all projects to pass as props
  const res = await fetch(`${getBaseUrl()}/api/projects`);
  const projects = await res.json();

  return { props: { projects } };
}

export default CategoryPage;