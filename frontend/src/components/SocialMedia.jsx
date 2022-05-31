import React from 'react';
import { BsGithub, BsLinkedin, BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import { images } from '../constants';
import { Modal, PdfFile } from './index';
import useModal from '.././hooks/useModal';

const SocialMedia = () => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <div className='app__social' style={{ cursor: 'pointer' }}>
        <div onClick={toggle}>
          <BsFillFileEarmarkPdfFill />
        </div>

        <a href='https://github.com/nircaspary' target='_blank' rel='noreferrer'>
          <div>
            <BsGithub />
          </div>
        </a>
        <a href='https://www.linkedin.com/in/nir-caspary-3301441b2/' target='_blank' rel='noreferrer'>
          <div>
            <BsLinkedin />
          </div>
        </a>
      </div>
      <Modal isShowing={isShowing} hide={toggle} content={<PdfFile file='/nir-caspary-cv1.pdf' />} />
    </>
  );
};

export default SocialMedia;
