import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import { AiFillEye, AiFillGithub, AiOutlineDownload } from 'react-icons/ai';
import './Work.scss';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  const width = window.innerWidth;

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then(data => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = item => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter(work => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className='head-text'>
        My Creative <span>Portfolio</span>
      </h2>
      <div className='app__work-filter'>
        {['Javascript Vanilla', 'React JS', 'Node JS', 'API', 'All'].map((item, i) => (
          <div
            key={i}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}>
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'>
        {filterWork.map((work, i) => (
          <div className='app__work-item ' key={i}>
            <div className='app__work-img app__flex'>
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={width > 500 && { opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildern: 0.5 }}
                className='app__work-hover app__flex'>
                <a href={work.projectLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25, ease: 'easeInOut', staggerChildern: 0.5 }}
                    className='app__flex'>
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25, ease: 'easeInOut', staggerChildern: 0.5 }}
                    className='app__flex'>
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className='app__work-content app__flex'>
              <h4 className='bold-text'>{work.title}</h4>
              <p className='p-text' style={{ marginTop: 10 }}>
                {work.description}
              </p>
              {work.instructions && (
                <motion.div
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, type: 'tween' }}>
                  <a
                    href={work.instructions}
                    download
                    style={{ marginTop: 10, textDecoration: 'none', fontSize: '14px' }}>
                    Download Project Instructions <AiOutlineDownload />
                  </a>
                </motion.div>
              )}
              <div className='app__work-tag app__flex'>
                <p className='p-text'>{work.tags[0]} </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Work, 'app__works'), 'work', 'app__primarybg');
