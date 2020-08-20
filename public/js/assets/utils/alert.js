export const showAlert = (type, message) => {
  const alertDOM = `<div class="alert alert--${type}">${message}</div>`;

  document.body.insertAdjacentHTML('afterBegin', alertDOM);
};

export const removeAlert = after => {
  window.setTimeout(() => {
    document.querySelector('.alert').remove();
  }, after);
};
