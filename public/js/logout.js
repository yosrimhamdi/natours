import users from '../../apis/client/users';
import { showAlert, removeAlert } from './utils/alert';

const logoutButton = document.querySelector('.nav__el--logout');

const logout = async e => {
  e.preventDefault();

  try {
    await users.get('/logout');

    window.location.reload(true);
  } catch (err) {
    showAlert('error', 'logout failed.');
    removeAlert(1200);
  }
};

logoutButton.addEventListener('click', logout);
