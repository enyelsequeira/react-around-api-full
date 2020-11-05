/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Input from './Input';
import PopupWithForm from './PopUpWithForm';

const EditProfilePopup = (props) => {
  console.log(props);
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleDescription(e) {
    setAbout(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateUser(name, about);
  };

  return (
    <PopupWithForm
      handleSubmit={handleSubmit}
      name="profile-edit"
      title="Edit Profile"
      buttonText="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <Input
        handleChange={handleChangeName}
        name="name"
        type="text"
        defaultValue={currentUser.name}
      />
      <Input
        handleChange={handleDescription}
        name="profession"
        type="text"
        defaultValue={currentUser.about}
      />
    </PopupWithForm>
  );
};
export default EditProfilePopup;
