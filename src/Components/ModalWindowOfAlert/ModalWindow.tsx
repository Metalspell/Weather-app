import './Modal.css';
import { FC } from 'react';
import { AlertProps } from '../../Redux-store/types';

const ModalWindow:FC<AlertProps> = ({ message, onClose }) => {
  return (
    <>
      <section className="modal-body">
        <img className="modal-close-icon"
          onClick={onClose}
          src={require('./icons/Group110.png')}
          alt="close-icon"
        />
          <h1 className='error-notify'>
            {message}
          </h1>
      </section>
    </>
  );
}

export default ModalWindow;