module.exports = (...inputs) => {
  inputs.forEach(input => {
    input.value = '';
  });
};
