import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email"),
  password: Yup.string().required("Please Enter a Password")
});