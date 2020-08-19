import users from '../../apis/client/users';
import { showAlert, removeAlert } from './alert';

const updateUserButton = document.querySelector('.change-name');
const updatePasswordButton = document.querySelector('.change-password');

const updateUser = async e => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  try {
    await users.patch('/admin/update', { name, email });

    showAlert('success', 'updated.');
    removeAlert(1100);
  } catch (err) {
    showAlert('error', err.response.data.message);
    removeAlert(3000);
  }
};

const updatePassword = async () => {};

updateUserButton.addEventListener('click', updateUser);
updatePasswordButton.addEventListener('click', updatePassword);
