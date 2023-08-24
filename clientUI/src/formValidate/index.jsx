import * as Yup from "yup";

const mobileNo=/^(\+\d{1,3}[- ]?)?\d{10}$/;
export const registerValidation = Yup.object({
  name: Yup.string().min(2).max(25).required("Please Enter a Name"),
  mobile: Yup.string().matches(mobileNo, "Must be 10 digits").required("Please Enter a Valid Mobile no"),
  email: Yup.string().email().required("Please Enter a Email"),
  password: Yup.string().min(8).required("Please Enter a Password")
});
export const otpValidation = Yup.object({
  otp: Yup.string().required("Please Enter the OTP")
});

export const loginValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email"),
  password: Yup.string().required("Please Enter a Password")
});
export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email")
});
export const resetPasswordValidation = Yup.object({
  password: Yup.string().min(8).required("Please Enter a Password"),
  confirmPassword: Yup.string().min(8).required("Please Re-enter the Password") 
});
