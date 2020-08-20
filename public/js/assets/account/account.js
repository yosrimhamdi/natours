import updateUser from './modules/updateUser';
import updatePassword from './modules/updatePassword';
import updatePhoto from './modules/updatePhoto';

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-settings');
const photoInput = document.getElementById('photo-input');

userDataForm.addEventListener('submit', updateUser);
userPasswordForm.addEventListener('submit', updatePassword);
photoInput.addEventListener('change', updatePhoto);
