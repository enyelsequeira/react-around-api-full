export const BASE_URL = 'http://localhost:3000';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('[REGISTER]', data);
      return data;
    });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      // console.log(response, 'auth');
      return response.json();
    })
    .then((data) => {
      console.log('[LOGIN]', data);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('[CHECK TOKEN] ', data);
      return data;
    })
    .catch((e) => {
      console.log(`[ERROR] ${e}`);
    });
};
