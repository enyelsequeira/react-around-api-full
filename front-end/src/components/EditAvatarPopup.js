/* eslint-disable react/jsx-closing-bracket-location */
import React, { useRef, useContext, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopUpWithForm.js';

const EditAvatarPopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const avatarInputRef = useRef(avatar);

  function handleAvatarChange(e) {
    setAvatar(avatarInputRef.current.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm
      handleSubmit={handleSubmit}
      name="avatar-change"
      title="Change Profile Avatar"
      buttonText="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}>
      <input
        required
        id="profile-url"
        onChange={handleAvatarChange}
        name="ImageLink"
        placeholder="URL"
        ref={avatarInputRef}
        className="modal__form-profession modal__form-link modal__form-avatar  modal__input"
        type="url"
        defaultValue={currentUser.avatar}
      />
      <span id="profile-url-error" className="modal__formerror" />
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
