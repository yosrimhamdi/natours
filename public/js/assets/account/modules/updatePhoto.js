import users from '../../apis/users';
import { showAlert, removeAlert } from '../../utils/alert';
import UpdateUIUserImage from './updateUIUserImage';

const updatePhoto = async e => {
  const form = new FormData();

  form.append('photo', e.target.files[0]);

  try {
    const response = await users.patch('/admin/update/photo', form);

    UpdateUIUserImage(response.data.photo);
    showAlert('success', 'Image updated successfully.');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }

  removeAlert(3000);
};

export default updatePhoto;
