export const showAlert = (type, message) => {
  const alertDOM = `<div class="alert alert--${type}">${message}</div>`;

  document.body.insertAdjacentHTML('afterBegin', alertDOM);
};

export const removeAlert = time => {
  window.setTimeout(() => {
    document.querySelector('.alert').remove();
  }, time);
};
