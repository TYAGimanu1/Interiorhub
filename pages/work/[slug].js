import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/slug.module.css';
import Image from 'next/image'; 
import { getBaseUrl } from '@/lib/utils';
const ProjectDetails = ({ projects }) => {
  const router = useRouter();
  const { slug } = router.query;

  // Find the project based on the slug
  const project = projects.find((p) => p.slug === slug);

  const [mainImage, setMainImage] = useState(project?.imageurl);
  const [additionalImages, setAdditionalImages] = useState([
    project?.img1,
    project?.img2,
    project?.img3,
  ]);

  if (!project) {
    return <p>Project not found</p>;
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
  // Fetch all projects to generate paths
  const res = await fetch(`${getBaseUrl()}/api/projects`);
  const projects = await res.json();

  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps() {
  // Fetch all projects to pass as props
  const res = await fetch(`${getBaseUrl()}/api/projects`);
  const projects = await res.json();

  return { props: { projects } };
}

export default ProjectDetails;