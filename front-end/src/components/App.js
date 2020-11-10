/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import AddCard from './AddPlacePopup';
import EditProfile from './EditProfilePopup';
import EditAvatar from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Login from './Login';
import Register from './Register';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';
import InfoToolTip from './InfoToolTip';

const App = () => {
  // testing loggedIn
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  //

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    avatar: '',
    name: '',
    about: '',
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');

  //
  const history = useHistory();

  //

  //
  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    await api.changeLikeCardStatus(card._id, !isLiked).catch((err) => {
      console.log(err);
    });

    setCards(await api.getCardList());
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  // deleting card

  const handleDeleteCard = (cardRemoval) => {
    api
      .removeCard(cardRemoval._id)
      .then(() => {
        cards.filter((card) => card !== cardRemoval);
      })
      .catch((err) => console.log(err));
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
    setIsInfoToolTipOpen(false);
  }
  const onAddPlace = (newCard) => {
    api
      .addCard(newCard)
      .then((newOne) => setCards([...cards, newOne]))
      .then(() => {
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  };
  function handleUpdateAvatar(avatar) {
    setCurrentUser({ ...currentUser, avatar });

    api
      .setUserAvatar({ avatar })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const updateUser = (name, about) => {
    api
      .setUserInfo({ name, about })
      .then(() =>
        setCurrentUser({
          name,
          about,
          avatar: currentUser.avatar,
        })
      )
      .then(() => setIsEditProfilePopupOpen(false))
      .catch((err) => console.log(err));
  };

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then(() => {
        handleTokenCheck();
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleSignup(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.error) {
          setIsSuccessful(false);
          setIsInfoToolTipOpen(true);
        } else {
          setIsSuccessful(true);
          setIsInfoToolTipOpen(true);
          history.push('/signin');
        }
      })
      .catch((err) => console.log(err));
  }
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    auth
      .checkToken(jwt)
      .then((res) => {
        setUserEmail(res.email);
        setLoggedIn(true);
      })
      .then(() => history.push('/'))
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      });
  }
  function handleSignout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/signin');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            signOut={handleSignout}
            component={Main}
            userEmail={userEmail}
            onEditProfile={() => {
              setIsEditProfilePopupOpen(true);
            }}
            onAddCard={() => {
              setIsAddPlacePopupOpen(true);
            }}
            onEditAvatar={() => {
              setIsEditAvatarPopupOpen(true);
            }}
            selectedCard={selectedCard}
            onClose={closeAllPopups}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
            onCardClick={(card) => handleCardClick(card)}
          />
          <Route path="/signin">
            <Header link="/signup" linkText="Sing Up" />
            <Login
              heading="Login"
              buttonText="Log in"
              handleLogin={handleLogin}
            />
          </Route>
          <Route path="/signup">
            <Header link="/signin" linkText="Sign In" />
            <Register
              handleSignup={handleSignup}
              heading="Sign up"
              buttonText="Sign up"
            />
          </Route>
          <Route path="/">
            <Redirect to="/signin" />
          </Route>
        </Switch>

        <Footer />

        <EditProfile
          updateUser={updateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={onAddPlace}
        />

        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoToolTip
          popupType="modal__signup"
          valid={isSuccessful}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;