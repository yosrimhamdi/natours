import users from '../../apis/users';
import { showAlert, removeAlert } from '../../utils/alert';

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

export default updateUser;
