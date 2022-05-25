import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

const Modal = ({ isShowing, hide, content }) =>
  isShowing &&
  ReactDOM.createPortal(
    <>
      <div className='modal-overlay' />
      <div className='modal-wrapper' aria-modal aria-hidden tabIndex={-1} role='dialog' onClick={hide}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <button type='button' className='modal-close-button' data-dismiss='modal' aria-label='Close' onClick={hide}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          {content}
        </div>
      </div>
    </>,
    document.body
  );

export default Modal;
