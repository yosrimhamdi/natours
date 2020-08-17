import axios from 'axios';

const logoutButton = document.querySelector('.nav__el--logout');

const logout = async e => {
  e.preventDefault();

  try {
    const response = await axios.get('http://localhost:3000/api/users/logout');

    console.log(response.data.message);
    window.location.assign('/');
  } catch (err) {
    console.log(err);
  }
};

logoutButton.addEventListener('click', logout);
