import users from '../../apis/users';
import { showAlert, removeAlert } from '../../utils/alert';
import clearInputs from '../../utils/clearInputs';

const updatePasswordButton = document.querySelector('.update-password');

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

  clearInputs(currentPassword, newPassword, passwordConfirm);
  removeAlert(1100);
};

export default updatePassword;
