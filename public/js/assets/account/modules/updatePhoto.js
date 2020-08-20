import users from '../../apis/users';

const updatePhoto = async e => {
  const form = new FormData();

  form.append('photo', e.target.files[0]);

  try {
    const response = await users.patch('/admin/update/photo', form);

    console.log(response.data);
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export default updatePhoto;
