export const mobileValidation = (mobile: string) => {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(mobile);
};
