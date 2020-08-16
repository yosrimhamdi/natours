/* eslint-disable */
const form = document.querySelector('.form');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email,
      password,
    });

    window.location.assign('/');
  } catch (err) {
    alert(err.response.data.message);
  }
});
