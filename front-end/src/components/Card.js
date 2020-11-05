import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = (e) => {
    onCardClick(card);
  };

  const handleLikeClick = (e) => {
    onCardLike(card);
  };

  const handleDeleteCard = (e) => {
    onCardDelete(card);
    e.stopPropagation();
  };
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `elements__trash ${
    isOwn ? 'elements__trash_visible' : 'elements__trash_hidden'
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <li className="elements__item">
      <div
        className="elements__image"
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})` }}
      />
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleDeleteCard}
        />
      )}
      <div className="elements__info">
        <h3 className="elements__title">{card.name}</h3>
        <button
          onClick={handleLikeClick}
          className={
            isLiked
              ? 'elements__image-heart_active elements__image-heart '
              : 'elements__image-heart'
          }
          type="button"
          name="like"
        />
        <h4 className="elements__like-count">{card.likes.length}</h4>
      </div>
    </li>
  );
};

export default Card;
