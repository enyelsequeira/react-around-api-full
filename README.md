# Around the U.S.

This is full-stack application using Microsoft Azure to always have the server running.

## Features

### Front End

1. Popup modals for
   - Updating user info
   - Adding new cards
   - Deleting cards (user's own cards only)
2. Liking/unliking cards
3. User authentication

### Back End

- Routes for the user
  - Registration and login
  - Updating user information and profile picture
- Routes for the Cards - only if user is AUTHORIZED
  1. Creating new cards
  2. like and dislike cards,
- It authenticates user using JWT
- Mongo models for users and cards
- Validation and error handling in case something goes wrong

## Links

The front-end is deployed [here](http://enyelbackend.students.nomoreparties.site/).

### If you want to run the app clone the repo and create your own .env variable as JWT_SECRET = ""

### Navigate to each folder, backend/frontend and run yarn to install dependecies and yarn start
