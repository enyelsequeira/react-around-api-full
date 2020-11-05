/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

const PopupWithForm = (props) => {
  console.log(props, 5);

  return (
    <div
      className={
        props.isOpen
          ? `${props.name} modal_active modal`
          : `${props.name} modal `
      }>
      <div className="modal__info">
        <button
          className="modal__close"
          aria-label="close modal"
          data-close
          type="button"
          onClick={props.onClose}
        />
        <p className="modal__title"> {props.title}</p>
        <form
          onSubmit={props.handleSubmit}
          className="modal__form"
          name={props.name}>
          {props.children}
          <button
            className="modal__save-button modal__save"
            value={props.buttonText}
            type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
