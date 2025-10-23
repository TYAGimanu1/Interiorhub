// pages/work/[slug].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/slug.module.css';
import Image from 'next/image'; 
import { getBaseUrl } from '@/lib/utils';

const ProjectDetails = ({ projects }) => {
  const router = useRouter();
  const { slug } = router.query;

  // Find the project based on the slug
  // Use optional chaining for safety in case projects is null/undefined
  const project = projects?.find((p) => p.slug === slug);

  // Use || '' for initial state safety if project data isn't available
  const [mainImage, setMainImage] = useState(project?.imageurl || '');
  const [additionalImages, setAdditionalImages] = useState([
    project?.img1 || '',
    project?.img2 || '',
    project?.img3 || '',
  ].filter(Boolean)); // Filter out empty strings

  if (router.isFallback) {
      return <h1>Loading Project...</h1>;
  }

  if (!project) {
    return <p>Project not found or data is unavailable.</p>;
  }

  const handleImageClick = (index) => {
    const newImages = [...additionalImages];
    const clickedImage = newImages[index];

    // Swap the clicked image with the main image
    newImages[index] = mainImage;
    setMainImage(clickedImage);
    setAdditionalImages(newImages);
  };

  return (
    <div className={styles.projectDetails}>
      <h1 className={styles.projectTitle}>{project.title}</h1>
      <p className={styles.projectCategory}>{project.category}</p>

      <div className={styles.projectImageContainer}>
        <Image
          src={mainImage}
          alt={project.title}
          className={styles.projectImage}
          width={700}
          height={500}
          priority // Ensure main image loads quickly
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
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <h1>About</h1>
      <hr />
      <p className={styles.projectDescription}>{project.description}</p>
    </div>
  );
};


export async function getStaticPaths() {
  try {
    const res = await fetch(`/api/projects`);
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
    const url = `/api/projects`;
    
    try {
        const res = await fetch(url);

        // CRITICAL FIX: CHECK STATUS BEFORE PARSING
        if (!res.ok) {
            console.error(`[getStaticProps] API Failure. Status: ${res.status} from URL: ${url}`);
            // Return empty projects array to prevent component crash
            return { props: { projects: [] }, revalidate: 60 };
        }

        const projects = await res.json();

        console.log('Fetched project data:', projects); // Log fetched data for debugging

        return { 
            props: { projects },
            revalidate: 60, // Recommended
        };
    } catch (error) {
         console.error(`[getStaticProps] Network/Parsing Error: ${error.message}`);
         return { props: { projects: [] }, revalidate: 60 };
    }
}

export default ProjectDetails;