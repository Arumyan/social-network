export const required = value => {
  if (value) {
    console.log('validate(required) ok');
    return undefined;
  }

  return 'Field is required';
};