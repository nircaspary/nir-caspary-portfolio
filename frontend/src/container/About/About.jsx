import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './About.scss';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then(data => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className='head-text'>
        Hello, I am
        <span> Nir Caspary </span>
        <br />
        And i'm a<span> Web Developer</span>
      </h2>
      <div className='app__profiles'>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className='app__about-item'>
          <p>
            I’m a Fullstack Developer located in Zichron Yaakov. I have a serious passion for Creating Things, Solving
            Problems, and creating intuitive, dynamic user experiences.
          </p>
          <p>Well-organised person, problem solver, independent learner with high attention to detail.</p>
          <p>
            Fan of outdoor activities, TV series, Gym and Lerning New Things. A friendly person who loves to make new
            connections, Interested in the entire web development spectrum and working on ambitious projects with
            positive people.
          </p>
          <h2> Lets work together !</h2>
        </motion.div>

        {
          //! For Sanity.io data fetch option
          /* {abouts.map((about, i) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className='app__profile-item'
            key={about.title + i}>
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className='bold-text' style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className='p-text' style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))} */
        }
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), 'about', 'app__whitebg');
