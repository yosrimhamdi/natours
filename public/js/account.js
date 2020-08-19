import users from '../../apis/client/users';
import { showAlert, removeAlert } from './utils/alert';
import clrearInputs from './utils/clearInputs';

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

const updatePassword = async e => {
  e.preventDefault();

  const currentPassword = document.getElementById('password-current');
  const newPassword = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');

  try {
    await users.patch('/admin/update/password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      passwordConfirm: passwordConfirm.value,
    });

    showAlert('success', 'password updated.');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }

  clrearInputs(currentPassword, newPassword, passwordConfirm);
  removeAlert(1100);
};

updateUserButton.addEventListener('click', updateUser);
updatePasswordButton.addEventListener('click', updatePassword);
