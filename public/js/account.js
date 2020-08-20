import users from '../../apis/client/users';
import { showAlert, removeAlert } from './utils/alert';
import clrearInputs from './utils/clearInputs';

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const updatePasswordButton = document.querySelector('.update-password');
const photoInput = document.getElementById('photo-input');

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

  updatePasswordButton.textContent = 'updating..';

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

  updatePasswordButton.textContent = 'save password';

  clrearInputs(currentPassword, newPassword, passwordConfirm);
  removeAlert(1100);
};

userDataForm.addEventListener('submit', updateUser);
userPasswordForm.addEventListener('submit', updatePassword);

photoInput.addEventListener('change', async e => {
  const form = new FormData();

  form.append('photo', e.target.files[0]);

  try {
    const response = await users.patch('/admin/update/photo', form);

    console.log(response.data);
  } catch (err) {
    console.log(err.response.data.message);
  }
});
