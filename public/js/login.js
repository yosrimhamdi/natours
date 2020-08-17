import axios from 'axios';

import { showAlert, removeAlert } from './alert';

const form = document.querySelector('.form');

const login = async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email,
      password,
    });

    showAlert('success', response.data.message);

    window.setTimeout(() => {
      removeAlert();
      window.location.assign('/');
    }, 1000);
  } catch (err) {
    showAlert('error', err.response.data.message);
    window.setTimeout(() => {
      removeAlert();
    }, 1200);
  }
};

form.addEventListener('submit', login);
