import users from '../../apis/users';
import { showAlert, removeAlert } from './utils/alert';

const form = document.querySelector('.form');

const login = async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await users.post('/login', {
      email,
      password,
    });

    showAlert('success', response.data.message);
    removeAlert(1000);

    window.setTimeout(() => {
      window.location.assign('/');
    }, 1000);
  } catch (err) {
    showAlert('error', err.response.data.message);
    removeAlert(1200);
  }
};

form.addEventListener('submit', login);
