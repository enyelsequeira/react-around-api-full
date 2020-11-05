import React from 'react';
import success from '../images/success.png';
import fail from '../images/error.png';

const InfoToolTip = ({ valid, isOpen, onClose, popupType }) => {
  console.log(valid);
  return (
    <div
      className={
        isOpen ? `${popupType} modal_active modal` : `${popupType} modal `
      }>
      <div className="modal__info">
        <button
          className="modal__close"
          aria-label="close modal"
          data-close
          type="button"
          onClick={onClose}
        />
        <div className="modal__content">
          <img
            className="modal__content-image"
            src={valid ? success : fail}
            alt={valid ? 'success' : 'fail'}
          />
          {valid ? (
            <p className="modal__content-text">
              Success you have now been register{' '}
            </p>
          ) : (
            <p className="modal__content-text">
              Oops, Something went wrong! Please try again
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoToolTip;
