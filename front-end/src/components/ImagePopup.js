/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';

const ImagePopup = ({ card, onClose }) => (
  <div
    className={`modal figure  ${
      card !== '' ? 'modal figure modal_active' : ''
    }`}>
    <div className="modal__figure-container">
      <button className="modal__close modal__figure-exit" onClick={onClose} />
      <img
        className="modal__figure-image"
        src={`${card.link}`}
        alt={card.name}
      />
      <p className="modal__figure-caption">{card.name}</p>
    </div>
  </div>
);

export default ImagePopup;
