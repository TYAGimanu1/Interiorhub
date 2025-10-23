// pages/work/[slug].js
import { useRouter } from 'next/router';
import styles from '@/styles/slug.module.css';
import Image from 'next/image';

const ProjectDetails = ({ project }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading Project...</h1>;
  }

  if (!project) {
    return <p>Project not found or data is unavailable.</p>;
  }

  const { title, category, description, imageurl, img1, img2, img3 } = project;
  const additionalImages = [img1, img2, img3].filter(Boolean);

  return (
    <div className={styles.projectDetails}>
      <h1 className={styles.projectTitle}>{title}</h1>
      <p className={styles.projectCategory}>{category}</p>

      <div className={styles.projectImageContainer}>
        <Image
          src={imageurl}
          alt={title}
          className={styles.projectImage}
          width={700}
          height={500}
          priority
        />
      </div>

      <div className={styles.thumbnailContainer}>
        {additionalImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={styles.thumbnail}
            width={100}
            height={100}
          />
        ))}
      </div>

      <h1>About</h1>
      <hr />
      <p className={styles.projectDescription}>{description}</p>
    </div>
  );
};

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`);
    if (!res.ok) {
      console.error(`[getStaticPaths] API Failure. Status: ${res.status}`);
      return { paths: [], fallback: false };
    }
    const projects = await res.json();
    const paths = projects.map((project) => ({ params: { slug: project.slug } }));
    return { paths, fallback: false };
  } catch (error) {
    console.error(`[getStaticPaths] Network/Parsing Error: ${error.message}`);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?slug=${slug}`);
    if (!res.ok) {
      console.error(`[getStaticProps] API Failure. Status: ${res.status}`);
      return { props: { project: null }, revalidate: 60 };
    }
    const project = await res.json();
    return { props: { project }, revalidate: 60 };
  } catch (error) {
    console.error(`[getStaticProps] Network/Parsing Error: ${error.message}`);
    return { props: { project: null }, revalidate: 60 };
  }
}

export default ProjectDetails;