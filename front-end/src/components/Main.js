/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddCard,
  onCardLike,
  onCardClick,
  onCardDelete,
  cards,
}) => {
  const userInfo = React.useContext(CurrentUserContext);
  console.log(cards);
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={userInfo.avatar}
            alt="profile"
          />
          <button className="profile__avatar-overlay" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{userInfo.name}</h2>
          <p className="profile__profession">{userInfo.about}</p>
          <button
            className="profile__info-btn"
            type="button"
            onClick={onEditProfile}
          />
        </div>
        <button className="profile__button-add" onClick={onAddCard} />
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card, i) => {
            return (
              <Card
                key={i}
                card={card}
                onCardLike={(card) => {
                  onCardLike(card);
                }}
                onCardClick={(card) => {
                  onCardClick(card);
                }}
                onCardDelete={(card) => {
                  onCardDelete(card);
                }}
                _id={card._id}
                likes={card.likes}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
