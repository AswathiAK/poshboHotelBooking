import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string().email().required("Please Enter the Email"),
  password: Yup.string().required("Please Enter the Password")
});