/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import Input from './Input';
import PopupWithForm from './PopUpWithForm';

const AddPlacePopup = (props) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNewCardName = (e) => {
    setName(e.target.value);
  };
  const handleNewCardLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      handleSubmit={handleSubmit}
      name="card-add"
      title="New Place"
      buttonText="Create"
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <Input handleChange={handleNewCardName} type="text" defaultValue="Name" />
      <Input handleChange={handleNewCardLink} type="url" defaultValue="Link" />
    </PopupWithForm>
  );
};
export default AddPlacePopup;
