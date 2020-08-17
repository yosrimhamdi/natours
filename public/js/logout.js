import axios from 'axios';

import { showAlert, removeAlert } from './alert';

const logoutButton = document.querySelector('.nav__el--logout');

const logout = async e => {
  e.preventDefault();

  try {
    await axios.get('http://localhost:3000/api/users/logout');

    window.location.assign('/');
  } catch (err) {
    showAlert('error', 'logout failed.');

    window.setTimeout(() => {
      removeAlert();
    }, 1200);
  }
};

logoutButton.addEventListener('click', logout);
