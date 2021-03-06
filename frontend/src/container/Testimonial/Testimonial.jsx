import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { isBrowser } from 'react-device-detect';
import { Modal, PdfFile } from '../../components';
import useModal from '../../hooks/useModal';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {
  const { isShowing, toggle } = useModal();
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = index => setCurrentIndex(index);

  useEffect(() => {
    const brandsQuery = '*[_type == "brands"]';
    const testimonialsQuery = '*[_type == "testimonials"]';
    client.fetch(brandsQuery).then(data => setBrands(data));
    client.fetch(testimonialsQuery).then(data => setTestimonials(data));
  }, []);

  const test = testimonials[currentIndex];

  return (
    <>
      <h2 className='head-text' style={{ paddingBottom: '48px' }}>
        Testimonials
      </h2>
      {testimonials.length && (
        <>
          <div className='app__testimonial-item'>
            <img src={urlFor(test.imgurl)} alt={testimonials} />
            <div className='app__testimonial-content' style={{ alignItems: 'center' }}>
              <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: 'tween' }}>
                <h4 style={{ padding: '10px', margin: '0', cursor: 'pointer' }} onClick={toggle}>
                  Click here to read the testimonial
                </h4>
              </motion.div>

              {isBrowser ? (
                <iframe src={test.feedback} title={test.name} type='application/pdf' width='80%' height='400px' />
              ) : (
                <img
                  onClick={toggle}
                  src={urlFor(test.feedbackMobile)}
                  alt={test.name}
                  width='80%'
                  height='400px'
                  className='app__testimonial-feedback-mobile'
                />
              )}
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>
            </div>
          </div>
          <Modal isShowing={isShowing} hide={toggle} content={<PdfFile file={test.feedback} />} />
          <div className='app__testimonial-btns app__flex'>
            <div
              className='app__flex'
              onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>
            <div
              className='app__flex'
              onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className='app__testimonial-brands app__flex'>
        {brands.map(brand => (
          <motion.div whileInView={{ opacity: [0, 1] }} transition={{ duration: 0.5, type: 'tween' }} key={brand._id}>
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Testimonial, 'app__testimonial'), 'testimonials', 'app__primarybg');
