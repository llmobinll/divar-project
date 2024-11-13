export const mobileValidation = (mobile) => {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(mobile);
};
