import React from 'react';

const Input = (props) => {
  return (
    <>
      <input
        required
        id={props.name}
        className="modal__form-profession modal__input"
        type={props.type}
        name={props.name}
        onChange={props.handleChange}
        defaultValue={props.defaultValue}
      />
      <span id={`${props.name}-error`} className="modal__formerror" />
    </>
  );
};

export default Input;
