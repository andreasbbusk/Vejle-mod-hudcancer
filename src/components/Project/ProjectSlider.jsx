import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import styles from '../../pages/Project/Project.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const slideVariants = {
  enter: {
    y: 1000,
    opacity: 0
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  },
  exit: {
    y: -1000,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const ProjectSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [projects, setProjects] = useState([]);
  const sliderRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const SCROLL_THRESHOLD = 80; // Antal pixels der skal scrolles før slide skifter

  useEffect(() => {
    // Fetch projects data
    fetch('../../data/projectsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects data:', error));
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();
      
      scrollAccumulatorRef.current += e.deltaY;
      
      setScrollOffset(prev => {
        const newOffset = prev + e.deltaY * 0.5; 
        return newOffset;
      });

      if (Math.abs(scrollAccumulatorRef.current) >= SCROLL_THRESHOLD) {
        setIsScrolling(true);

        // Scroll ned
        if (scrollAccumulatorRef.current > 0 && currentPage < projects.length - 1) {
          setCurrentPage(prev => prev + 1);
        } 
        // Scroll op
        else if (scrollAccumulatorRef.current < 0 && currentPage > 0) {
          setCurrentPage(prev => prev - 1);
        }

        scrollAccumulatorRef.current = 0;
        setScrollOffset(0);

        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      slider.removeEventListener('wheel', handleWheel);
    };
  }, [currentPage, isScrolling, projects.length]);

  if (!projects || projects.length === 0) {
    return <div>Ingen projekter at vise</div>;
  }

  const currentProject = projects[currentPage];

  return (
    <div 
      className={styles.fullscreenSlider} 
      ref={sliderRef}
      aria-label="Projekt slider"
    >
      {/* År navigation */}
      <div className={styles.yearNavigation}>
        {projects.map((project, index) => (
          <motion.div
            key={project.år}
            className={styles.yearIndicator}
            animate={{
              color: currentPage === index ? '#E0A619' : '#666',
              scale: currentPage === index ? 1.2 : 1
            }}
          >
            {project.år}
          </motion.div>
        ))}
      </div>

      {/* Projekt visning */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentPage}
          className={styles.projectSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ 
            y: scrollOffset 
          }}
        >
          <div className={styles.projectContent}>
            <motion.img 
              src={currentProject?.billede || '/placeholder-image.jpg'} 
              alt={currentProject?.titel || ''}
              className={styles.projectImage}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className={styles.projectInfo}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>{currentProject?.titel}</h2>
              <p>{currentProject?.beskrivelse}</p>
              {currentProject?.læsMereLink && (
                <Link 
                  to={currentProject.læsMereLink}
                  className={styles.readMoreButton}
                  tabIndex={0}
                >
                  Læs mere
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

ProjectSlider.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      år: PropTypes.string.isRequired,
      titel: PropTypes.string.isRequired,
      beskrivelse: PropTypes.string.isRequired,
      billede: PropTypes.string,
      læsMereLink: PropTypes.string
    })
  )
};

export default ProjectSlider;