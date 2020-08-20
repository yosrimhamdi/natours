const formUserPhoto = document.querySelector('.form__user-photo');
const navUserPhoto = document.querySelector('.nav__user-img');

const UpdateUIUserPhoto = photo => {
  const URL = `/img/users/${photo}`;

  formUserPhoto.setAttribute('src', URL);
  navUserPhoto.setAttribute('src', URL);
};

export default UpdateUIUserPhoto;
